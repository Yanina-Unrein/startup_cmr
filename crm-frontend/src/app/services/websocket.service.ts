import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, filter, first, Observable, Subject } from 'rxjs';
import { environment } from '@/environments/environment';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
    private stompClient: Client;
    private connected = false;

    private connectionSubject = new BehaviorSubject<boolean>(false);
    private subscriptions: Map<string, StompSubscription> = new Map();
    private messageSubjects: Map<string, Subject<any>> = new Map();

    constructor() {
        this.stompClient = new Client({
        reconnectDelay: 5000,
        debug: () => {}, // mute logs
        onConnect: () => {
            this.connected = true;
            this.connectionSubject.next(true);
            console.log('%cWS conectado', 'color:green');
        },
        onDisconnect: () => {
            this.connected = false;
            this.connectionSubject.next(false);
            console.log('%cWS desconectado', 'color:red');
        }
        });
    }

    private getToken(): string {
        return localStorage.getItem('token') || '';
    }

    public connect(): void {
        // SIEMPRE generar el socket NUEVO aquí (token actualizado)
        this.stompClient.webSocketFactory = () =>
        new SockJS(`${environment.wsUrl}/ws?token=${this.getToken()}`);

        this.stompClient.activate();
    }

    public disconnect(): void {
        this.stompClient.deactivate();
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.clear();
        this.messageSubjects.clear();
    }

    public getConnectionStatus(): Observable<boolean> {
        return this.connectionSubject.asObservable();
    }

    public subscribeTopic(topic: string): Observable<any> {
        if (this.messageSubjects.has(topic)) {
        return this.messageSubjects.get(topic)!.asObservable();
        }

        const messageSubject = new Subject<any>();
        this.messageSubjects.set(topic, messageSubject);

        if (this.connected) {
        this.doSubscribe(topic, messageSubject);
        } else {
        this.connectionSubject
            .pipe(filter(v => v), first())
            .subscribe(() => this.doSubscribe(topic, messageSubject));
        }

        return messageSubject.asObservable();
    }

    private doSubscribe(topic: string, messageSubject: Subject<any>): void {
        const subscription = this.stompClient.subscribe(topic, (message: IMessage) => {
        try {
            const parsed = JSON.parse(message.body);
            messageSubject.next(parsed);
        } catch {
            messageSubject.next(message.body);
        }
        });

        this.subscriptions.set(topic, subscription);
    }

    public sendMessage(destination: string, body: any): void {
        if (this.stompClient && this.connected) {
            this.stompClient.publish({ destination, body: JSON.stringify(body) });
        } else {
            console.error('No conectado al WebSocket');
        }
    }

    public unsubscribeTopic(topic: string): void {
        const subscription = this.subscriptions.get(topic);
        if (subscription) {
        subscription.unsubscribe();
        this.subscriptions.delete(topic);
        }
        const subject = this.messageSubjects.get(topic);
        if (subject) {
        subject.complete();
        this.messageSubjects.delete(topic);
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
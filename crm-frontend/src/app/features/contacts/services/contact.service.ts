// ContactsService con signals + extras
// Este servicio incluye:
// - carga
// - crear / actualizar / eliminar
// - filtro por funnelStatus
// - búsqueda por nombre/email
// - selección
// - estado de carga y error

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Contact } from '../models/contact.interface';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private apiUrl = `${environment.apiUrl}/api/contactos`;

  // Signals de estado
  private _contacts = signal<Contact[]>([]);
  private _selectedContact = signal<Contact | null>(null);

  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Filtros locales
  private _search = signal<string>('');
  private _funnelFilter = signal<string>('');

  // Expuestos
  contacts = computed(() => this._contacts());
  selectedContact = computed(() => this._selectedContact());
  isLoading = computed(() => this._loading());
  error = computed(() => this._error());

  // Filtros computados
  filteredContacts = computed(() => {
    const list = this._contacts();
    const search = this._search().toLowerCase();
    const status = this._funnelFilter();

    return list.filter(c => {
      const matchStatus = !status || c.funnelStatus === status;
      const matchSearch = !search || (
         c.name?.toLowerCase().includes(search) ||
         c.email?.toLowerCase().includes(search)
      );
      return matchStatus && matchSearch;
    });
  });

  constructor(private http: HttpClient) {}

  loadContacts(): Observable<Contact[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Contact[]>(this.apiUrl).pipe(
      tap(res => this._contacts.set(res)),
      catchError(err => {
        this._error.set('Error cargando contactos');
        return of([]);
      }),
      tap(() => this._loading.set(false))
    );
  }

  selectContact(c: Contact | null) {
    this._selectedContact.set(c);
  }

  setSearch(value: string) {
    this._search.set(value);
  }

  setFunnelFilter(value: string) {
    this._funnelFilter.set(value);
  }

  createContact(data: Partial<Contact>): Observable<Contact> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<Contact>(this.apiUrl, data).pipe(
      tap(newContact => {
        this._contacts.update(list => [...list, newContact]);
      }),
      catchError(err => {
        this._error.set('No se pudo crear el contacto');
        return of(null as any);
      }),
      tap(() => this._loading.set(false))
    );
  }

  updateContact(id: number, data: Partial<Contact>): Observable<Contact> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<Contact>(`${this.apiUrl}/${id}`, data).pipe(
      tap(updated => {
        this._contacts.update(list => list.map(c => c.id === id ? updated : c));
      }),
      catchError(err => {
        this._error.set('No se pudo actualizar');
        return of(null as any);
      }),
      tap(() => this._loading.set(false))
    );
  }

  deleteContact(id: number): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._contacts.update(list => list.filter(c => c.id !== id));
      }),
      catchError(err => {
        this._error.set('No se pudo eliminar');
        return of(undefined);
      }),
      tap(() => this._loading.set(false))
    );
  }

  getContactById(id: number): Contact | undefined {
    return this._contacts().find(c => c.id === id);
  }
}


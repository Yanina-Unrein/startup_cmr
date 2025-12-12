import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { EmailRequest } from '@/app/core/models/EmailRequest';
import { EmailTemplate } from '@/app/core/models/EmailTemplate';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/email`;

  private getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }


  sendTextEmail(email: EmailRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/send-text`, email, { 
      responseType: 'text' 
    });
  }

  sendHtmlEmail(email: EmailRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/send-html`, email, { 
      responseType: 'text' 
    });
  }

  // Métodos adicionales para templates
  getTemplates(): Observable<EmailTemplate[]> {
    return this.http.get<EmailTemplate[]>(`${this.apiUrl}/templates`, this.getAuthHeaders());
  }

  saveTemplate(template: EmailTemplate): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/templates`, template, this.getAuthHeaders());
  }
}
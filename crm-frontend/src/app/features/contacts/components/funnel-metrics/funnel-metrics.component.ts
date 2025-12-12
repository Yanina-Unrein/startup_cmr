import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contact.service';

@Component({
  selector: 'app-funnel-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funnel-metrics.component.html',
  styleUrls: ['./funnel-metrics.component.css']
})
export class FunnelMetricsComponent implements OnInit {
  private contactsService = inject(ContactsService);
  

  // Acceso directo al signal original
  contacts = computed(() => this.contactsService.contacts());

  // Estados definidos del funnel
  funnelStates = ['NEW', 'ACTIVE', 'WON', 'LOST'];

  /** 
   * Agrupar por semana ISO 
   */
  contactsByWeek = computed(() => {
    const map: Record<string, any> = {};

    this.contacts().forEach(c => {
      const createdAt = c.dataCreacionContact;
if (!createdAt) return;

const date = new Date(createdAt);

      const week = this.getISOWeek(date);
      const year = date.getFullYear();

      const key = `${year}-W${week}`;

      if (!map[key]) {
        map[key] = { week: key, total: 0 };
        this.funnelStates.forEach(s => map[key][s] = 0);
      }

      const status = c.funnelStatus || 'NEW';
      if (map[key][status] !== undefined) {
        map[key][status] += 1;
        map[key].total += 1;
      }
    });

    return Object.values(map).sort((a: any, b: any) => a.week.localeCompare(b.week));
  });

   ngOnInit() {
    this.contactsService.loadContacts().subscribe();
  }

  /** Calcula la semana ISO */
  private getISOWeek(date: Date): number {
    const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    
    const dayNum = temp.getUTCDay() || 7;
    temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
    return Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}


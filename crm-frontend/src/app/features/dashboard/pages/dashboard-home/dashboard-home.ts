import { Component } from '@angular/core';
import { FunnelMetricsComponent } from '@/app/features/contacts/components/funnel-metrics/funnel-metrics.component';
@Component({
  selector: 'app-dashboard-home',
  imports: [FunnelMetricsComponent],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {

}

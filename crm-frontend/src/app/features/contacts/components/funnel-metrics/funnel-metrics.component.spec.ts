import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelMetricsComponent } from './funnel-metrics.component';

describe('FunnelMetricsComponent', () => {
  let component: FunnelMetricsComponent;
  let fixture: ComponentFixture<FunnelMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnelMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunnelMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

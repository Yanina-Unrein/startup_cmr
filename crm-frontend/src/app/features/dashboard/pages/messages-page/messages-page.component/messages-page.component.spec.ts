import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenssagesPageComponent } from './messages-page.component';

describe('MenssagesPageComponent', () => {
  let component: MenssagesPageComponent;
  let fixture: ComponentFixture<MenssagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenssagesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenssagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

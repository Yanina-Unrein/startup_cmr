import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoTitle } from './logo-title';

describe('LogoTitle', () => {
  let component: LogoTitle;
  let fixture: ComponentFixture<LogoTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

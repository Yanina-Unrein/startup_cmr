import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatssapChat } from './whatssap-chat';

describe('WhatssapChat', () => {
  let component: WhatssapChat;
  let fixture: ComponentFixture<WhatssapChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatssapChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatssapChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

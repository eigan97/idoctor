import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCitaComponent } from './personal-cita.component';

describe('PersonalCitaComponent', () => {
  let component: PersonalCitaComponent;
  let fixture: ComponentFixture<PersonalCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

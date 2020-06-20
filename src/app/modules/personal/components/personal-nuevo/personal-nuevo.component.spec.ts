import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalNuevoComponent } from './personal-nuevo.component';

describe('PersonalNuevoComponent', () => {
  let component: PersonalNuevoComponent;
  let fixture: ComponentFixture<PersonalNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

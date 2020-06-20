import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNuevoComponent } from './consulta-nuevo.component';

describe('ConsultaNuevoComponent', () => {
  let component: ConsultaNuevoComponent;
  let fixture: ComponentFixture<ConsultaNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

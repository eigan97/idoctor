import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenFolioComponent } from './examen-folio.component';

describe('ExamenFolioComponent', () => {
  let component: ExamenFolioComponent;
  let fixture: ComponentFixture<ExamenFolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenFolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

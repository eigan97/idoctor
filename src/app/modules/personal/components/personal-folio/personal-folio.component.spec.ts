import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFolioComponent } from './personal-folio.component';

describe('PersonalFolioComponent', () => {
  let component: PersonalFolioComponent;
  let fixture: ComponentFixture<PersonalFolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalFolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

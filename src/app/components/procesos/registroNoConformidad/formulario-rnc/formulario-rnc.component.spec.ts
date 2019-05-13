import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRncComponent } from './formulario-rnc.component';

describe('FormularioRncComponent', () => {
  let component: FormularioRncComponent;
  let fixture: ComponentFixture<FormularioRncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioRncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

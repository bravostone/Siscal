import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDinamicaComponent } from './captura-dinamica.component';

describe('CapturaDinamicaComponent', () => {
  let component: CapturaDinamicaComponent;
  let fixture: ComponentFixture<CapturaDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDinamicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarFotoComponent } from './capturar-foto.component';

describe('CapturarFotoComponent', () => {
  let component: CapturarFotoComponent;
  let fixture: ComponentFixture<CapturarFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturarFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

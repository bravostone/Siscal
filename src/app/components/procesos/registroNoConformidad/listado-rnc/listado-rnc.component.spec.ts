import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRncComponent } from './listado-rnc.component';

describe('ListadoRncComponent', () => {
  let component: ListadoRncComponent;
  let fixture: ComponentFixture<ListadoRncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

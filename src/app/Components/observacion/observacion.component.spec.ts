import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionComponent } from './observacion.component';

describe('ObservacionComponent', () => {
  let component: ObservacionComponent;
  let fixture: ComponentFixture<ObservacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservacionComponent]
    });
    fixture = TestBed.createComponent(ObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

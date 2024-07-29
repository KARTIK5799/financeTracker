import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsignupComponent } from './loginsignup.component';

describe('LoginsignupComponent', () => {
  let component: LoginsignupComponent;
  let fixture: ComponentFixture<LoginsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginsignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

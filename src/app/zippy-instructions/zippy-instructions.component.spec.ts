import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippyInstructionsComponent } from './zippy-instructions.component';

describe('ZippyInstructionsComponent', () => {
  let component: ZippyInstructionsComponent;
  let fixture: ComponentFixture<ZippyInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZippyInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZippyInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

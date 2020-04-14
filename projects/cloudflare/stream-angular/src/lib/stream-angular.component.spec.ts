import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamAngularComponent } from './stream-angular.component';

describe('StreamAngularComponent', () => {
  let component: StreamAngularComponent;
  let fixture: ComponentFixture<StreamAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

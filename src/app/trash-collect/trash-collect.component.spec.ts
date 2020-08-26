import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCollectComponent } from './trash-collect.component';

describe('TrashCollectComponent', () => {
  let component: TrashCollectComponent;
  let fixture: ComponentFixture<TrashCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashCollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

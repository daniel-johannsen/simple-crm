import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAssetsComponent } from './dialog-edit-assets.component';

describe('DialogEditAssetsComponent', () => {
  let component: DialogEditAssetsComponent;
  let fixture: ComponentFixture<DialogEditAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

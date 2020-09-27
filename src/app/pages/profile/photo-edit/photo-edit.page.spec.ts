import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoEditPage } from './photo-edit.page';

describe('PhotoEditPage', () => {
  let component: PhotoEditPage;
  let fixture: ComponentFixture<PhotoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

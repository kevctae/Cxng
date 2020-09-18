import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FabsComponent } from './fabs.component';

describe('FabsComponent', () => {
  let component: FabsComponent;
  let fixture: ComponentFixture<FabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

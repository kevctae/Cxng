import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomType } from 'src/app/core/models/room-type.model';
import { RoomTypeService } from 'src/app/core/services/room-type.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit, OnDestroy {
  private roomTypeSubscription: Subscription;
  roomTypes: RoomType[];

  constructor(
    private roomTypeService: RoomTypeService,
  ) { }

  ngOnInit() {
    this.loadRoomTypes();
  }

  loadRoomTypes() {
    this.roomTypeSubscription = this.roomTypeService.getRoomTypes()
      .subscribe((datas) => {
        this.roomTypes = datas.map((data) => {
          return data.payload.doc.data() as RoomType;
        });
      });
  }

  ngOnDestroy() {
    this.roomTypeSubscription.unsubscribe();
  }

}

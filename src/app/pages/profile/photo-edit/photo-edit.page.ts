import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.page.html',
  styleUrls: ['./photo-edit.page.scss'],
})
export class PhotoEditPage implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  closePhotoEditModal() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileEditPage } from './profile-edit/profile-edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public authService: AuthService,
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  async openUserEditModal() {
    const modal = await this.modalController.create({
      component: ProfileEditPage,
    });
    return await modal.present();
  }

}

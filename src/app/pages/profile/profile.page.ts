import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { PhotoEditPage } from './photo-edit/photo-edit.page';
import { ProfileEditPage } from './profile-edit/profile-edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public authService: AuthService,
    public modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {}

  async openPhotoEditModal() {
    const modal = await this.modalController.create({
      component: PhotoEditPage,
    });
    return await modal.present();
  }

  async openProfileEditModal() {
    const modal = await this.modalController.create({
      component: ProfileEditPage,
    });
    return await modal.present();
  }

  async openDeleteAccountAlert() {
    const alert = await this.alertController.create({
      header: 'Enter Password to Confirm Deletion',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            this.authService.DeleteUser(
              this.authService.userData.email,
              data.password,
            ).then(() => {
              this.closeUserEditModal();
            });
            
          }
        }
      ]
    });
    await alert.present();
  }

  closeUserEditModal() {
    this.modalController.dismiss();
  }

}

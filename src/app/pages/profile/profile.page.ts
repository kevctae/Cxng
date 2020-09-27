import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    public modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {}

  async openUserEditModal() {
    const modal = await this.modalController.create({
      component: ProfileEditPage,
    });
    return await modal.present();
  }

  async openAlert() {
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

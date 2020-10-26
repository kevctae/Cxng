import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileEditForm: FormGroup;
  showForgotPassword: boolean = true;

  constructor(
    public modalController: ModalController,
    public authService: AuthService,
    public alertController: AlertController,
    public notiService: NotificationService,
  ) { }

  ngOnInit() {
    this.loadFormData();
  }

  loadFormData() {
    this.profileEditForm = new FormGroup({
      'displayName': new FormControl(this.authService.userData.displayName),
      'email': new FormControl(this.authService.userData.email, [Validators.email]),
    });
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Enter Password to Confirm Change',
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
            this.authService.UpdateProfile(
              this.profileEditForm.value.email,
              this.profileEditForm.value.displayName,
              data.password,
            ).then(() => {
              this.closeProfileEditModal();
            });
            
          }
        }
      ]
    });
    await alert.present();
  }

  closeProfileEditModal() {
    this.modalController.dismiss();
  }

}

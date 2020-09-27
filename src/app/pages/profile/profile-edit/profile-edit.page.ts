import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

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

  // onSubmit() {
  //   if (this.profileEditForm.value.email != this.authService.userData.email) {
  //     this.presentAlertPrompt();
  //   }
  //   if (this.profileEditForm.value.displayName != this.authService.userData.displayName) {
      
  //   }
  // }

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
            console.log('Confirm Ok');
            this.authService.UpdateProfile(
              this.authService.userData.email,
              data.password,
              this.profileEditForm.value.email,
              this.profileEditForm.value.displayName,
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

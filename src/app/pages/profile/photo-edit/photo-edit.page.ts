import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.page.html',
  styleUrls: ['./photo-edit.page.scss'],
})
export class PhotoEditPage implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    public modalController: ModalController,
    public notiService: NotificationService,
    public authService: AuthService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = this.dataURItoBlob(event.base64);
  }

  loadImageFailed() {
      this.notiService.presentToast("Error: Loading Image Failed!", 4000, 'danger');
  }

  async onFileUpload() {
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
            this.authService.UploadPhoto(
              this.croppedImage,
              data.password,
            ).pipe(take(1)).subscribe(() => {
              this.closePhotoEditModal();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  closePhotoEditModal() {
    this.modalController.dismiss();
  }
}

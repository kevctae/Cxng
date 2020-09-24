import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileEditForm: FormGroup;

  constructor(
    public modalController: ModalController,
    public authService: AuthService,
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

  onSubmit() {
    
  }

  closeUserEditModal() {
    this.modalController.dismiss();
  }

}

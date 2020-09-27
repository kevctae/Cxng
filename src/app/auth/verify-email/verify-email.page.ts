import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  showForgotPassword: boolean = true

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  resendVerification() {
    this.authService.SendVerificationMail();
    // this.coolDownTimer();
  }

  // coolDownTimer() {
  //   this.showForgotPassword = false;

  // }

}

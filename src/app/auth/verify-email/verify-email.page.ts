import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  allowResend: boolean = false
  count: number = 60

  constructor(
    public authService: AuthService,
    public notiService: NotificationService,
  ) { }

  ngOnInit() {
    this.coolDownTimer();
  }

  resendVerification() {
    this.authService.SendVerificationMail();
    this.coolDownTimer();
  }

  coolDownTimer() {
    this.allowResend = false;
    const counter = interval(1000).pipe(take(10));
    counter.subscribe((x) => {
      this.count -= 1;
    }, (error) => {
      this.notiService.presentToast(error, 4000, 'danger');
    }, () => {
      this.allowResend = true;
      this.count = 60;
    });
  }

}

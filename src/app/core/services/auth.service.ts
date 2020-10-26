import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { NotificationService } from './notification.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: User; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public notiService: NotificationService,
    private fireStorage: AngularFireStorage,
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          this.SendVerificationMail();
        } else {
          this.SetUserData(result.user).then(() => {
            this.ngZone.run(() => {
              this.router.navigate(['home']);
            });
          }).catch((error) => {
            this.notiService.presentToast(error, 4000, 'danger');
          });
        }
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
  }

  //Update Profile
  UpdateProfile(newEmail, newDisplayName, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(this.userData.email, password)
      .then(async (result) => {
        if (this.userData.displayName != newDisplayName) {
          this.UpdateDisplayName(newDisplayName, result);
        }        
        if (this.userData.email != newEmail) {
          this.UpdateEmail(newEmail, password, result);
        }
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
  }

  //Update Display Name
  async UpdateDisplayName(newDisplayName, userCredential) {
    await userCredential.user.updateProfile({
      displayName: newDisplayName
    }).catch((error) => {
      this.notiService.presentToast(error.message, 4000, 'danger');
    });
  }

  //Update Email
  async UpdateEmail(newEmail, password, userCredential) {
    await userCredential.user.updateEmail(newEmail)
    .catch((error) => {
      this.notiService.presentToast(error.message, 4000, 'danger');
    });
    this.SignIn(newEmail, password);
  }

  //Upload Profile Photo
  UploadPhoto(newPhoto, password) {
    const filePath = 'users/' + this.userData.uid + '/profile_image/p_img'
    const fileRef = this.fireStorage.ref(filePath);
    return this.fireStorage.upload(filePath, newPhoto)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().pipe(take(1)).subscribe(url => {
            if (url) {
              this.UpdatePhotoURL(url, password);
            }
          });
        })
      )
    
  }

  //Update Photo URL
  async UpdatePhotoURL(newPhotoURL, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(this.userData.email, password)
    .then(async (result) => {
      await result.user.updateProfile({
        photoURL: newPhotoURL
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
    }).catch((error) => {
      this.notiService.presentToast(error.message, 4000, 'danger');
    });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.notiService.presentToast('Password reset email sent, check your inbox.', 4000, 'warning');
      this.router.navigate(['sign-in']);
    }).catch((error) => {
      this.notiService.presentToast(error, 4000, 'danger');
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      this.notiService.presentToast(error, 4000, 'danger');
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  //Delete user
  DeleteUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.delete().then(() => {
          this.notiService.presentToast('Account deleted sucessfully.', 4000, 'sucess');
          this.router.navigate(['sign-in']);
        }).catch((error) => {
          this.notiService.presentToast(error.message, 4000, 'danger');
        });
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
  }

}
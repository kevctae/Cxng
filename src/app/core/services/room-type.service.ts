import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  getRoomTypes() {
    return this.afs.collection("roomTypes").snapshotChanges();
  }
}

// ============================================================================
// Modal view
// ============================================================================

// Angular + Ionic
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

// Third party
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Types
import { Readings } from '../..//models/types';


// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  // Initialize the collection reference
  collection: AngularFirestoreCollection<Readings>;

  // Init date time 
  localDateTime: string;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private afs: AngularFirestore,
  ) { }

  // ------------------------------------------------------
  // Page loaded
  // ------------------------------------------------------
  ionViewDidLoad() {
    // Prepare the collection
    this.collection = this.afs.collection<Readings>('readings');
    // Set the date picker up
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.localDateTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
  }

  // ------------------------------------------------------
  // Submit the modal form and save data to firestore
  // ------------------------------------------------------
  submitForm(f: NgForm) {
    // if (todoDesc && todoDesc.trim().length) {
      this.collection.add({ 
        systolic: f.value.systolic,
        diastolic: f.value.diastolic,
        date: f.value.date
      });
      this.viewCtrl.dismiss();
    // }
  }

  // ------------------------------------------------------
  // Close the modal component
  // ------------------------------------------------------
  dismiss() {
    this.viewCtrl.dismiss();
  }

}

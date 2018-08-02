// ============================================================================
// Modal view
// ============================================================================

// Angular + Ionic
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';

// Third party
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Types
import { Readings } from '../../models/types';


// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  // ----------------------------------------------------------------------------
  // Dom element references
  // ----------------------------------------------------------------------------
  @ViewChild('form') form: NgForm;

  // Init form variables
  systolic: string;
  diastolic: string;

  // Initialize the collection reference
  collection: AngularFirestoreCollection<Readings>;

  // Init date time 
  localDateTime: string;

  // Modal editing state boolean
  isEditing = false;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private afs: AngularFirestore,
    public params: NavParams
  ) { }

  // ------------------------------------------------------
  // Page loaded
  // ------------------------------------------------------
  ionViewDidLoad() {
    // Prepare the collection
    this.collection = this.afs.collection<Readings>('readings');
    // Check if modal is in edit mode from incoming params
    if (this.params.get('update')) {
      // Set boolean value for form saving
      this.isEditing = true;
      // Parse and populate data
      let reading = this.params.get('update');
      this.systolic = reading.systolic;
      this.diastolic = reading.diastolic;
      this.localDateTime = reading.date;
    } else {
      // Set boolean value for form saving
      this.isEditing = false;
      // Set the date picker up
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      this.localDateTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
    }
  }

  // ------------------------------------------------------
  // Submit the modal form and save data to firestore
  // ------------------------------------------------------
  submitForm(f: NgForm) {
    // DO VALIDATION BEFORE SAVING!
    // Save new data
    if (!this.isEditing) {
      this.collection.add({ 
        systolic: f.value.systolic,
        diastolic: f.value.diastolic,
        date: f.value.date
      });
    // Edit existing data
    } else {
      
      // do update of row value here
    }
    this.viewCtrl.dismiss();
  }

  // ------------------------------------------------------
  // Close the modal component
  // ------------------------------------------------------
  dismiss() {
    this.viewCtrl.dismiss();
  }

}

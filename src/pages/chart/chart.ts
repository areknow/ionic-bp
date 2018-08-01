// ============================================================================
// Chart view
// ============================================================================

// Angular + Ionic
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

// Third party
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Components
import { ModalPage } from '../modal/modal';

// Types
import { Readings } from '../..//models/types';

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  // Initialize the collection reference and todo list
  collection: AngularFirestoreCollection<Readings>;
  readings$: Observable<Readings[]>;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public modalCtrl: ModalController
  ) { }

  // ------------------------------------------------------
  // Page loaded
  // ------------------------------------------------------
  ionViewDidLoad() {
    this.collection = this.afs.collection<Readings>('readings');
    this.readings$ = this.collection.valueChanges();

    this.readings$.subscribe((data: any) => {
      console.log(data);
    }, (error: any) => console.log(error));
  }

  // ------------------------------------------------------
  // Present the modal component
  // ------------------------------------------------------
  openModal() {
    const modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

}

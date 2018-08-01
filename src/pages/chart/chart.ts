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

// Interfaces
export interface Todo {
  description: string;
  completed: boolean;
}

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  // Initialize the collection reference and todo list
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public modalCtrl: ModalController
  ) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todo$ = this.todoCollectionRef.valueChanges();
  }

  // ------------------------------------------------------
  // Present the modal component
  // ------------------------------------------------------
  openModal() {
    const modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

}

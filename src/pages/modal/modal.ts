// ============================================================================
// Modal view
// ============================================================================

// Angular + Ionic
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

// Third party
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Interfaces
export interface Todo {
  description: string;
  completed: boolean;
}

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  // Initialize the collection reference
  todoCollectionRef: AngularFirestoreCollection<Todo>;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private afs: AngularFirestore,
  ) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
  }

  // ------------------------------------------------------
  // Submit the modal form and save data to firestore
  // ------------------------------------------------------
  onSubmit(f: NgForm) {
    let todoDesc = f.value.desc;
    let todoCompleted = f.value.completed;
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ 
        description: todoDesc, 
        completed: todoCompleted ? true : false 
      });
      this.viewCtrl.dismiss();
    }
  }

  // ------------------------------------------------------
  // Close the modal component
  // ------------------------------------------------------
  dismiss() {
    this.viewCtrl.dismiss();
  }

}

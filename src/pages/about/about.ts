import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Todo {
  description: string;
  completed: boolean;
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;

  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore
  ) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todo$ = this.todoCollectionRef.valueChanges();
  }

  onSubmit(f: NgForm) {
    let todoDesc = f.value.desc;
    console.log(f.value);
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ description: todoDesc, completed: false });
    }
  }

}

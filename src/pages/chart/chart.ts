// ============================================================================
// Chart view
// ============================================================================

// Angular + Ionic
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

// Third party
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import Highcharts from 'highcharts';

// Components
import { ModalPage } from '../modal/modal';

// Types
import { Readings } from '../../models/types';

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  // ----------------------------------------------------------------------------
  // Dom element references
  // ----------------------------------------------------------------------------
  @ViewChild('chart') private chart;

  // Initialize chart loading boolean
  dataLoading = true;

  // Initialize the collection reference and todo list
  collection: AngularFirestoreCollection<Readings>;
  readings$: Observable<Readings[]>;

  // Highcharts
  Highcharts = Highcharts;
  chartOptions = {
    credits: { enabled: false },
    title: null,
    yAxis: {
      max: 200,
      min: 0,
      title: {
        enabled: false,
      }
    },
    xAxis: {
      type: 'datetime',
    },
    series: [
      { name: 'Systolic', data: [] },
      { name: 'Diastolic', data: [] }
    ]
  };

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
    // Subscribe to firebase collection
    this.readings$.subscribe((data: any) => {
      // Sort incoming data
      this.sortArray(data);
      // Push incoming data to temp objects/array
      data.forEach(element => {
        this.chartOptions.series[0].data.push([new Date(element.date).getTime(), Number(element.systolic)]);
        this.chartOptions.series[1].data.push([new Date(element.date).getTime(), Number(element.diastolic)]);
      });
      // Show chart after loading
      this.dataLoading = false;
      // Refresh chart data
      if (this.chart !== undefined) {
        this.chart.updateOrCreateChart();
      }
    }, (error: any) => console.log(error));
  }

  // ------------------------------------------------------
  // Sort array to organize by timestamp
  // ------------------------------------------------------
  sortArray(array) {
    array.sort(function(a, b) {
      const dateA: any = new Date(a.date);
      const dateB: any = new Date(b.date);
      return dateA - dateB;
    });
  }

  // ------------------------------------------------------
  // Present the modal component
  // ------------------------------------------------------
  openModal() {
    const modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  // ------------------------------------------------------
  // Present the modal component with loaded values
  // ------------------------------------------------------
  editRow(reading) {
    console.log(reading);
    const modal = this.modalCtrl.create(ModalPage, {update: reading});
    modal.present();
  }

}

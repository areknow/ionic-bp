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
import { Readings } from '../../models/types';

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  dataLoading = true;

  // Initialize the collection reference and todo list
  collection: AngularFirestoreCollection<Readings>;
  readings$: Observable<Readings[]>;

  // Initialize chart js settings and variables
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines : { display: false },
        type: 'time',
        time: {
          tooltipFormat: 'ddd, MMM Do',
          unit: 'day',
          displayFormats: {
            'month': 'MMM',
            'hour': 'HH',
            'day': 'dd',
          },
        },
      }]
    },
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

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
      // Sort incoming data
      data.sort(function(a, b) {
        const dateA:any = new Date(a.date);
        const dateB:any = new Date(b.date);
        return dateA - dateB;
      });
      console.log(data);
      // Setup temp data holders
      let seriesA = { data: [], label: 'Systolic' };
      let seriesB = { data: [], label: 'Diastolic' };
      let labels = [];
      // Push incoming data to temp objects/array
      data.forEach(element => {
        seriesA.data.push(element.systolic);
        seriesB.data.push(element.diastolic);
        labels.push(new Date(element.date).getTime());
      });
      // Pass data to chart object
      this.lineChartData = [ seriesA, seriesB ]
      this.lineChartLabels = labels;
      // Show chart after loading
      this.dataLoading = false;
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

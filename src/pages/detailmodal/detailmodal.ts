import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detailmodal',
  templateUrl: 'detailmodal.html',
})
export class DetailmodalPage {
  data: Array<{value: number}> = [];
  details : any;
  detaildata : any;
  rating : any;
  mealdetails : any;
  public value;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
     this.value = navParams.get("value");
     this.details = navParams.get("details");
     this.rating = this.details.restaurant.rating;
     this.mealdetails = this.details;
     console.log(this.rating);
     console.log(this.value);
     this.data.push({
          value: this.value
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmodalPage');
  }


}

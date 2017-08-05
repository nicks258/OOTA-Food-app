import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PreferencePage } from '../preference/preference';
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
  bgcol: any;
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
     console.log(this.value);
     if (this.value == 1)
     {
         this.bgcol ="#FEF9D9";
     }
     else if(this.value == 2){
          this.bgcol = "#DEF9D6";
     }
     else if(this.value == 3){
          this.bgcol = "#B9F496";
     }
     else if(this.value == 4){
          this.bgcol = "#ECFCB1";
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmodalPage');
    document.getElementById("ioncontent").style.backgroundColor = this.bgcol ;
  }
  

  goto_preference(){
     this.navCtrl.push(PreferencePage);
  }

}

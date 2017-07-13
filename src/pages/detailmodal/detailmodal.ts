import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detailmodal',
  templateUrl: 'detailmodal.html',
})
export class DetailmodalPage {
  data: Array<{value: number}> = [];
  public value;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
     this.value = navParams.get("value");
     console.log("ok");
     console.log(this.value);
     this.data.push({
          value: this.value
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmodalPage');
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PreferencePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {
  option_val = 0;
  current_option : any;
  current_inneropt : any;
  objectKeys= Object.keys;
  items = {
  "budget": {
    "breakfast": [
      "0#10",
      "10#15",
      "15#20",
      "20#"
    ],
    "lunch": [
      "0#10",
      "10#15",
      "15#20",
      "20#"
    ],
    "dinner": [
      "0#10",
      "10#15",
      "15#20",
      "20#"
    ]
  },
  "distance": [
    "#5",
    "#10",
    "#20"
  ],
  "calorie": {
    "breakfast": [
      "#300",
      "#600",
      "600#"
    ],
    "lunch": [
      "#300",
      "#600",
      "600#"
    ],
    "dinner": [
      "#300",
      "#600",
      "600#"
    ]
  },
  "calorie_bld": 1500,
  "meal_time": {
    "breakfast": [
      "6#7",
      "7#8",
      "8#9"
    ],
    "lunch": [
      "11#12",
      "12#13",
      "13#14",
      "14-15"
    ],
    "dinner": [
      "17#18",
      "18#19",
      "19#20",
      "20#21",
      "21#22"
    ]
  },
  "cuisine": [
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6"
  ],
  "food_type": [
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6"
  ],
  "fast_food": [
    "ff1",
    "ff2",
    "ff3",
    "ff4",
    "ff5",
    "ff6"
  ]
};

  option_data : any;
  selectedItems=new Array();
  checkedItems:boolean[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
      
      console.log(this.items);
      let opt = "budget";
     this.current_option = opt;
     this.current_inneropt = "items."+opt;
     this.option_val = 1;

  }
  


  ionViewDidLoad() {
     console.log('ionViewDidLoad PreferencePage');
     document.getElementById("budget").style.color = "white";
     document.getElementById("budget").style.backgroundColor = "#6666ff";
  }

  selected(option){
     this.current_option = option;
     this.current_inneropt = "items."+option;
     if (option == "budget"){
        this.option_val = 1;
      }
      else if (option == "distance"){
        this.option_val = 2;
      }
      else if (option == "calorie"){
        this.option_val = 3;
      }
      else if (option == "calorie_bld"){
        this.option_val = 4;
      }
      else if (option == "meal_time"){
        this.option_val = 5;
      }
      else if (option == "cuisine"){
        this.option_val = 6;
      }
      else if (option == "food_type"){
        this.option_val = 7;
      }
      else{
        this.option_val = 8;
      }
     console.log(option);
     let x = <HTMLScriptElement[]><any>document.getElementsByClassName("sidecat");
     let i;
     for (i = 0; i < x.length; i++) {
         x[i].style.color = "black";
         x[i].style.backgroundColor="white";
      }
     document.getElementById(option).style.color = "white";
     document.getElementById(option).style.backgroundColor = "#6666ff";
  }
  
  clickedItem(val,event){
    console.log(event.checked);
    console.log(val);
    if(event.checked == true){
      this.selectedItems.push(val);
      console.log(this.selectedItems);
    }
    else{
      let pos = this.selectedItems.indexOf(val);
      console.log(pos);
      this.selectedItems.splice(pos, 1);
      console.log(this.selectedItems);
    }
    this.presentAlert(this.selectedItems);
 }

 presentAlert(options) {
   let alert = this.alertCtrl.create({
      title: 'items',
      subTitle: options,
      buttons: ['OK']
    });
    alert.present();
}

}

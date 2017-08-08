import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";

@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {
  option_val = 0;
  user: any;
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


  applyjson : any;
  option_data : any;
  elem : any;
  selectedItems=new Array();
  checkedItems:boolean[];
  savedpreferences : any;
  email : any;

  constructor(public navCtrl: NavController,public nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public navParams: NavParams, private alertCtrl: AlertController,public http: Http) {
    let opt = "budget";
    this.current_option = opt;
    this.current_inneropt = "items."+opt;
    this.option_val = 1;
    //TODO HARDCODE

    this.nativeStorage.getItem('user')
      .then( (data)=>{
        this.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture,
          email: data.email
        };
        console.log("malo->" + this.user.email);
        this.email = this.user.email;
        this.getcurrentpreference(this.user.email);
      }, function(error){
        console.log("not available in browser");
      });

    // console.log("malo->" + this.user.email);


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePage');
    //document.getElementById("budget").style.color = "white";
    //document.getElementById("budget").style.backgroundColor = "#0CC4A2";
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
    let x = <HTMLScriptElement[]><any>document.getElementsByClassName("sidecat");
    let i;
    for (i = 0; i < x.length; i++) {
      x[i].style.color = "black";
      x[i].style.backgroundColor="#F4F6F5";
    }


    document.getElementById(option).style.color = "white";
    document.getElementById(option).style.backgroundColor = "#0CC4A2";


  }


  getcurrentpreference(emailid){

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading your preferences...',
      spinner: 'circles'
    });
    loadingPopup.present();

    this.http.get('http://54.172.94.76:9000/api/v1/customers/preferences/'+emailid)
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            console.log(data);

            this.savedpreferences = data.data;


            //budget
            if (this.savedpreferences.budget.breakfast.length > 0){
              this.selectedItems.push("items.budget.breakfast-"+this.savedpreferences.budget.breakfast[0]);
              this.check_saved("items.budget.breakfast-",this.savedpreferences.budget.breakfast[0]);
            }
            if (this.savedpreferences.budget.lunch.length > 0){
              this.selectedItems.push("items.budget.lunch-"+this.savedpreferences.budget.lunch[0]);
              this.check_saved("items.budget.lunch-",this.savedpreferences.budget.lunch[0]);
            }
            if (this.savedpreferences.budget.dinner.length > 0){
              this.selectedItems.push("items.budget.dinner-"+this.savedpreferences.budget.dinner[0]);
              this.check_saved("items.budget.dinner-",this.savedpreferences.budget.dinner[0]);
            }
            //distance
            if (this.savedpreferences.distance.length>0){
              this.selectedItems.push("items.distance-"+this.savedpreferences.distance[0]);
              this.check_saved("items.distance-",this.savedpreferences.distance[0]);
            }
            //calorie
            if (this.savedpreferences.calorie.breakfast.length > 0){
              this.selectedItems.push("items.calorie.breakfast-"+this.savedpreferences.calorie.breakfast[0]);
              this.check_saved("items.calorie.breakfast-",this.savedpreferences.calorie.breakfast[0]);
            }
            if (this.savedpreferences.calorie.lunch.length > 0){
              this.selectedItems.push("items.calorie.lunch-"+this.savedpreferences.calorie.lunch[0]);
              this.check_saved("items.calorie.lunch-",this.savedpreferences.calorie.lunch[0]);
            }
            if (this.savedpreferences.calorie.dinner.length > 0){
              this.selectedItems.push("items.calorie.dinner-"+this.savedpreferences.calorie.dinner[0]);
              this.check_saved("items.calorie.dinner-",this.savedpreferences.calorie.dinner[0]);
            }

            //calorie_bld
            if(this.savedpreferences.calorie_bld != 0 ){
              this.selectedItems.push("items.calorie_bld-"+this.savedpreferences.calorie_bld);
              this.check_saved("items.calorie_bld-",this.savedpreferences.calorie.calorie_bld);

            }

            //meal
            if (this.savedpreferences.meal_time.breakfast.length > 0){
              this.selectedItems.push("items.meal_time.breakfast-"+this.savedpreferences.meal_time.breakfast[0]);
              this.check_saved("items.meal_time.breakfast-",this.savedpreferences.meal_time.breakfast[0]);
            }
            if (this.savedpreferences.meal_time.lunch.length > 0){
              this.selectedItems.push("items.meal_time.lunch-"+this.savedpreferences.meal_time.lunch[0]);
              this.check_saved("items.meal_time.lunch-",this.savedpreferences.meal_time.lunch[0]);
            }
            if (this.savedpreferences.meal_time.dinner.length > 0){
              this.selectedItems.push("items.meal_time.dinner-"+this.savedpreferences.meal_time.dinner[0]);
              this.check_saved("items.meal_time.dinner-",this.savedpreferences.meal_time.dinner[0]);
            }
            //cuisine
            if(this.savedpreferences.cuisine.length>0){
              for (let i=0;i<this.savedpreferences.cuisine.length;i++){
                this.selectedItems.push("items.cuisine-"+this.savedpreferences.cuisine[i]);
                this.check_saved("items.cuisine-",this.savedpreferences.cuisine[i]);

              }
            }

            //foodtype
            if(this.savedpreferences.food_type.length>0){
              for (let i=0;i<this.savedpreferences.food_type.length;i++){
                this.selectedItems.push("items.food_type-"+this.savedpreferences.food_type[i]);
                this.check_saved("items.food_type-",this.savedpreferences.food_type[i]);

              }
            }

            //fastfood
            if(this.savedpreferences.fast_food.length>0){
              for (let i=0;i<this.savedpreferences.fast_food.length;i++){
                this.selectedItems.push("items.fast_food-"+this.savedpreferences.fast_food[i]);
                this.check_saved("items.fast_food-",this.savedpreferences.fast_food[i]);

              }
            }





            loadingPopup.dismiss();
          }, 1000);

          console.log(this.selectedItems);
          console.log(JSON.stringify(this.savedpreferences));
        },
        err => {
          loadingPopup.dismiss();
          this.errorpref();
        }
      );
  }

  errorpref(){
    this.savedpreferences =    {
      "budget": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "distance": [],
      "calorie": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "calorie_bld": 0,
      "meal_time": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "cuisine": [],
      "food_type": [],
      "fast_food": []
    };
  }
  check_saved(a,b){
    let option = a+b;
    let j, flag;
    for(j=0;j< this.selectedItems.length; j++){

      if (this.selectedItems[j] == option){
        flag = 1;
        break;
      }
      else{
        flag = 0;
      }
    }

    if (flag == 1)
      return true;
    else
      return false;
  }



  clickedItem(val,event){
    if(event.checked == true){
      this.selectedItems.push(val);
    }
    else{
      let pos = this.selectedItems.indexOf(val);
      this.selectedItems.splice(pos, 1);
    }
    //this.presentAlert(this.selectedItems);
  }

  presentAlert(options) {
    let alert = this.alertCtrl.create({
      title: 'items',
      subTitle: options,
      buttons: ['OK']
    });
    alert.present();
  }

  applypreference(){
    this.applyjson =  this.savedpreferences;

    let j, k, initial_id, choosen_id;
    for(j=0;j< this.selectedItems.length; j++){
      let postpref='this.applyjson', check_presence=0;

      if (this.selectedItems[j].split("-")[0] == "items.calorie_bld")
      {
        this.applyjson.calorie_bld = this.selectedItems[j].split("-")[1];
      }
      else
      {
        initial_id = this.selectedItems[j].split("-")[0].split(".");
        initial_id[0] = "applyjson";
        choosen_id = this.selectedItems[j].split("-")[1];
        for ( k=1; k<initial_id.length; k++){
          postpref = postpref + "." + initial_id[k] ;
        }
        console.log("chosenid : "+postpref);
        console.log(choosen_id);
        check_presence = eval(postpref).indexOf(choosen_id);
        console.log(check_presence);
        if (check_presence == -1)
          eval(postpref).push(choosen_id);
      }
    }
    console.log(this.applyjson);
    //this.presentAlert(JSON.stringify(this.applyjson));
    this.presentAlert("Your preferences are saved successfully!");
    let link = 'http://54.172.94.76:9000/api/v1/customers/preferences';
    //TODO HardCODE
    let data =  {"email":this.email,"preferences":JSON.stringify(this.applyjson)};
    console.log("data to send" + JSON.stringify(data));
    this.http.post(link, data)
      .subscribe(data => {
        console.log("Ok" + data);
        // this.data.response = data.body;
      }, error => {
        console.log("Oooops!");
      });
  }

//   this.http.get('http://54.172.94.76:9000/api/v1/customers/preferences )
// .map(res => res.json())
// .subscribe(
//   data => {
//   console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
//   this.dashboardlist = data.data;
//   this.nextlength = data.data.length;
// },
// err => console.error(err)
// );
  radioItem(id){
    let initial_id = id.split("-")[0];
    let i, current_initialid, flag=0;
    for (i=0;i<this.selectedItems.length; i++)
    {
      current_initialid = this.selectedItems[i].split("-")[0];
      if (initial_id == current_initialid){
        this.selectedItems[i] = id;
        flag = 1;
      }
    }
    if (flag == 0)
    {
      this.selectedItems.push(id);
    }
    console.log(flag);
    console.log(this.selectedItems);
  }
  clearall(){
    this.savedpreferences =    {
      "budget": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "distance": [],
      "calorie": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "calorie_bld": 0,
      "meal_time": {
        "breakfast": [],
        "lunch": [],
        "dinner": []
      },
      "cuisine": [],
      "food_type": [],
      "fast_food": []
    };
    this.selectedItems=new Array();
  }
}

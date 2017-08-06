import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { App  } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  rootPage: any ;
  user: any;
  userReady: boolean = false;
  FB_APP_ID: number = 125195224754920;
  constructor(public app: App,public navCtrl: NavController,public fb: Facebook,public loadingCtrl: LoadingController, public nativeStorage: NativeStorage, public navParams: NavParams,
              public googlePlus: GooglePlus ) {
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doFbLogin(){
    let loading = this.loadingCtrl.create({
      content: 'Logging In...',
      spinner: 'circles'
    });
    loading.present();

    let email1 : any;
    let name1 : any;
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,email,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            env.nativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                name1: user.name,
                email1: user.email,
                picture: user.picture

              })
              .then(function(){
                setTimeout(() => {
                loading.dismiss();
                nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
                }, 1000);
              }, function (error) {
                 setTimeout(() => {
                loading.dismiss();
                // nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
                console.log(error);
                }, 1000);
              })
          })
      }, function(error){
        setTimeout(() => {
                loading.dismiss();
                //nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
                console.log(error);
                }, 1000);
      });
    // let link = 'http://54.172.94.76:9000/api/v1/customers';
    // let data =  {"email":"mehrasumit258@gmail.com","preferences":JSON.stringify(this.applyjson)};
    // console.log("data to send" + JSON.stringify(data));
    // this.http.post(link, data)
    //   .subscribe(data => {
    //     console.log("Ok" + data);
    //     // this.data.response = data.body;
    //   }, error => {
    //     console.log("Oooops!");
    //   });
    console.log("email ->" + email1 +"name->"+ name1);
  }
  doGoogleLogin(){
    let env = this;
    let email1 : any;
    let name1 : any;
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Logging In...',
      spinner: 'circles'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '631829299141-41vpoka0fv6h30qfjpbo940nfaspmckt.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(function (user) {
        env.nativeStorage.setItem('user', {
          name: user.displayName,
          name1: user.displayName,
          email1: user.email,
          email: user.email,
          picture: user.imageUrl
        })
          .then(function(){
            setTimeout(() => {
             loading.dismiss();
            nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
          }, 1000);
          }, function (error) {
             setTimeout(() => {
              loading.dismiss();
              //nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
              console.log(error);
             }, 1000);
          })
      }, function (error) {
        setTimeout(() => {
            loading.dismiss();
            //nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
            console.log(error);
         }, 1000);

      });
  }
  ionViewCanEnter(){
    let env = this;
    this.nativeStorage.getItem('user')
      .then(function (data){
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture
        };

        env.userReady = true;
      }, function(error){
        console.log(error);
      });
  }
}

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
        env.fb.api("/me?fields=name,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            env.nativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
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

  }
  doGoogleLogin(){
    let env = this;
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

}

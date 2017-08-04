import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../pages/login/login';
import { PreferencePage } from '../pages/preference/preference';
import { NativeStorage} from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public nativeStorage: NativeStorage,public googlePlus: GooglePlus, public statusBar: StatusBar, public splashScreen: SplashScreen)
  {
    platform.ready().then(() => {
      let env = this;
      let nav = this.nav;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cart', component: CartPage },
      { title: 'Preference', component: PreferencePage }
      // { title: 'Logout', component: LogoutPage }
    ];

      this.nativeStorage.getItem('user')
        .then( function (data) {
          // user is previously logged and we have his data
          // we will let him access the app
          // this.nav.setRoot(HomePage);
          // this.rootPage = HomePage;
          env.nav.push(HomePage);
          setTimeout(() => {
            this.splashScreen.hide();
          }, 800);
          // setTimeout(() => {
          //   this.splashScreen.hide();
          // }, 800);
        }, function (error) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(LoginPage);
          setTimeout(() => {
            this.splashScreen.hide();
          }, 800);
          // setTimeout(() => {
          //   this.splashScreen.hide();
          // }, 800);
        });

      this.statusBar.styleDefault();
    });
  }
  // {
  //   this.initializeApp();
  //
  //   // used for an example of ngFor and navigation
  //   this.pages = [
  //     { title: 'Home', component: HomePage }
  //   ];
  //
  // }

  initializeApp() {
    this.platform.ready().then(() => {
       this.statusBar.styleDefault();
       setTimeout(() => {
       this.splashScreen.hide();
       }, 800);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nativeStorage.remove('user');
    this.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }
}

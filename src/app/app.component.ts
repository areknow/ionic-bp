// ============================================================================
// App component
// ============================================================================

// Angular + Ionic
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Component
import { AboutPage } from '../pages/about/about';

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // Define landing page component
  rootPage:any = AboutPage;

  // ----------------------------------------------------------------------------
  // Inject services
  // ----------------------------------------------------------------------------
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}

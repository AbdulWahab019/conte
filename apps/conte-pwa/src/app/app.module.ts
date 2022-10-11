/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

/* Environment */
import { environment } from '../environments/environment';
import { ToastComponent } from './components/shared/toast/toast/toast.component';
import { TermsOfUseComponent } from './components/termsOfUse/terms-of-use/terms-of-use.component';
import { OrientationVideoComponent } from './components/shared/orientation/orientation-video/orientation-video.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    AuthenticationComponent,
    ToastComponent,
    TermsOfUseComponent,
    OrientationVideoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgbModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

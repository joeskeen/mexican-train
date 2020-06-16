import {
  BrowserModule
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgModule,
  ErrorHandler
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  CashmereModule
} from './cashmere.module';
import {
  DominoComponent
} from './domino/domino.component';
import {
  AppErrorHandler
} from './app.error-handler';

@NgModule({
  declarations: [
    AppComponent,
    DominoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CashmereModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: AppErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
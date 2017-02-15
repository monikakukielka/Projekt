import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import { ExampleWordsPage } from '../pages/example-words/example-words';
import { AddGroupPage } from '../pages/add-group/add-group';
import { AddWordPage } from '../pages/add-word/add-word';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    Signup,
    MainPage,
    AddGroupPage,
    AddWordPage,
    ExampleWordsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    Signup,
    MainPage,
    AddGroupPage,
    AddWordPage,
    ExampleWordsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

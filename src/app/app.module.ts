import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import { ExampleWordsPage } from '../pages/example-words/example-words';
import { AddGroupPage } from '../pages/add-group/add-group';
import { AddWordPage } from '../pages/add-word/add-word';
import {StorageService} from "./storage.service";
import { TestPage } from "../pages/test/test";
import {TabsPage} from '../pages/tabs/tabs';
import { MyGroupPage } from '../pages/my-group/my-group';
import {TabsMyGroupPage} from "../pages/tabs-my-group/tabs-my-group";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    Signup,
    MainPage,
    AddGroupPage,
    AddWordPage,
    TestPage,
    ExampleWordsPage,
    TabsPage,
    MyGroupPage,
    TabsMyGroupPage

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
    TestPage,
    ExampleWordsPage,
    TabsPage,
    MyGroupPage,
    TabsMyGroupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler }, StorageService]
})
export class AppModule {}

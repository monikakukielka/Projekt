import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import {WordsViewPage} from "../pages/words-view/words-view";
import { LearnWordsPage } from "../pages/learn-words/learn-words";
import { EditGroupPage } from "../pages/edit-group/edit-group";
import { ManageWordsPage } from "../pages/manage-words/manage-words";
import { EditWordPage } from "../pages/edit-word/edit-word";

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
    TabsMyGroupPage,
    WordsViewPage,
    LearnWordsPage,
    EditGroupPage,
    ManageWordsPage,
    EditWordPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    FormsModule
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
    TabsMyGroupPage,
    WordsViewPage,
    LearnWordsPage,
    EditGroupPage,
    ManageWordsPage,
    EditWordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler }, StorageService]
})
export class AppModule {}

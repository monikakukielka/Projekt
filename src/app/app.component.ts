import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    console.log("!111!!!!!!!!!!!!!!!!!!!!!!");
    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        db.executeSql("CREATE TABLE IF NOT EXISTS uzytkownik (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT, haslo TEXT, imie TEXT)", {}).then((data) => {
          console.log("TABLE CREATED: ", data);
          console.log("!3333333!!!!!!!!!!!!!!!!!!!!!!");

        }, (error) => {
          console.log("!44444!!!!!!!!!!!!!!!!!!!!!!");
          console.error("Unable to execute sql", error);
        })
      }, (error) => {

        console.log("!55555!!!!!!!!!!!!!!!!!!!!!!");
        console.error("Unable to open database", error);
      });
    });
    console.log("!222222!!!!!!!!!!!!!!!!!!!!!!");
  }

}

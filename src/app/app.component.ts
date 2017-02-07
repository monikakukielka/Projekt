import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {StatusBar, SQLite, Toast} from 'ionic-native';

import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = LoginPage;

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        db.executeSql("CREATE TABLE IF NOT EXISTS uzytkownik (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT UNIQUE, haslo TEXT, imie TEXT)", {}).then((data) => {
            console.log("TABLE uzytkownik CREATED: ", data);
          }, (error) => {
            console.error("Unable to execute sql", error);
          }
        )
      }, (error) => {

        console.error("Unable to open database", error);
      });
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KET AUTOINCREMENT, nazwa TEXT, id_uzytkownika TEXT FOREIGN KEY )", {}).then((data) => {
          console.log("TABLE grupa CREATED: ", data);
          this.showToast('Created','top');

        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });
    });


    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KET AUTOINCREMENT, nazwa TEXT, id_uzytkownika TEXT FOREIGN KEY )", {}).then((data) => {
          console.log("TABLE grupa CREATED: ", data);
          this.showToast('Created','top');

        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });
    });



    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KET AUTOINCREMENT, nazwa TEXT, id_uzytkownika INTEGER, FOREIGN KEY(id_uzytkownika) REFERENCES uzytkownik(id) )", {}).then((data) => {
          console.log("TABLE grupa CREATED: ", data);
          this.showToast('Created','top');

        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });
    });

  }
}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {StatusBar, Splashscreen, SQLite, Toast} from 'ionic-native';

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
        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });


      db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KEY AUTOINCREMENT, nazwa TEXT, id_uzytkownika INTEGER, FOREIGN KEY(id_uzytkownika) REFERENCES BY uzytkownik((id))", {}).then((data) => {
        console.log("TABLE grupa CREATED: ", data);
        this.showToast('Created', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS slowo_ang (id INTEGER PRIMARY KEY AUTOINCREMENT, slowo TEXT)", {}).then((data) => {
        console.log("TABLE slowo_ang CREATED: ", data);
        this.showToast('Created slowo_ang', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS slowo_pol (id INTEGER PRIMARY KEY AUTOINCREMENT, slowo TEXT)", {}).then((data) => {
        console.log("TABLE slowo_pol CREATED: ", data);
        this.showToast('Created slowo_pol', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS tlumaczenie (id INTEGER PRIMARY KEY AUTOINCREMENT, id_slowo_ang INTEGER, id_slowo_pol INTEGER, FOREIGN KEY(id_slowo_ang) REFERENCES slowo_ang(id)), FOREIGN KEY(id_slowo_pol) REFERENCES slowo_pol(id)", {}).then((data) => {
        console.log("TABLE tlumaczenie CREATED: ", data);
        this.showToast('Created tlumaczenie', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }

      db.executeSql("CREATE TABLE IF NOT EXISTS grupa_tlumaczenie (id_grupa INTEGER, id_tlumaczenie INTEGER, FOREIGN KEY(id_grupa) REFERENCES grupa(id), FOREIGN KEY(id_tlumaczenie) REFERENCES tlumaczenie(id), PRIMARY KEY(id_grupa, id_tlumaczenie) )", {}).then((data) => {
        console.log("TABLE grupa CREATED: ", data);
        this.showToast('Created', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }

    });
  }
}


  /*  platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KEY AUTOINCREMENT, nazwa TEXT, id_uzytkownika INTEGER, FOREIGN KEY(id_uzytkownika) REFERENCES BY uzytkownik((id))", {}).then((data) => {
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

        db.executeSql("CREATE TABLE IF NOT EXISTS slowo_ang (id INTEGER PRIMARY KEY AUTOINCREMENT, slowo TEXT)", {}).then((data) => {
          console.log("TABLE slowo_ang CREATED: ", data);
          this.showToast('Created slowo_ang','top');

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

        db.executeSql("CREATE TABLE IF NOT EXISTS slowo_pol (id INTEGER PRIMARY KEY AUTOINCREMENT, slowo TEXT)", {}).then((data) => {
          console.log("TABLE slowo_pol CREATED: ", data);
          this.showToast('Created slowo_pol','top');

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

        db.executeSql("CREATE TABLE IF NOT EXISTS tlumaczenie (id INTEGER PRIMARY KEY AUTOINCREMENT, id_slowo_ang INTEGER, id_slowo_pol INTEGER, FOREIGN KEY(id_slowo_ang) REFERENCES slowo_ang(id)), FOREIGN KEY(id_slowo_pol) REFERENCES slowo_pol(id)", {}).then((data) => {
          console.log("TABLE tlumaczenie CREATED: ", data);
          this.showToast('Created tlumaczenie','top');

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

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa_tlumaczenie (id_grupa INTEGER, id_tlumaczenie INTEGER, FOREIGN KEY(id_grupa) REFERENCES grupa(id), FOREIGN KEY(id_tlumaczenie) REFERENCES tlumaczenie(id), PRIMARY KEY(id_grupa, id_tlumaczenie) )", {}).then((data) => {
          console.log("TABLE grupa CREATED: ", data);
          this.showToast('Created','top');

        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });
    });

*/


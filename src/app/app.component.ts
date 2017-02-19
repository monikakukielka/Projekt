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
        db.executeSql("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, name TEXT)", {}).then((data) => {
          console.log("TABLE user CREATED: ", data);
        }), (error) => {
          console.error("Unable to execute sql", error);
        }
      });


      db.executeSql("CREATE TABLE IF NOT EXISTS group (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT, id_user INTEGER, FOREIGN KEY(id_user) REFERENCES BY user((id))", {}).then((data) => {
        console.log("TABLE group CREATED: ", data);
        this.showToast('Created', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS word_en (id INTEGER PRIMARY KEY AUTOINCREMENT, word_en_name TEXT)", {}).then((data) => {
        console.log("TABLE word_en CREATED: ", data);
        this.showToast('Created word_en', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS word_pl (id INTEGER PRIMARY KEY AUTOINCREMENT, word_pl_name TEXT)", {}).then((data) => {
        console.log("TABLE word_pl CREATED: ", data);
        this.showToast('Created word', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }


      db.executeSql("CREATE TABLE IF NOT EXISTS translation (id INTEGER PRIMARY KEY AUTOINCREMENT, id_word_en INTEGER, id_word_pl INTEGER, FOREIGN KEY(id_word_en) REFERENCES word_en(id)), FOREIGN KEY(id_word_pl) REFERENCES word_pl(id)", {}).then((data) => {
        console.log("TABLE translation CREATED: ", data);
        this.showToast('Created translation', 'top');

      }), (error) => {
        console.error("Unable to execute sql", error);
      }

      db.executeSql("CREATE TABLE IF NOT EXISTS group_translation (id_group INTEGER, id_translation INTEGER, FOREIGN KEY(id_group) REFERENCES group(id), FOREIGN KEY(id_translation) REFERENCES translation(id), PRIMARY KEY(id_group, id_translation) )", {}).then((data) => {
        console.log("TABLE group_translation CREATED: ", data);
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


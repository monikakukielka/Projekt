import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, SQLite, Toast } from 'ionic-native';
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
        db.executeSql("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)", {}).then((data) => {
          console.log("TABLE user CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }



        db.executeSql("CREATE TABLE IF NOT EXISTS word_en (id INTEGER PRIMARY KEY AUTOINCREMENT, word_en_name TEXT NOT NULL, sentence_en TEXT)", {}).then((data) => {
          console.log("TABLE word_en CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }


        db.executeSql("CREATE TABLE IF NOT EXISTS word_pl (id INTEGER PRIMARY KEY AUTOINCREMENT, word_pl_name TEXT NOT NULL, sentence_pl TEXT)", {}).then((data) => {
          console.log("TABLE word_pl CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }


        db.executeSql("CREATE TABLE IF NOT EXISTS translation (id INTEGER PRIMARY KEY AUTOINCREMENT, id_word_en INTEGER, id_word_pl INTEGER, FOREIGN KEY(id_word_en) REFERENCES word_en(id), FOREIGN KEY(id_word_pl) REFERENCES word_pl(id))", {}).then((data) => {
          console.log("TABLE translation CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }

        console.log("przed tworzeniem ");

        db.executeSql("CREATE TABLE IF NOT EXISTS grupa (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, built_in integer DEFAULT 0, id_user INTEGER, FOREIGN KEY(id_user) REFERENCES user(id))", {}).then((data) => {
          console.log("TABLE group CREATED:");


        }), (error) => {
          console.error("Unable to execute sql", error);
        }

        console.log("po tworzeniu ");

        db.executeSql("CREATE TABLE IF NOT EXISTS group_translation (id_group INTEGER, id_translation INTEGER, FOREIGN KEY(id_group) REFERENCES grupa(id), FOREIGN KEY(id_translation) REFERENCES translation(id), PRIMARY KEY(id_group, id_translation) )", {}).then((data) => {
          console.log("TABLE group_translation CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }


        db.executeSql("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, positive_score INTEGER, negative_score INTEGER, id_group INTEGER, FOREIGN KEY(id_group) REFERENCES grupa(id) )", {}).then((data) => {
          console.log("TABLE group_translation CREATED: ", data);


        }), (error) => {
          console.error("Unable to execute sql", error);
        }

      });
    });
  }
}


  


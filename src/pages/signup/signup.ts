import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite } from 'ionic-native';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  public database: SQLite;
  public uzytkownik: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
      console.log("ERROR constructor: ", error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goToLogin(){
    this.navCtrl.pop();
  }

  public add() {
    this.database.executeSql("INSERT INTO uzytkownik(id, login, haslo, imie) VALUES (1,'monia','monia','monia')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });
  }

  public refresh(){
    this.database.executeSql("SELECT * FROM uzytkownik", []).then((data) => {
        this.uzytkownik = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.uzytkownik.push({
              login: data.rows.item(i).login,
              haslo: data.rows.item(i).haslo,
              imie: data.rows.item(i).imie
            });
          }
        }
      },(error) => {
          console.log("ERROR refresh: " + JSON.stringify(error));

        });
  }
}

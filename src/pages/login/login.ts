import { Component } from '@angular/core';

import {NavController, Platform, NavParams} from 'ionic-angular';

import { Signup } from '../signup/signup';
import {MainPage} from '../main/main';
import {SQLite, Splashscreen, StatusBar, Toast} from 'ionic-native';

@Component({
  templateUrl: 'login.html'
})


export class LoginPage {
  public username_id: String = '';
  public password_id: String = '';
  public login_variable: String = '';
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

  goToSignUp(){
    this.navCtrl.push(Signup);
  }
  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  login(){
    this.database.executeSql("SELECT id FROM uzytkownik WHERE login = "+ this.username_id +" " , []).then((data) => {
      this.showToast('Zalogowany','top');
      this.navCtrl.push(MainPage);
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



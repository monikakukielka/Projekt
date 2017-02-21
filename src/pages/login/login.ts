import { Component } from '@angular/core';

import {NavController, Platform, NavParams} from 'ionic-angular';

import { Signup } from '../signup/signup';
import { MainPage } from '../main/main';
import {SQLite, Splashscreen, StatusBar, Toast} from 'ionic-native';
import {StorageService} from "../../app/storage.service";
import { TabsPage} from "../tabs/tabs";

@Component({
  templateUrl: 'login.html'
})


export class LoginPage {
  public zmienna: String ='';
  public username: String = '';
  public password: String = '';
  public database: SQLite;
  public user: Array<Object>;
  private id_var;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storageService: StorageService) {

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
    this.showToast('Przed logowaniem','top');
    //this.showToast(this.username,'top');
    this.database.executeSql("SELECT id FROM user WHERE username='"+this.username+"' and password='"+this.password+"'" , []).then((data) => {

       // this.showToast(this.id_var,'top');
      this.showToast('weszło','top');

      console.log(JSON.stringify(data.rows.item(0)));

        if(data.rows.length > 0) {
          this.storageService.id_user=data.rows.item(0).id;
          this.showToast(data.rows.item(0).id,'top');

        this.navCtrl.push(TabsPage);
        }



    }, (error) =>{
      this.showToast('Brak uzytkonika', top);
    });

  }

  public refresh(){
    this.database.executeSql("SELECT * FROM user", []).then((data) => {
      this.user = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.user.push({
            username: data.rows.item(i).username,
            password: data.rows.item(i).password

           // name: data.rows.item(i).name
          });
        }
      }
    },(error) => {
      console.log("ERROR refresh: " + JSON.stringify(error));

    });
  }

}



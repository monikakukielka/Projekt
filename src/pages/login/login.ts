import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Signup } from '../signup/signup';
import { TabsPage} from "../tabs/tabs";

@Component({
  templateUrl: 'login.html'
})


export class LoginPage {
  public zmienna: String ='';
  public username: String = '';
  public password: String = '';

  public user: Array<Object>;

  constructor(public navCtrl: NavController) {
/*
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
*/
  }

  goToSignUp(){
    this.navCtrl.push(Signup);
  }



  login() {

    this.navCtrl.push(TabsPage);
   // this.showToast('Przed logowaniem', 'top');
  /*  if (this.username != '' && this.password != '') {
      this.database.executeSql("SELECT id FROM user WHERE username='" + this.username + "' and password = '"+this.password+"'" , []).then((data) => {
        console.log("Znalazlem uzytkownika " + JSON.stringify(data));
        this.storageService.id_user=data.rows.item(0).id;
        // return this.id_user
        console.log("Zalogowałem");
        this.navCtrl.push(TabsPage).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });;
      }, (error) =>{
        console.log(" Error login: "+ JSON.stringify(error.err));
      });

    }
    else {
      this.showToast('Musisz podać dane!!', 'top');
    }*/

  }
    //this.showToast(this.username,'top');
    /*this.database.executeSql("SELECT id FROM user WHERE username='"+this.username+"' and password='"+this.password+"'" , []).then((data) => {

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
    */
/*

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

    });*/


}



import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';
import {LoginPage} from '../login/login';

declare var window: any;

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  public database: SQLite;
  public uzytkownik: Array<Object>;
  public name_id: String = '';
  public username_id: String = '';
  public password_id: String = '';
  public confirm_password_id: String ='';

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

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


  public signup() {
    if (this.password_id == this.confirm_password_id){
      this.database.executeSql("INSERT INTO uzytkownik(login, haslo, imie) VALUES ('"+this.name_id+"','"+this.username_id+"','"+this.password_id+"')", []).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));

        this.showToast('INSERTED','top');
        this.navCtrl.push(LoginPage);

      }, (error) => {
        console.log("ERROR add: " + JSON.stringify(error.err));
      });

    }
    else{
      alert("Bad confirm password");
    }



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

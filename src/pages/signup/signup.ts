import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';
import {LoginPage} from '../login/login';
import {StorageService} from "../../app/storage.service";

declare var window: any;

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  public database: SQLite;
  public user: Array<Object>;
  public username: String = '';
  public password: String = '';
  public confirm_password: String ='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,  private storageService: StorageService) {
  /*  this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
      console.log("ERROR constructor: ", error);
      });
    }); */
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
    console.log("Weszłem do logowania");

    if (this.password == this.confirm_password) {
      console.log("Username w signup: "+ this.username);

      this.storageService.addUserService(this.username, this.password);
      console.log("Dodałem");
      this.navCtrl.push(LoginPage);
    }
    /*   this.database.executeSql("INSERT INTO user(username, password) VALUES ('"+this.username +"','"+this.password+"')", []).then((data) => {
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
     this.database.executeSql("SELECT * FROM user", []).then((data) => {
     this.user = [];
     if (data.rows.length > 0) {
     for (var i = 0; i < data.rows.length; i++) {
     this.user.push({
     username: data.rows.item(i).username,
     password: data.rows.item(i).password,
     });
     }
     }
     },(error) => {
     console.log("ERROR refresh: " + JSON.stringify(error));

     });
     }
     */


  }

}

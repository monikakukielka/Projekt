import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MyGroupPage} from "../my-group/my-group";
import {AddGroupPage} from "../add-group/add-group";
import {EditGroupPage} from "../edit-group/edit-group";
import {MainPage} from "../main/main";

/*
  Generated class for the TabsMyGroup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs-my-group',
  templateUrl: 'tabs-my-group.html'
})
export class TabsMyGroupPage {
  tab1MyGroup = MyGroupPage;
  tab2MyGroup= AddGroupPage;
  tab3MyGroup= EditGroupPage;



  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsMyGroupPage');
  }

  goAddGroupView(){
    this.navCtrl.push(AddGroupPage);
  }
  goEditGroupPage(){
    this.navCtrl.push(EditGroupPage);
  }


}

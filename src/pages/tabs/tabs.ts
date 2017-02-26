import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { MyGroupPage } from '../my-group/my-group';
import {TabsMyGroupPage} from "../tabs-my-group/tabs-my-group";
import {EditGroupPage} from "../edit-group/edit-group";
import {NavigationService} from "../../app/navigation.service";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;
  tab2Root= MyGroupPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public navigationService: NavigationService) {

    this.navigationService.subject.subscribe((value) => {
      console.log("Subscription got", value); // Subscription wont get
                                              // anything at this point
      this.navCtrl.push(value);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onNotify(message:string):void {

    console.log("On notify");
    this.navCtrl.push(EditGroupPage);
  }

}

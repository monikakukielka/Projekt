import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {MyGroupPage} from "../my-group/my-group";

/*
  Generated class for the EditGroup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html'
})
export class EditGroupPage {

  public id_group_s: number=0;
  public group_name: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGroupPage');
  }


  editGroup(){

    this.storageService.editGroup(this.storageService.id_group_s, this.group_name);
    this.navCtrl.push(MyGroupPage);
  }



}

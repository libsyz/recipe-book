import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

onSubmit(form) {
  if (form.value.amount == "") {
    console.log("Sorry amount can't be empty");
  }
  if (form.value.ingredientName == "") {
    console.log("Sorry ingredientName can't be empty");
  }
}
}

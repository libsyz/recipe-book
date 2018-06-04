import { Ingredient } from './../../models/ingredient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from './../../services/shopping-list.service';


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
 ingredients: Ingredient[] = [];

 constructor(private shoppingListService: ShoppingListService) {
   this.ingredients = this.shoppingListService.getItems();
 }

onAddItem(form) {
  let myIngredient = form.value.ingredientName;
  const myAmount = form.value.amount;
  this.shoppingListService.addItem(myIngredient, myAmount);
  this.loadItems();
  form.reset();
  }

deleteItem(index: number) {
  this.shoppingListService.removeItem(index);
  this.loadItems();
}

loadItems() {
  this.ingredients = this.shoppingListService.getItems();
}



}

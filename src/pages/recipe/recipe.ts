import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';
import { EditRecipePage } from './../edit-recipe/edit-recipe';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private slService: ShoppingListService,
              private recipeService: RecipeService) {
  }
  recipe: Recipe;
  index: number;

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('i');
  }

  onViewWillEnter() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('i');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  onEditRecipe() { 
    this.navCtrl.push(EditRecipePage, {mode: "Edit", recipe: this.recipe,
                                          index: this.index})
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.navCtrl.popToRoot();
  }



}

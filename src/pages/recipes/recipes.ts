import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../../models/recipe';



/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {
  allRecipes: Recipe[];

  constructor (public navCtrl: NavController,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.allRecipes = this.recipeService.getRecipes();
  }

  ionViewWillEnter() {
    console.log(this.recipeService.getRecipes);
    this.allRecipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }


}
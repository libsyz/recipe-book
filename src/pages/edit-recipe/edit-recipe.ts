import { Ingredient } from './../../models/ingredient';
import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Form, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { MyApp } from '../../app/app.component';
import { RecipeService } from './../../services/recipe.service';


/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode: string = "new";
  selectOptions: string[] = ["Easy", "Medium", "Difficult"];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;
  constructor( private navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService,
    private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if (this.mode == "Edit") {;
      this.recipe = this.navParams.get("recipe");
      this.index = this.navParams.get("i");
    }
    this.initalizeForm();
  }
  
  private initalizeForm() {
    let title = null;
    let description = null;
    let difficulty = "Medium";
    let ingredients = [];

    if (this.mode == "Edit") {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    const formValues = this.recipeForm.value;
    let ingredients = [];
    if (formValues.ingredients.length > 0) {
      ingredients = formValues.ingredients.map(name => {
        return {name: name, amount: 1}
      })
    }
    if (this.mode == "Edit") {
      this.recipeService.updateRecipe(this.index, formValues.title, formValues.description, 
        formValues.difficulty, ingredients);
    }
    else {
      this.recipeService.addRecipe(formValues.title, formValues.description, 
        formValues.difficulty, ingredients);
    }
      this.recipeForm.reset();
      this.navCtrl.popToRoot();
      
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "what do you want to do?",
      buttons: [
        {
          text: "Add Ingredient",
          handler: ()=> {
            this.createNewIngredientAlert();
          }
        },
        {
          text: "Remove All Ingredients",
          role: "destructive",
          handler: ()=> {
            const fArray: FormArray = (<FormArray>this.recipeForm.get('ingredients'));
            const length = fArray.length;
            if (length > 0) {
              for (let i = length - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
            }
            this.showToast("Your ingredients were deleted!");
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }


  private createNewIngredientAlert(){
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: "name",
          placeholder: "Name"
        }
      ],
      buttons:[
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Add",
          handler: data => {
            if (data.name.trim() == "" || data.name == null) {
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
             this.showToast(`${data.name} was added!`);
          }
        }
        ]
    });
    newIngredientAlert.present();
  }


  showToast(message: string) {
    const myToast = this.toastCtrl.create({
      message: message,
      duration: 1000
    })
    myToast.present();
  }
 }

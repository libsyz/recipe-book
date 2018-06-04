import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Form, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { MyApp } from '../../app/app.component';

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
  constructor( private navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    this.initalizeForm();
  }
  
  private initalizeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl("Medium", Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
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

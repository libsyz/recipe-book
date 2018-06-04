import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';

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
  constructor( private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    this.initalizeForm();
  }
  
  private initalizeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl("Medium", Validators.required )
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}

import { Ingredient } from './../models/ingredient';


export class ShoppingListService {
 private ingredients: Ingredient[] = [];
 
 addItem(name: string, amount: number) {
     const myIngredient = new Ingredient(name, amount)
     this.ingredients.push(myIngredient);
 }

 addItems(ingredients: Ingredient[]) {
     this.ingredients.push(...ingredients);
 }

 getItems() {
     return this.ingredients.slice(); // return a copy of the array
 }

 removeItem(index: number) {
     this.ingredients.splice(index, 1);
 }
}
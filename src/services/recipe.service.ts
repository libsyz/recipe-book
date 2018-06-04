import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
export class RecipeService {
    private recipesArray: Recipe[] = [];

    addRecipe(title: string,
              description: string,
              difficulty: string,
              ingredients: Ingredient[]) {
        this.recipesArray.push(new Recipe(title, description, difficulty, ingredients));
        console.log("here I am");
        console.log(this.recipesArray);
    }

    getRecipes() {
        return this.recipesArray.slice();
    }

    updateRecipe(index: number, 
                 title: string,
                description: string, 
                difficulty: string,
                ingredients: Ingredient[]) {
                    
    this.recipesArray[index] = new Recipe(title, description, difficulty, ingredients)

    console.log("edited the recipe!");          
    }

    deleteRecipe(index: number) {
        this.recipesArray.splice(index, 1);
    }

}
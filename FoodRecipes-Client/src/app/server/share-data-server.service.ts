import { Injectable } from '@angular/core';
import { Recipe } from '../object/recipe.modul';
import { RecipeServerService } from './recipe-server.service';


@Injectable({
  providedIn: 'root'
})
export class ShareDataServerService {

  // Define array of strings for the select form
  public allDiet: string[] = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
    "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30", ""];

  public allCategory: string[] = ["main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink", ""];

  public allCousin: string[] = ["African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European",
    "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
    "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese", ""];

  public reciepList: Array<Recipe> = new Array();
  public favoriteList: Array<number> = new Array();

  constructor(private recipeServer: RecipeServerService) { }

  // Update the DB when the favorite button of a recipe is pressed
  async checkClick(isFavorite: boolean, recipeId: number): Promise<boolean> {
    if (!isFavorite) {
      this.favoriteList.push(recipeId);

      await this.recipeServer.addFavorite(recipeId);
      isFavorite = true;
    } else {
      await this.recipeServer.deleteFavorite(recipeId);
      isFavorite = false;
    }

    return isFavorite;
  }

  // Get the list of favorite recipes from the DB
  async getFavoriteList() {
    await this.recipeServer.getAllFavorite().then((favorite: Array<{ id: number; }>) => {
      favorite.forEach((element: { id: number; }) => {
        this.favoriteList.push(element.id)
      });
    });
  }

  // Check and mark if the recipe is favorite
  checkIfRecipeFavorite(id: number) {
    var isFavorite: boolean = false;

    this.favoriteList.forEach((recipeid) => {
      if (recipeid == id) {
        isFavorite = true;
      }
    });

    return isFavorite;
  }
}

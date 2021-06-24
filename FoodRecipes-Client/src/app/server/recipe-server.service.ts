import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../object/recipe.modul';
import { RecipeDetails } from '../object/recipeDetails.modul';

@Injectable({
  providedIn: 'root'
})
export class RecipeServerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  public getRandomRecipe(): Promise<any> {
    return this.http.get<Recipe>("http://localhost:8080/getRecipes").toPromise();
  }

  public getRecipeDetailsByID(id: number): Promise<any> {
    return this.http.get<RecipeDetails>("http://localhost:8080/getRecipe/?id=" + id).toPromise();
  }

  public getRecipeByID(id: number): Promise<any> {
    return this.http.get<Recipe>("http://localhost:8080/getRecipe/?id=" + id).toPromise();
  }

  public getRecipeByFreeText(text: string): Promise<any> {
    return this.http.get<Recipe>("http://localhost:8080/getRecipesByName/?titleMatch=" + text).toPromise();
  }

  public addFavorite(id: number): Promise<any> {
    return this.http.post("http://localhost:8080/saveFavoriteRecipe", id, this.httpOptions).toPromise();
  }

  public deleteFavorite(id: number): Promise<any> {
    return this.http.post("http://localhost:8080/deleteFavoriteRecipe", id, this.httpOptions).toPromise();
  }

  public getAllFavorite(): Promise<any> {
    return this.http.get<number>("http://localhost:8080/getAllFavoritesRecipes").toPromise();
  }

  public getRecipeByFilter(diet: string, cuisine: string, type: string): Promise<any> {
    console.log(diet, cuisine, type);
    return this.http.get<Recipe>("http://localhost:8080/getRecipesByFilter/?diet=" + diet + "&cuisine=" + cuisine + "&type=" + type).toPromise();
  }
}

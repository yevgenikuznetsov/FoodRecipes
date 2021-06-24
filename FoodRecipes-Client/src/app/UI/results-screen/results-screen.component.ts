import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/object/recipe.modul';
import { RecipeDetails } from 'src/app/object/recipeDetails.modul';
import { RecipeServerService } from 'src/app/server/recipe-server.service';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';

@Component({
  selector: 'app-results-screen',
  templateUrl: './results-screen.component.html',
  styleUrls: ['./results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {
  private text!: string;
  public isLoading: boolean = false;

  constructor(private router: ActivatedRoute, private recipeServer: RecipeServerService, private shareServer: ShareDataServerService) { }

  ngOnInit(): void {
    this.shareServer.favoriteList = [];
    // Get favorite recipes from DB
    this.shareServer.getFavoriteList().then(() => {
      // Get the reasult recipe by path value
      this.getRelevantRecipes(this.router.snapshot.routeConfig?.path!);
    })
  }

  getRelevantRecipes(path: string) {
    switch (path) {
      case 'favorites':
        this.getFavoriteRecipeFromDB();
        break;
      case 'searchRecipe':
        this.getFreeTextResult();
        break;
      case 'filter':
        this.getFilterRecipe();
        break;
    }
  }

  // Get the recipes according to the values of the filter
  getFilterRecipe() {
    this.router.queryParams.subscribe(params => {
      // Check which categories in filter have a value and get relevant recipe from DB
      this.recipeServer.getRecipeByFilter(params.diet == undefined ? null : params.diet
        , params.cuisine == undefined ? null : params.cuisine
        , params.type == undefined ? null : params.type)
        .then((recipes) => {
          this.shareServer.reciepList = recipes.results;
          this.isLoading = true;
        });
    });
  }

  // Find the relevant recipes according to the written text
  getFreeTextResult() {
    // Get text from param
    this.router.queryParams.subscribe(params => {
      this.text = params.text;
    })

    // Get relevant recipes from DB
    this.recipeServer.getRecipeByFreeText(this.text)
      .then((recipes) => {
        this.shareServer.reciepList = recipes.results;
        this.isLoading = true;
      })
  }

  // Get all Favorite recipe from DB
  async getFavoriteRecipeFromDB() {
    this.shareServer.reciepList = [];

    this.shareServer.favoriteList.forEach(async (id) => {
      // Find Recipe in DB by id from favorite list
      await this.recipeServer.getRecipeByID(id).then((recipe: RecipeDetails) => {
        this.shareServer.reciepList.push(new Recipe(recipe.id, recipe.title, recipe.image))
      });

      this.isLoading = true;
    })
  }
}

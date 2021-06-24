import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetails } from 'src/app/object/recipeDetails.modul';
import { RecipeServerService } from 'src/app/server/recipe-server.service';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  private id!: number;
  public isLoading: boolean = false;
  public isFavorite: boolean = false;

  public recipeDetails!: RecipeDetails;

  constructor(private recipeServer: RecipeServerService, private router: ActivatedRoute, private shareServer: ShareDataServerService) { }

  ngOnInit(): void {
    this.shareServer.favoriteList = [];

    this.shareServer.getFavoriteList().then(() => {
      this.getIdFromURL();
      this.getRecipe();
    });
  }

  // Get id of recipe from url param
  getIdFromURL() {
    this.router.queryParams.subscribe(params => {
      this.id = params.id;
    })
  }

  // Get recipe detiles
  getRecipe() {
    this.recipeServer.getRecipeDetailsByID(this.id).then((recipe) => {
      this.recipeDetails = recipe;
    }).then(() => {
      this.isFavorite = this.shareServer.checkIfRecipeFavorite(this.id);
      this.isLoading = true;
    })
  }

  clickOnFavorite() {
    this.shareServer.checkClick(this.isFavorite, this.id).then((res) => {
      this.isFavorite = res;
    })
  }
}



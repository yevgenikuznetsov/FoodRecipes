import { Component, OnInit } from '@angular/core';
import { RecipeServerService } from 'src/app/server/recipe-server.service';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(private recipeServer: RecipeServerService, private shareServer: ShareDataServerService) { }

  ngOnInit(): void {
    this.shareServer.favoriteList = [];

    this.getRandomRecipes()
  }

  // Get Random Recipe to main screen
  // Get all favorites recipe id that was found in the DB
  getRandomRecipes() {
    this.recipeServer.getRandomRecipe().then((recipes) => {
      this.shareServer.reciepList = recipes.recipes;
    }).then(() => {
      this.shareServer.getFavoriteList().then(() => {
        this.isLoading = true;
      });
    });
  }
}

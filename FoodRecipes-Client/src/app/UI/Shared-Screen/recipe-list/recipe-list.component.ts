import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/object/recipe.modul';
import { RecipeServerService } from 'src/app/server/recipe-server.service';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  randomRecipe: Array<Recipe> = [];
  isLoading: boolean = false;


  constructor(private shareServer: ShareDataServerService) {
  }

  ngOnInit(): void {
    this.randomRecipe = this.shareServer.reciepList;
  }

  removeRecipeFromList(index: number): void {
    this.shareServer.reciepList.splice(index, 1);
  }
}

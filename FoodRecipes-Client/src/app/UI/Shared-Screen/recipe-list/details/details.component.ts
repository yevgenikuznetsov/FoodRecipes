import { Identifiers } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/object/recipe.modul';
import { RecipeServerService } from 'src/app/server/recipe-server.service';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() deleteFavoreRecipe = new EventEmitter<number>();

  public isFavorite: boolean = false;

  constructor(private router: Router, private shareServer: ShareDataServerService, private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.isFavorite = this.shareServer.checkIfRecipeFavorite(this.recipe.id);
  }

  getRecipe() {
    this.router.navigate(['/recieps/'], { queryParams: { id: this.recipe.id } })
  }

  clickOnFavorite() {
    this.shareServer.checkClick(this.isFavorite, this.recipe.id).then((res) => {
      this.isFavorite = res;
    })

    // Delete favorite recipe from favorite screen
    if (this.routerActive.snapshot.routeConfig?.path! === 'favorites') {
      var index = this.shareServer.reciepList.indexOf(this.recipe)
      this.deleteFavoreRecipe.emit(index);
    }
  }
}

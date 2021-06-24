import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainScreenComponent } from "../UI/main-screen/main-screen.component";
import { ResultsScreenComponent } from "../UI/results-screen/results-screen.component";
import { RecipeComponent } from "../UI/Shared-Screen/recipe/recipe.component";

const routes: Routes = [
    { path: "", component: MainScreenComponent },
    {
        path: "recieps", children: [
            { path: "", component: RecipeComponent },
            { path: "favorites", component: ResultsScreenComponent },
            { path: "searchRecipe", component: ResultsScreenComponent },
            { path: "filter", component: ResultsScreenComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
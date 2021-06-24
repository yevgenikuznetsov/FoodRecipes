import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './router/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainScreenComponent } from './UI/main-screen/main-screen.component';
import { ResultsScreenComponent } from './UI/results-screen/results-screen.component';
import { RecipeListComponent } from './UI/Shared-Screen/recipe-list/recipe-list.component';
import { DetailsComponent } from './UI/Shared-Screen/recipe-list/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterScreenComponent } from './UI/main-screen/filter-screen/filter-screen.component';
import { HeaderComponent } from './UI/header/header.component';
import { RecipeComponent } from './UI/Shared-Screen/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    ResultsScreenComponent,
    RecipeListComponent,
    DetailsComponent,
    FilterScreenComponent,
    HeaderComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

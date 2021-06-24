package foodReciepe.controller;

import foodReciepe.dbData.Favorite;
import foodReciepe.dto.RecipeDetailsDto;
import foodReciepe.dto.RecipesDto;
import foodReciepe.dto.ResultsDto;
import foodReciepe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RecipeController {
    private RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService){
        this.recipeService = recipeService;
    }

    // Search recipe by free text
    @GetMapping("/getRecipesByName")
    public ResponseEntity<ResultsDto> getRecipesByName(@RequestParam("titleMatch") String titleMatch){

        return new ResponseEntity<>(this.recipeService.getRecipeByName(titleMatch), HttpStatus.OK);
    }

    // Get recipes by filter
    @GetMapping("/getRecipesByFilter")
    public ResponseEntity<ResultsDto> getFilterRecipes(@RequestParam("diet") String diet,
                                                       @RequestParam("cuisine") String cuisine,
                                                       @RequestParam("type") String type) {

        return new ResponseEntity<>(this.recipeService.getRecipesByFilter(diet, cuisine, type), HttpStatus.OK);
    }

    // Get random recipes
    @GetMapping("/getRecipes")
    public ResponseEntity<RecipesDto> getRecieps(){

        return new ResponseEntity<>(this.recipeService.gelAllRecipes(), HttpStatus.OK);
    }

    // Get recipe by ID
    @GetMapping("/getRecipe")
    public ResponseEntity<RecipeDetailsDto> getRecipeDetiles(@RequestParam("id") Long id) {

        return new ResponseEntity<>(this.recipeService.getRecipeDetails(id), HttpStatus.OK);
    }

    // Save recipe as favorite by ID
    @PostMapping("/saveFavoriteRecipe")
    public void saveFavorites(@RequestBody Long id){

        this.recipeService.saveFavoriteRecipe(id);
    }

    @PostMapping("/deleteFavoriteRecipe")
    public void deleteFavorite(@RequestBody Long id){

        this.recipeService.deleteFavoriteRecipe(id);
    }

    // Get all favorite recipes
    @GetMapping("/getAllFavoritesRecipes")
    public ResponseEntity<List<Favorite>> getAllFavoritesRecipes() {

        return new ResponseEntity<>(this.recipeService.getAllFavoritesRecipes(), HttpStatus.OK);
    }
}

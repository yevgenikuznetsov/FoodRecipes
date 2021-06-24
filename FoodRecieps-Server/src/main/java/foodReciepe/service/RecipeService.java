package foodReciepe.service;

import foodReciepe.dbData.Favorite;
import foodReciepe.dto.RecipeDetailsDto;
import foodReciepe.dto.RecipesDto;
import foodReciepe.dto.ResultsDto;

import java.util.List;

public interface RecipeService {

    void saveFavoriteRecipe(Long id);
    void deleteFavoriteRecipe(Long id);

    RecipesDto gelAllRecipes();

    RecipeDetailsDto getRecipeDetails(Long id);

    ResultsDto getRecipesByFilter(String diet, String cuisine, String type);
    ResultsDto getRecipeByName(String titleMatch);

    List<Favorite> getAllFavoritesRecipes();
}

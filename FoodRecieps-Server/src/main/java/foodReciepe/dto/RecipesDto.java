package foodReciepe.dto;

import lombok.Data;

import java.util.List;

@Data
public class RecipesDto {
    private List<RecipeDto> recipes;
}
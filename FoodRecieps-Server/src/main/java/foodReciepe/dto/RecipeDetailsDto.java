package foodReciepe.dto;

import lombok.Data;

import java.util.List;

@Data
public class RecipeDetailsDto {
    private Long id;
    private String title;
    private String image;
    private String summary;

    private List<IngredientsDto> extendedIngredients;
}

package foodReciepe.dto;

import lombok.Data;

import java.util.List;

@Data
public class ResultsDto {
    private List<RecipeDto> results;
}

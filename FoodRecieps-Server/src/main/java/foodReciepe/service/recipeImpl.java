package foodReciepe.service;

import com.google.gson.Gson;
import foodReciepe.dto.RecipeDetailsDto;
import foodReciepe.dto.RecipesDto;
import foodReciepe.dto.ResultsDto;
import foodReciepe.repositories.FavoritesDao;
import foodReciepe.dbData.Favorite;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

@Service
public class recipeImpl implements RecipeService {
    private Gson gson = new Gson();

    private FavoritesDao favoritesDao;
    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    private final static String URL ="https://api.spoonacular.com/recipes/";
    private final static String KEY = "39a24853f4e64f8d8fbf85d59654c1ec";

    private String KEY_PARAM = "&apiKey=" + KEY;

    @Autowired
    public recipeImpl(FavoritesDao favoritesDao){
        this.favoritesDao = favoritesDao;
    }

    // Get random recipes using API request
    @Override
    public RecipesDto gelAllRecipes() {
        String url = URL + "random?number=40" + KEY_PARAM;

        return gson.fromJson(getFromAPI(url), RecipesDto.class);
    }

    // Get the filtering recipes using the API request
    @Override
    public ResultsDto getRecipesByFilter(String diet, String cuisine, String type) {
        String url = "";

        try {
            url = URL + "complexSearch?diet=" + URLEncoder.encode(diet, "UTF-8") +
                    "&type=" + URLEncoder.encode(type, "UTF-8") + "&cuisine=" + URLEncoder.encode(cuisine, "UTF-8") + KEY_PARAM;

        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
        }

        return gson.fromJson(getFromAPI(url), ResultsDto.class);
    }

    // Get the recipes by free text using API request
    @Override
    public ResultsDto getRecipeByName(String titleMatch) {
        String url = "";

        try{
            url = URL + "complexSearch?titleMatch=" + URLEncoder.encode(titleMatch, "UTF-8") + KEY_PARAM;
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
        }

        return gson.fromJson(getFromAPI(url), ResultsDto.class);
    }

    // Get recipe Details using the API request
    @Override
    public RecipeDetailsDto getRecipeDetails(Long id) {
        String url = URL + id + "/information?includeNutrition=false" + KEY_PARAM;

        return gson.fromJson(getFromAPI(url), RecipeDetailsDto.class);
    }

    // Save Favorite recipe by id to DB
    @Override
    public void saveFavoriteRecipe(Long id) {
        Favorite favorite = new Favorite();
        favorite.setId(id);

        this.favoritesDao.save(favorite);
    }

    // Delete favorite recipe by id
    @Override
    public void deleteFavoriteRecipe(Long id) {
        if(this.favoritesDao.findById(id).isPresent()){
            this.favoritesDao.deleteById(id);
        }
    }

    // Get from DB all favorites recipes
    @Override
    public List<Favorite> getAllFavoritesRecipes() {
        return this.favoritesDao.findAll();
    }

    // Submit an API request to get recipes
    private String getFromAPI(String url){
        String results = "";
        HttpGet request = new HttpGet(url);

        try (CloseableHttpResponse response = httpClient.execute(request)) {
            // Get HttpResponse Status
            System.out.println(response.getStatusLine().toString());
            HttpEntity entity = response.getEntity();

            if (entity != null) {
                // return it as a String
                results = EntityUtils.toString(entity);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return results;
    }
}

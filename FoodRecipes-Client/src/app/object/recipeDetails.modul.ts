import { RecipeIngredients } from "./recipeIngredients.modul";

export class RecipeDetails {
    public id!: number;
    public title!: string;
    public image!: string;
    public summary!: string;

    public extendedIngredients!: Array<RecipeIngredients>;

    constructor(id: number, title: string, image: string, summery: string, extendedIngredients: Array<RecipeIngredients>) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.summary = summery;
        this.extendedIngredients = extendedIngredients;
    }
}
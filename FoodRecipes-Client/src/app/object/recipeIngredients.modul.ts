export class RecipeIngredients {
    public name!: string;
    public originalString!: string;

    constructor(name: string, originalString: string) {
        this.name = name;
        this.originalString = originalString;
    }
}
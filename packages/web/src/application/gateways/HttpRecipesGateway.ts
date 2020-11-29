import {RecipesGateway} from "./RecipesGateway";
import {toRecipeDetail, toRecipes} from "./RecipeDtoTypes";
import { AxiosInstance, AxiosResponse } from "axios";
import { Recipe, RecipeDetail } from "@feast/domain";

export class HttpRecipesGateway implements RecipesGateway {
  constructor(private api: AxiosInstance) {
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return this.api.post("/api/recipes", recipe);
  }

  public findAll(): Promise<Recipe[]> {
    return this.api.get("/api/recipes")
      .then((response: AxiosResponse) => response.data)
      .then(toRecipes);
  }

  public findById(id: string): Promise<RecipeDetail> {
    return this.api.get(`/api/recipes/${id}`)
      .then((response: AxiosResponse) => response.data)
      .then(toRecipeDetail);
  }
}
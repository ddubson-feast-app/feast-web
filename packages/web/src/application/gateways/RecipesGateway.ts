import {Recipe, RecipeDetail, WithoutId} from "@ddubson/feast-domain";

export interface RecipesGateway {
  saveRecipe(recipe: WithoutId<Recipe>): Promise<Recipe>;

  findAll(): Promise<Recipe[]>;

  findById(id: string): Promise<RecipeDetail>;
}

import axios from "axios";
import {HttpRecipesGateway} from "./HttpRecipesGateway";
import {buildIngredient, buildRecipe, buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {RecipeDetailDto} from "./RecipeDtoTypes";
import {Recipe, WithoutId} from "@ddubson/feast-domain";
import {Just, Nothing} from "purify-ts";
import MockAdapter from "axios-mock-adapter";

describe("findAll", () => {
  test("resolves recipes response", async () => {
    const mockAxios = new MockAdapter(axios);
    const recipesGateway = new HttpRecipesGateway(axios);

    mockAxios
      .onGet(`/api/recipes`)
      .reply(200, [expectedRecipe]);

    const foundRecipes: Recipe[] = await recipesGateway.findAll();
    expect(foundRecipes).toEqual([expectedRecipe]);
  });
});

describe("findById", () => {
  test("provided a valid recipe id, resolves a recipe", async () => {
    const mockAxios = new MockAdapter(axios);
    const recipesGateway = new HttpRecipesGateway(axios);
    const recipeId = "123";

    mockAxios
      .onGet(`/api/recipes/${recipeId}`)
      .reply(200, response);

    const foundRecipe = await recipesGateway.findById(recipeId);
    expect(foundRecipe).toEqual(expectedRecipeDetail);
  });
});

describe("saveRecipe", () => {
  test("saves recipe when provided a valid recipe", async () => {
    const mockAxios = new MockAdapter(axios);
    const recipesGateway = new HttpRecipesGateway(axios);
    const recipe: WithoutId<Recipe> = {
      name: "Garlic Lime Shrimp"
    };

    mockAxios
      .onPost(`/api/recipes`, { name: "Garlic Lime Shrimp" })
      .reply(200, { id: 1, name: "Garlic Lime Shrimp"});

    const foundRecipe = await recipesGateway.saveRecipe(recipe);
    expect(foundRecipe).toEqual({ id: 1, name: "Garlic Lime Shrimp"});
  });
});

const expectedRecipe = buildRecipe();

const expectedRecipeDetail = buildRecipeDetail({
  steps: Just([
    {stepNumber: 1, value: "Do this first"},
    {stepNumber: 2, value: "Do that"},
  ]),
  ingredients: Just([
    buildIngredient({
      form: Just("Chopped"),
      quantity: Just({value: 2}),
    }),
    buildIngredient({
      name: "Another Great Ingredient",
      form: Just("Diced"),
      quantity: Nothing,
      volume: Just({
        value: 2,
        type: "tablespoon",
      }),
    }),
  ]),
});

const response: RecipeDetailDto = {
  id: expectedRecipeDetail.id,
  name: "Great Recipe",
  ingredients: [
    {
      id: expectedRecipeDetail.ingredients.orDefault([])[0].id,
      name: "Great Ingredient",
      form: "Chopped",
      quantity: {value: 2},
    },
    {
      id: expectedRecipeDetail.ingredients.orDefault([])[1].id,
      name: "Another Great Ingredient",
      form: "Diced",
      volume: {value: 2, type: "tablespoon"},
    },
  ],
  steps: [
    {stepNumber: 1, value: "Do this first"},
    {stepNumber: 2, value: "Do that"},
  ],
};

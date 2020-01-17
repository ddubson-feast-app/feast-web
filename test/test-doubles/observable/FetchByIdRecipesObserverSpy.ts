import {FetchByIdRecipesObserver} from "../../../src/application/services/Services";
import {Recipe} from "../../../src/application/types";

export class FetchByIdRecipesObserverSpy implements FetchByIdRecipesObserver {
  public receivedRecipeWasCalled: boolean = false;
  public recipeReceived: Recipe;

  public receivedRecipe(recipe: Recipe): void {
    this.receivedRecipeWasCalled = true;
    this.recipeReceived = recipe;
  }

  public resetSpy() {
    this.receivedRecipeWasCalled = false;
    this.recipeReceived = null;
  }
}
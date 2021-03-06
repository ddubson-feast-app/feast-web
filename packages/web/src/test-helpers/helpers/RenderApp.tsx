import React, {ReactElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {DIContainer, DIContainerContext} from "../../AppConfig";
import StubRecipesGateway from "../test-doubles/gateways/StubRecipesGateway";

const testDiContainer: DIContainer = {
  recipesGateway: new StubRecipesGateway(),
};

export const buildComponent = (component: ReactElement,
                               diContainer: Partial<DIContainer> = testDiContainer) => {
  const container = {...testDiContainer, ...diContainer};

  return (
    <MemoryRouter>
      <DIContainerContext.Provider value={container}>
        {component}
      </DIContainerContext.Provider>
    </MemoryRouter>
  );
};

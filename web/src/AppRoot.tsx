import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";
import {DIContainerContext} from "./AppConfig";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";

const FixedHeader = () => (
  <Menu fixed="top">
    <Container className={"app-title"}>
      <Menu.Item data-test="app-title" as="a" header>
        Feast
      </Menu.Item>
    </Container>
  </Menu>
);

export default class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <DIContainerContext.Consumer>
          {({recipesService}) => (
            <Router>
              <FixedHeader/>
              <Container className={"app-body"}>
                <Switch>
                  <Route path={"/"} exact={true} render={() =>
                    <RecipesDashboardScene recipesService={recipesService}/>}/>
                  <Route path={"/create-recipe"} exact={true}
                         render={({history}) => <CreateRecipeScene recipesService={recipesService} history={history}/>}/>
                  <Route path={"/recipe/:id"} render={(props) => <RecipeOverviewScene {...props} />}/>
                </Switch>
              </Container>
            </Router>
          )}
        </DIContainerContext.Consumer>
      </React.Fragment>
    );
  }
}

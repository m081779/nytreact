import React from "react";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
import NoMatch from "./pages/NoMatch";
import {  Route, Switch, BrowserRouter as Router} from "react-router-dom";

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/savedArticles" component={SavedArticles} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </div>
)

export default App;

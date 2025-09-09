import React from "react";
import {Switch, Route} from 'react-router-dom';
import Header from "./Components/Header/Header"
import Home from './screens/Home/Home' 

function App() {
  return (
    <React.Fragment>    
      <p>React</p>
      <Header /> 
      <Switch>
        <Route path='/' component={Home} exact={true}/> 
      </Switch>
    </React.Fragment>

  );
}

export default App;

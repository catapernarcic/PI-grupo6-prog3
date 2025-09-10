import React from "react";
import {Switch, Route} from 'react-router-dom';
import Header from "./Components/Header/Header"
import Home from './screens/Home/Home' 
import Peliculas from './screens/Peliculas/Peliculas'
import Series from './screens/Series/Series'
import Favs from './screens/Favs/Favs'
import Resultados from "./screens/Resultados/Resultados"

function App() {
  return (
    <React.Fragment>    
      <Header /> 
      <Switch>
        <Route path='/' component={Home} exact={true}/> 
        <Route path='/peliculas' component={Peliculas} exact={true}/> 
        <Route path='/series' component={Series} exact={true}/> 
        <Route path='/favs' component={Favs} exact={true}/> 
        <Route path="/resultados:busqueda" component={Resultados} exact={true}/>
      </Switch>
    </React.Fragment>

  );
}

export default App;

import React from "react";
import {Switch, Route} from 'react-router-dom';
import Header from "./Components/Header/Header"
import Home from './screens/Home/Home' 
import Peliculas from './screens/Peliculas/Peliculas'
import Series from './screens/Series/Series'
import Detalle from './screens/Detalle/Detalle'
import Favoritos from './screens/Favoritos/Favoritos'
import Resultados from "./screens/Resultados/Resultados";
import NotFound from './screens/NF/NF'
import Footer from './Components/Footer/Footer'
function App() {
  return (
    <div className="container">
      <h1>UdeSA Movies</h1>
      <Header /> 
      <Switch>
        <Route path='/' component={Home} exact={true}/> 
        <Route path='/peliculas' component={Peliculas} exact={true}/> 
        <Route path='/series' component={Series} exact={true}/> 
        <Route path='/detalle/:tipo/:id' component={Detalle} exact={true}/>
        <Route path='/favoritos' component={Favoritos} exact={true}/> 
        <Route path="/resultados/:tipo/:busqueda" component={Resultados} exact={true}/>
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

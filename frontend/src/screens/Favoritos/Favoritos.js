import React, { Component } from "react";
import './Favoritos.css';
import Loader from "../../Components/Loader/Loader";
import TarjetaP from "../../Components/TarjetaP/TarjetaP";

//CHEQUEAR LO DE API KEY 

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],     
      cargando: true,
      API_KEY: "21945569abcb8b8f35ad5e0c66a9d763"
    };
  }


componentDidMount() {
     let recuperoFav = localStorage.getItem("fav");      
    let favParceado = JSON.parse(recuperoFav);           
    let favMovies = [];  

     if (favParceado) {
      favParceado.map((elm) =>
        fetch(`https://api.themoviedb.org/3/movie/${elm}?api_key=${this.state.API_KEY}`) 
          .then((resp) => resp.json())
          .then((data) => {
            favMovies.push(data);                        
            this.setState(
              {
                items: favMovies,                         
                cargando: false
              },
              () => console.log(this.state.items)
            );
          })
      );
    }else {
      this.setState({ cargando: false });
    }
}


 render() {
    if (this.state.cargando) {
      return <Loader />;
    }

    return (
      <React.Fragment>
         {this.state.items.length > 0 ? (
        this.state.items.map((elm) => (
          <TarjetaP data={elm} />
        ))
      ) : (
        <p>No hay favoritos</p>
      )}
      </React.Fragment>
    );
  }
}

export default Favoritos;
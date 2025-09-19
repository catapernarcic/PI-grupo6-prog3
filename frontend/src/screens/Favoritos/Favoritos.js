import React, { Component } from "react";
import './Favoritos.css';
import Loader from "../../Components/Loader/Loader";
import TarjetaP from "../../Components/TarjetaP/TarjetaP";
import TarjetaS from "../../Components/TarjetaS/TarjetaS"


class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      series: [],  
      cargando: true,
      API_KEY: "21945569abcb8b8f35ad5e0c66a9d763"
    };
  }


componentDidMount() {
    let recuperoFav = localStorage.getItem("fav"); 
    let recuperofavS = localStorage.getItem("favTv");      

   
    
    let idsMovies = recuperoFav ? JSON.parse(recuperoFav) : [];
    let idsSeries = recuperofavS ? JSON.parse(recuperofavS) : [];

      if (idsMovies.length === 0 && idsSeries.length === 0) {
      this.setState({ movies: [], series: [], cargando: false }); 
      return;
    }

    let favMovies = [];  
    let favSeries = [];
    let pendientes = idsMovies.length + idsSeries.length;

      idsMovies.map((id) =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.state.API_KEY}`)
        .then((resp) => resp.json())
        .then((data) => {
          favMovies.push(data);
          this.setState({ movies: favMovies });       
          pendientes = pendientes - 1;                  
          if (pendientes === 0) this.setState({ cargando: false }); 
        })
        .catch(() => {
          pendientes = pendientes - 1;                  
          if (pendientes === 0) this.setState({ cargando: false });
        })
    );

    idsSeries.map((id) =>
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.state.API_KEY}`)
        .then((resp) => resp.json())
        .then((data) => {
          favSeries.push(data);
          this.setState({ series: favSeries });         
          pendientes = pendientes - 1;                  
          if (pendientes === 0) this.setState({ cargando: false }); 
        })
        .catch(() => {
          pendientes = pendientes - 1;                  
          if (pendientes === 0) this.setState({ cargando: false }); 
        })
    );
}


 render() {
    if (this.state.cargando) {
      return <Loader />;
    }

    return (
      <div className="favs-page">
        <section className="favoritos-section">
          <h2 className="favoritos-title">Películas favoritas</h2>
          {this.state.movies.length > 0 ? (
            <div className="favoritos-grid">
              {this.state.movies.map((elm) => (
                <TarjetaP
                  key={elm.id}
                  id={elm.id}
                  nombre={elm.title}
                  img={elm.poster_path}
                  overview={elm.overview}
                />
              ))}
            </div>
          ) : (
            <p className="sin-favoritos">No tienes películas favoritas aún.</p>
          )}
        </section>

        <section className="favoritos-section">
          <h2 className="favoritos-title">Series favoritas</h2>
          {this.state.series.length > 0 ? (
            <div className="favoritos-grid">
              {this.state.series.map((elm) => (
                <TarjetaS
                  key={elm.id}
                  id={elm.id}
                  nombre={elm.name}
                  img={elm.poster_path}
                  overview={elm.overview}
                />
              ))}
            </div>
          ) : (
            <p className="sin-favoritos">No tienes series favoritas aún.</p>
          )}
        </section>
      </div>
    );
  }
}

export default Favoritos;
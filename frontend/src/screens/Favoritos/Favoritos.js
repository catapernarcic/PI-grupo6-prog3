import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Favoritos.css';
import Loader from "../../Components/Loader/Loader";

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: [],
            cargando: true
        }
    }

    componentDidMount() {
        this.cargarFavoritos();
    }

    cargarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        this.setState({ favoritos: favoritos, cargando: false });
    }

    eliminarFavorito = (id, tipo) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const nuevosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === tipo));
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        this.setState({ favoritos: nuevosFavoritos });
    }

    render() {

        if (this.state.cargando) {       
        return <Loader />;             
        }
        const { favoritos } = this.state;
        const peliculasFavoritas = favoritos.filter(fav => fav.tipo === 'movie');
        const seriesFavoritas = favoritos.filter(fav => fav.tipo === 'tv');

        return (
            <div className="favs-container">
                {/* Sección Películas Favoritas */}
                <section className="favoritos-section">
                    <h2 className="alert alert-primary">Películas Favoritas</h2>
                    {peliculasFavoritas.length > 0 ? (
                        <div className="favoritos-grid">
                            {peliculasFavoritas.map((pelicula, idx) => (
                                <div key={`${pelicula.id}-${idx}`} className="favorito-item">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${pelicula.img}`} 
                                        alt={pelicula.nombre}
                                        className="favorito-img"
                                    />
                                    <div className="favorito-info">
                                        <h3 className="favorito-titulo">{pelicula.nombre}</h3>
                                        <p className="favorito-descripcion">{pelicula.overview}</p>
                                        <div className="favorito-botones">
                                            <Link 
                                                to={`/detalle/movie/${pelicula.id}`} 
                                                className="btn btn-primary btn-sm"
                                            >
                                                Ver Detalle
                                            </Link>
                                            <button 
                                                onClick={() => this.eliminarFavorito(pelicula.id, 'movie')}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="sin-favoritos">No tienes películas favoritas aún.</p>
                    )}
                </section>

                {/* Sección Series Favoritas */}
                <section className="favoritos-section">
                    <h2 className="alert alert-warning">Series Favoritas</h2>
                    {seriesFavoritas.length > 0 ? (
                        <div className="favoritos-grid">
                            {seriesFavoritas.map((serie, idx) => (
                                <div key={`${serie.id}-${idx}`} className="favorito-item">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${serie.img}`} 
                                        alt={serie.nombre}
                                        className="favorito-img"
                                    />
                                    <div className="favorito-info">
                                        <h3 className="favorito-titulo">{serie.nombre}</h3>
                                        <p className="favorito-descripcion">{serie.overview}</p>
                                        <div className="favorito-botones">
                                            <Link 
                                                to={`/detalle/tv/${serie.id}`} 
                                                className="btn btn-primary btn-sm"
                                            >
                                                Ver Detalle
                                            </Link>
                                            <button 
                                                onClick={() => this.eliminarFavorito(serie.id, 'tv')}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
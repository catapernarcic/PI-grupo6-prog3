import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Favoritos.css';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        }
    }

    componentDidMount() {
        this.cargarFavoritos();
        
        // Escuchar cambios en localStorage
        window.addEventListener('storage', this.manejarCambioStorage);
        
        // También escuchar cambios del mismo tab
        this.intervalo = setInterval(() => {
            this.cargarFavoritos();
        }, 1000);
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.manejarCambioStorage);
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
    }

    manejarCambioStorage = (e) => {
        if (e.key === 'favoritos') {
            this.cargarFavoritos();
        }
    }

    cargarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        console.log('Favoritos cargados:', favoritos);
        console.log('Series favoritas:', favoritos.filter(fav => fav.tipo === 'tv'));
        this.setState({ favoritos });
    }

    eliminarFavorito = (id, tipo) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        console.log('Eliminando favorito:', id, tipo);
        console.log('Favoritos antes:', favoritos);
        
        const nuevosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === tipo));
        console.log('Favoritos después:', nuevosFavoritos);
        
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        this.setState({ favoritos: nuevosFavoritos });
    }

    render() {
        const { favoritos } = this.state;
        const peliculasFavoritas = favoritos.filter(fav => fav.tipo === 'movie');
        const seriesFavoritas = favoritos.filter(fav => fav.tipo === 'tv');

        return (
            <div className="favoritos-container">
                {/* Sección Películas Favoritas */}
                <section className="favoritos-section">
                    <h2 className="alert alert-primary">Películas Favoritas</h2>
                    {peliculasFavoritas.length > 0 ? (
                        <div className="favoritos-grid">
                            {peliculasFavoritas.map((pelicula, idx) => (
                                <div key={`${pelicula.id}-${idx}`} className="favorito-item">
                                    {pelicula.img ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w500${pelicula.img}`} 
                                            alt={pelicula.nombre}
                                            className="favorito-img"
                                        />
                                    ) : (
                                        <div className="favorito-img favorito-sin-imagen">
                                            Sin imagen
                                        </div>
                                    )}
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
                                                Sacar de favoritos
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
                                    {serie.img ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w500${serie.img}`} 
                                            alt={serie.nombre}
                                            className="favorito-img"
                                        />
                                    ) : (
                                        <div className="favorito-img favorito-sin-imagen">
                                            Sin imagen
                                        </div>
                                    )}
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
                                                Sacar de favoritos
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
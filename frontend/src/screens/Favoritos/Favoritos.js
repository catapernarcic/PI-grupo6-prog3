import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import './Favoritos.css';

let apiKey = "0b687acd5250ddef9e6794dc722be275";

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: [],
            peliculasFavoritas: [],
            seriesFavoritas: [],
            loading: true
    }}

    componentDidMount() {
        this.cargarFavoritos();
    }

    cargarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let contador = 0;
        if (favoritos.length === 0) {
            this.setState({ loading: false });
        }
        console.log('Favoritos cargados:', favoritos);
        console.log('Series favoritas:', favoritos.filter(fav => fav.tipo === 'tv'));
        this.setState({ favoritos });
        const peliculasFavoritas = [];
        const seriesFavoritas = [];
        favoritos.map(pelicula => {
            fetch(`https://api.themoviedb.org/3/${pelicula.tipo}/${pelicula.id}?api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
            console.log('Datos de la película/serie:', data);
            if (pelicula.tipo === 'movie') {
                peliculasFavoritas.push(data);
            } else {
                seriesFavoritas.push(data);
            }
            contador++;
            if (contador === favoritos.length) {
                this.setState({ peliculasFavoritas: peliculasFavoritas, seriesFavoritas: seriesFavoritas, loading: false }, () => console.log(this.state));
            }
        })
            .catch((error) => {
                console.log('Error cargando favoritos:', error);
        })
    })
    }

    eliminarFavorito = (id, tipo) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        console.log('Eliminando favorito:', id, tipo);
        console.log('Favoritos antes:', favoritos);
        
        const nuevosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === tipo));
        console.log('Favoritos después:', nuevosFavoritos);
        
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        if (tipo === 'movie') {
            this.setState({ peliculasFavoritas: nuevosFavoritos.filter(pelicula => pelicula.tipo === 'movie') });
        } else {
            this.setState({ seriesFavoritas: nuevosFavoritos.filter(serie => serie.tipo === 'tv') });
        }
        this.cargarFavoritos();
    }

    render() {

        return (
            <div className="favoritos-container">
                {this.state.loading ? (
                    <Loader/>
                ) : (
                    <React.Fragment>
                        <section className="favoritos-section">
                            <h2 className="alert alert-primary">Películas Favoritas</h2>
                            {this.state.peliculasFavoritas.length > 0 ? (
                                <div className="favoritos-grid">
                                    {this.state.peliculasFavoritas.map((pelicula, idx) => (
                                        <div key={`${pelicula.id}-${idx}`} className="favorito-item">
                                            {pelicula.poster_path ? (
                                                <img 
                                                    src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
                                                    alt={pelicula.title}
                                                    className="favorito-img"
                                                />
                                            ) : (
                                                <div className="favorito-img favorito-sin-imagen">
                                                    Sin imagen
                                                </div>
                                            )}
                                            <div className="favorito-info">
                                                <h3 className="favorito-titulo">{pelicula.title}</h3>
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

                        <section className="favoritos-section">
                            <h2 className="alert alert-warning">Series Favoritas</h2>
                            {this.state.seriesFavoritas.length > 0 ? (
                                <div className="favoritos-grid">
                                    {this.state.seriesFavoritas.map((serie, idx) => (
                                        <div key={`${serie.id}-${idx}`} className="favorito-item">
                                            {serie.poster_path ? (
                                                <img 
                                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                                                    alt={serie.name}
                                                    className="favorito-img"
                                                />
                                            ) : (
                                                <div className="favorito-img favorito-sin-imagen">
                                                    Sin imagen
                                                </div>
                                            )}
                                            <div className="favorito-info">
                                                <h3 className="favorito-titulo">{serie.name}</h3>
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
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Favoritos;
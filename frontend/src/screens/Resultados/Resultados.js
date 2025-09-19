import React, { Component } from 'react'
import Pelicula from '../../Components/Pelicula/Pelicula'
import Serie from '../../Components/Serie/Serie'
import Loader from '../../Components/Loader/Loader';

let apiKey = "0b687acd5250ddef9e6794dc722be275";

export default class Resultados extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas: [],
            series: [],
            cargando: true,
            busqueda: '',
            tipo: ''
        }
    }
    
    componentDidMount(){
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;
        this.setState({ busqueda, tipo });
        this.buscarContenido(busqueda, tipo);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.busqueda !== this.props.match.params.busqueda || 
            prevProps.match.params.tipo !== this.props.match.params.tipo) {
            const busqueda = this.props.match.params.busqueda;
            const tipo = this.props.match.params.tipo;
            this.setState({ busqueda, tipo, cargando: true });
            this.buscarContenido(busqueda, tipo);
        }
    }

    buscarContenido = (termino, tipo) => {
        if (tipo === 'todo') {
            // Buscar tanto películas como series
            Promise.all([
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${termino}`),
                fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${termino}`)
            ])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(([moviesData, seriesData]) => {
                this.setState({
                    peliculas: moviesData.results || [],
                    series: seriesData.results || [],
                    cargando: false
                });
            })
            .catch(error => {
                console.log('Error buscando contenido:', error);
                this.setState({ cargando: false });
            });
        } else if (tipo === 'peliculas') {
            // Solo buscar películas
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${termino}`)
            .then(respuesta => respuesta.json())
            .then(data => {
                this.setState({
                    peliculas: data.results || [],
                    series: [],
                    cargando: false
                });
            })
            .catch(error => {
                console.log('Error buscando películas:', error);
                this.setState({ cargando: false });
            });
        } else if (tipo === 'series') {
            // Solo buscar series
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${termino}`)
            .then(respuesta => respuesta.json())
            .then(data => {
                this.setState({
                    peliculas: [],
                    series: data.results || [],
                    cargando: false
                });
            })
            .catch(error => {
                console.log('Error buscando series:', error);
                this.setState({ cargando: false });
            });
        }
    }

    render() {
        const totalResultados = this.state.peliculas.length + this.state.series.length;
        
        return (
            <div className="container">
                <h1>Resultados de búsqueda: "{this.state.busqueda}"</h1>
                {this.state.cargando ? (
                      <Loader />
                ) : (
                    <div>
                        {totalResultados > 0 ? (
                            <div>
                                {this.state.peliculas.length > 0 && (
                                    <div>
                                        <h2 className="alert alert-primary">Películas encontradas</h2>
                                        <Pelicula peliculas={this.state.peliculas} />
                                    </div>
                                )}
                                {this.state.series.length > 0 && (
                                    <div>
                                        <h2 className="alert alert-warning">Series encontradas</h2>
                                        <Serie series={this.state.series} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No se encontraron resultados para "{this.state.busqueda}"</p>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

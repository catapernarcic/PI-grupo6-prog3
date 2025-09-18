import React, { Component } from 'react'
import Pelicula from '../../Components/Pelicula/Pelicula'
import Loader from '../../Components/Loader/Loader';

let apiKey = "0b687acd5250ddef9e6794dc722be275";

export default class Resultados extends Component {
    constructor(props){
        super(props)
        this.state = {
            resultados: [],
            cargando: true,
            busqueda: ''
        }
    }
    
    componentDidMount(){
        const busqueda = this.props.match.params.busqueda;
        this.setState({ busqueda });
        this.buscarContenido(busqueda);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
            const busqueda = this.props.match.params.busqueda;
            this.setState({ busqueda, cargando: true });
            this.buscarContenido(busqueda);
        }
    }

    buscarContenido = (termino) => {
        // Buscar películas
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${termino}`)
        .then(respuesta => respuesta.json())
        .then(data => {
            this.setState({
                resultados: data.results || [],
                cargando: false
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ cargando: false });
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Resultados de búsqueda: "{this.state.busqueda}"</h1>
                {this.state.cargando ? (
                      <Loader />
                ) : (
                    <div>
                        {this.state.resultados.length > 0 ? (
                            <Pelicula peliculas={this.state.resultados} />
                        ) : (
                            <p>No se encontraron resultados para "{this.state.busqueda}"</p>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

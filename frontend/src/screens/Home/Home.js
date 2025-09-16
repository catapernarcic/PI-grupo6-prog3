import React, { Component } from 'react';
import Pelicula from '../../Components/Pelicula/Pelicula';

let apiKey = "0b687acd5250ddef9e6794dc722be275";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculasPopulares: [],
            peliculasCartelera: [],
            cargandoPopulares: true,
            cargandoCartelera: true
        }
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(respuesta => respuesta.json())
        .then(data => this.setState({
            peliculasPopulares: data.results,
            cargandoPopulares: false
        }))
        .catch(error => console.log(error))

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
        .then(respuesta => respuesta.json())
        .then(data => this.setState({
            peliculasCartelera: data.results,
            cargandoCartelera: false
        }))
        .catch(error => console.log(error))
    }
    render(){
        return(
            <div className="container">
                <h2 class="alert alert-primary">Popular movies this week</h2>
                <Pelicula peliculas={this.state.peliculasPopulares} />
            </div>
        )
    }
}

export default Home;
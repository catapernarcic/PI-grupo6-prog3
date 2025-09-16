import React, {Component} from "react";


let apiKey = "0b687acd5250ddef9e6794dc722be275";

class Detalle extends Component{

    constructor(props){
      super(props)
      this.state ={
        pelicula: {},
        cargando: true
      }
    
    }
    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/${this.props.match.params.tipo}/${this.props.match.params.id}?api_key=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        this.setState({
          pelicula: data,
          cargando: false
      })
    })
      .catch((error) => console.log(error))
  }

      render(){
        return(
            <React.Fragment>
                <h2 class="alert alert-primary">{this.props.match.params.tipo==="movie" ? this.state.pelicula.title : this.state.pelicula.name}</h2>
                    <section class="row">
                        <img class="col-md-6" src={`https://image.tmdb.org/t/p/w500/${this.state.pelicula.poster_path}`} alt=""/>
                        <section class="col-md-6 info">
                            <h3>Descripción</h3>
                            <p class="description">{this.state.pelicula.overview}</p>
                            <p class="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong>{this.state.pelicula.release_date}</p>
                            <p class="mt-0 mb-0 length"><strong>Duración:</strong>{this.props.match.params.tipo==="movie" ? this.state.pelicula.runtime : null}</p>
                            <p class="mt-0" id="votes"><strong>Puntuación:</strong>{this.state.pelicula.vote_average}</p>
                            <p>Generos: {this.state.pelicula.genres.map(genero => (genero.name))}</p>
                        </section>
                    </section>
            </React.Fragment>

        )
      }


    }

export default Detalle;
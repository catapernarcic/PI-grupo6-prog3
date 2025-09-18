import React, {Component} from "react";
import './Detalle.css';


let apiKey = "0b687acd5250ddef9e6794dc722be275";

class Detalle extends Component{

    constructor(props){
      super(props)
      this.state ={
        pelicula: {},
        cargando: true,
        esFavorito: false
      }
    
    }
    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/${this.props.match.params.tipo}/${this.props.match.params.id}?api_key=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        this.setState({
          pelicula: data,
          cargando: false,
          esFavorito: this.verificarFavorito(data.id)
      })
    })
      .catch((error) => console.log(error))
  }

  verificarFavorito = (id) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const tipo = this.props.match.params.tipo;
    return favoritos.some(fav => fav.id === id && fav.tipo === tipo);
  }

  toggleFavorito = () => {
    const { pelicula } = this.state;
    const tipo = this.props.match.params.tipo;
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    const favorito = {
      id: pelicula.id,
      nombre: tipo === 'movie' ? pelicula.title : pelicula.name,
      img: pelicula.poster_path,
      overview: pelicula.overview,
      tipo: tipo
    };

    const existeFavorito = favoritos.some(fav => fav.id === pelicula.id && fav.tipo === tipo);
    
    if (existeFavorito) {
      // Remover de favoritos
      const nuevosFavoritos = favoritos.filter(fav => !(fav.id === pelicula.id && fav.tipo === tipo));
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    } else {
      // Agregar a favoritos
      favoritos.push(favorito);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    this.setState({
      esFavorito: !this.state.esFavorito
    });
  }

      render(){
        if(this.state.cargando){
          return <p>Cargando...</p>
        }
        
        return(
            <div className="detalle-container">
                <h2 className="alert alert-primary">{this.props.match.params.tipo==="movie" ? this.state.pelicula.title : this.state.pelicula.name}</h2>
                <section className="row">
                    <div className="col-md-6">
                        <img 
                            className="detalle-imagen" 
                            src={`https://image.tmdb.org/t/p/w500/${this.state.pelicula.poster_path}`} 
                            alt={this.props.match.params.tipo==="movie" ? this.state.pelicula.title : this.state.pelicula.name}
                        />
                    </div>
                    <section className="col-md-6 detalle-info">
                        <h3>Descripción</h3>
                        <p className="description">{this.state.pelicula.overview}</p>
                        <p><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                        <p><strong>Duración:</strong> {this.props.match.params.tipo==="movie" ? this.state.pelicula.runtime + " minutos" : "Serie"}</p>
                        <p><strong>Puntuación:</strong> {this.state.pelicula.vote_average}/10</p>
                        <p><strong>Géneros:</strong> {this.state.pelicula.genres && this.state.pelicula.genres.map(genero => genero.name).join(', ')}</p>
                        
                        <button 
                            onClick={this.toggleFavorito}
                            className={`detalle-boton ${this.state.esFavorito ? 'btn-danger' : 'btn-success'}`}
                        >
                            {this.state.esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                        </button>
                    </section>
                </section>
            </div>
        )
      }


    }

export default Detalle;
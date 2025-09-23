import React, {Component} from "react";
import './Detalle.css';
import Loader from "../../Components/Loader/Loader";


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
        console.log('Datos de la película/serie:', data)
        console.log('Poster path:', data.poster_path)

        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const tipo = this.props.match.params.tipo;
        
        const yaEsFav = favoritos.filter(fav => fav.id === data.id && fav.tipo === tipo).length > 0;  

        this.setState({
          pelicula: data,
          cargando: false,
          esFavorito: yaEsFav 
      })
    })
      .catch((error) => {
        console.log(error)
        this.setState({ cargando: false }) 
      })
     
  }

  agregarFav(id){                                                               
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const tipo = this.props.match.params.tipo;
    
    const favorito = {
      id: id,
      tipo: tipo
    };
    console.log('Favorito:', favorito);

    const existeFavorito = favoritos.filter(fav => fav.id === id && fav.tipo === tipo).length > 0;
    
    if (!existeFavorito) {
      favoritos.push(favorito);
      console.log('Favoritos:', favoritos);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    this.setState({ esFavorito: true });                                             
  }

  sacaFav(id){                                                                  
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const tipo = this.props.match.params.tipo;
    
    const nuevosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === tipo));
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    this.setState({ esFavorito: false });                                            
  }

      render(){
        if(this.state.cargando){
          return <Loader/>
        }
        
        return(
            <div className="detalle-container">
                <h2 className="alert alert-primary">{this.props.match.params.tipo==="movie" ? this.state.pelicula.title : this.state.pelicula.name}</h2>
                <section className="row">
                    <div className="col-md-6">
                        {this.state.pelicula.poster_path ? (
                            <img 
                                className="detalle-imagen" 
                                src={`https://image.tmdb.org/t/p/w500${this.state.pelicula.poster_path}`} 
                                alt={this.props.match.params.tipo==="movie" ? this.state.pelicula.title : this.state.pelicula.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x600/cccccc/666666?text=Sin+Imagen';
                                }}
                            />
                        ) : (
                            <div className="detalle-imagen detalle-sin-imagen">
                                Sin imagen disponible
                            </div>
                        )}
                    </div>
                    <section className="col-md-6 detalle-info">
                        <h3>Descripción</h3>
                        <p className="description">{this.state.pelicula.overview}</p>
                        <p><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                        {this.props.match.params.tipo === "movie" && (
                            <p><strong>Duración:</strong> {this.state.pelicula.runtime} minutos</p>
                        )}
                        <p><strong>Puntuación:</strong> {this.state.pelicula.vote_average}/10</p>
                        <p><strong>Géneros:</strong> {this.state.pelicula.genres && this.state.pelicula.genres.map(genero => genero.name).join(', ')}</p>
                        
                        {this.state.esFavorito ? (                                                     
              <button 
                onClick={() => this.sacaFav(this.state.pelicula.id)}                 
                className="detalle-boton btn-danger"
              >
                Sacar de favoritos
              </button>
            ) : (
              <button 
                onClick={() => this.agregarFav(this.state.pelicula.id)}              
                className="detalle-boton btn-success"
              >
                Agregar a favoritos
              </button>
            )}
                    </section>
                </section>
            </div>
        )
      }


    }

export default Detalle;
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
        esFav: false    
      }
    
    }
    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/${this.props.match.params.tipo}/${this.props.match.params.id}?api_key=${apiKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Datos de la película/serie:', data)
        console.log('Poster path:', data.poster_path)

        const key = this.props.match.params.tipo === 'movie' ? 'fav' : 'favTv';  
        const raw = localStorage.getItem(key);                                   
        const favParceado = raw ? JSON.parse(raw) : [];                          
        const yaEsFav = favParceado.includes(data.id);  

        this.setState({
          pelicula: data,
          cargando: false,
          esFav: yaEsFav 
      })
    })
      .catch((error) => {
        console.log(error)
        this.setState({ cargando: false }) 
      })
     
  }

  agregarFav(id){                                                               
    const key = this.props.match.params.tipo === 'movie' ? 'fav' : 'favTv';     
    let recuperoFav = localStorage.getItem(key);                                

    if (recuperoFav == null) {                                                  
      const fav = [id];                                                        
      localStorage.setItem(key, JSON.stringify(fav));                           
    } else {                                                                  
      const favParceado = JSON.parse(recuperoFav);                              
      favParceado.push(id);                                                     
      localStorage.setItem(key, JSON.stringify(favParceado));                   
    }

    this.setState({ esFav: true });                                             
  }

  sacaFav(id){                                                                  
    const key = this.props.match.params.tipo === 'movie' ? 'fav' : 'favTv';     
    const recuperoFav = localStorage.getItem(key);                              
    const favParceado = JSON.parse(recuperoFav) || [];                          

    const filtrado = favParceado.filter(elm => elm !== id);                     
    localStorage.setItem(key, JSON.stringify(filtrado));                        

    this.setState({ esFav: false });                                            
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
                            <div className="detalle-imagen" style={{
                                width: '100%',
                                maxWidth: '400px',
                                height: '600px',
                                backgroundColor: '#f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                color: '#666',
                                fontSize: '1.2rem'
                            }}>
                                Sin imagen disponible
                            </div>
                        )}
                    </div>
                    <section className="col-md-6 detalle-info">
                        <h3>Descripción</h3>
                        <p className="description">{this.state.pelicula.overview}</p>
                        <p><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                        <p><strong>Duración:</strong> {this.props.match.params.tipo==="movie" ? this.state.pelicula.runtime + " minutos" : "Serie"}</p>
                        <p><strong>Puntuación:</strong> {this.state.pelicula.vote_average}/10</p>
                        <p><strong>Géneros:</strong> {this.state.pelicula.genres && this.state.pelicula.genres.map(genero => genero.name).join(', ')}</p>
                        
                        {this.state.esFav ? (                                                     
              <button 
                onClick={() => this.sacaFav(this.state.pelicula.id)}                 
                className="detalle-boton btn-danger"
              >
                Sacar de favs
              </button>
            ) : (
              <button 
                onClick={() => this.agregarFav(this.state.pelicula.id)}              
                className="detalle-boton btn-success"
              >
                Agregar a favs
              </button>
            )}
                    </section>
                </section>
            </div>
        )
      }


    }

export default Detalle;
import React, { Component } from 'react'
import './TarjetaP.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class TarjetaP extends Component {
  constructor(props){
    super(props)
    this.state = {
      mostrarDescripcion: false,
      textoDescripcion: 'Ver descripcion',
      esFav: false,
      favBoton: 'Agregar a favoritos',
      UnCharacter: props.data ? props.data : {
        id: props.id,
        image: props.img
          ? 'https://image.tmdb.org/t/p/w500' + props.img
          : 'https://via.placeholder.com/300x450/cccccc/666666?text=Sin+Imagen',
        name: props.nombre,
        overview: props.overview
    },
    }
  }

   mostrarOcultar() {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === 'Ver Mas' ? 'Ver Menos' : 'Ver Mas'
    });
  }

  agregarFav(id) {
    
    let recuperoFav = localStorage.getItem('fav'); 

    if (recuperoFav == null) {
      var fav = [id];                            
      var favString = JSON.stringify(fav);        
      localStorage.setItem('fav', favString);     
    } else {
      var favParceado = JSON.parse(recuperoFav);  
      favParceado.push(id);                       
      var favString2 = JSON.stringify(favParceado);
      localStorage.setItem('fav', favString2);    
    }

    this.setState({ esFav: true, favBoton: 'Sacar de favs' });
  }

  sacaFav(id) {
    var recuperoFav = localStorage.getItem('fav');        
    var favParceado = JSON.parse(recuperoFav) || [];      

    var filter = favParceado.filter(function (elm) {      
      return elm !== id;
    });
    var favString = JSON.stringify(filter);               
    localStorage.setItem('fav', favString);               

    this.setState({ esFav: false, favBoton: 'Agregar a favoritos' });
  }

 componentDidMount(){
    
    let recuperoFav = localStorage.getItem('fav');

    let favParceado = [];
      if (recuperoFav){
      favParceado = JSON.parse(recuperoFav);
    }

    if (favParceado){
      if (favParceado.includes(this.state.UnCharacter.id)){
        this.setState({ esFav: true })
      }
    }
  }


  manejarDescripcion(){
    this.setState({
      mostrarDescripcion: !this.state.mostrarDescripcion,
      textoDescripcion: this.state.mostrarDescripcion ? 'Ver descripcion' : 'Ocultar descripcion'
    })
  }
  render() {
    return (
        <React.Fragment>
          <article className="tarjetaP">
            <h2>{this.props.nombre}</h2>
            <img src={this.state.UnCharacter.image} alt=""/>  

            {this.state.mostrarDescripcion ? <p>{this.props.overview}</p> : null}

            <div className="botones-tarjeta">

              <button onClick={() => this.manejarDescripcion()}>{this.state.textoDescripcion}</button>
              <Link to={`/detalle/movie/${this.props.id}`}><button>Ver detalle</button></Link>
              
              {this.state.esFav ? (
            <button className="btn btn-danger btn-sm" onClick={() => this.sacaFav(this.props.id)}>
              Sacar de favs
            </button>
          ) : (
            <button className="btn btn-success btn-sm" onClick={() => this.agregarFav(this.props.id)}>
              Agregar a favs
            </button>
          )}
            </div>
          </article>

        </React.Fragment>
    

    )
  }
}

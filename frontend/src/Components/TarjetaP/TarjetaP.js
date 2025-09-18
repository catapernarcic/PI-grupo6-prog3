import React, { Component } from 'react'
import './TarjetaP.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class TarjetaP extends Component {
  constructor(props){
    super(props)
    this.state = {
      mostrarDescripcion: false,
      textoDescripcion: 'Ver descripcion',
      esFavorito: this.verificarFavorito()
    }
  }

  verificarFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    return favoritos.some(fav => fav.id === this.props.id && fav.tipo === 'movie');
  }

  toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favorito = {
      id: this.props.id,
      nombre: this.props.nombre,
      img: this.props.img,
      overview: this.props.overview,
      tipo: 'movie'
    };

    const existeFavorito = favoritos.some(fav => fav.id === this.props.id && fav.tipo === 'movie');
    
    if (existeFavorito) {
      // Remover de favoritos
      const nuevosFavoritos = favoritos.filter(fav => !(fav.id === this.props.id && fav.tipo === 'movie'));
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
            <img src={`https://image.tmdb.org/t/p/w500${this.props.img}`} alt=""/>  
            {this.state.mostrarDescripcion ? <p>{this.props.overview}</p> : null}
            <div className="botones-tarjeta">
              <button onClick={() => this.manejarDescripcion()}>{this.state.textoDescripcion}</button>
              <Link to={`/detalle/movie/${this.props.id}`}><button>Ver detalle</button></Link>
              <button 
                onClick={this.toggleFavorito}
                className={`favorito-btn ${this.state.esFavorito ? 'favorito-activo' : ''}`}
              >
                {this.state.esFavorito ? 'Favorito' : 'Agregar'}
              </button>
            </div>
          </article>

        </React.Fragment>
    

    )
  }
}

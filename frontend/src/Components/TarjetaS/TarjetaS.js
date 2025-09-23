import React, { Component } from 'react'
import './TarjetaS.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class TarjetaS extends Component {
  constructor(props){
    super(props)
    this.state = {
      mostrarDescripcion: false,
      textoDescripcion: 'Ver descripcion',
        esFav: false,
        favBoton: 'Agregar a favoritos'
    }
  }

  mostrarOcultar() {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === 'Ver Mas' ? 'Ver Menos' : 'Ver Mas'
    });
  }

  agregarFav(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    console.log('Guardando serie favorita - img:', this.props.img);
    const favorito = {
      id: id,
      tipo: 'tv'
    };

    const existeFavorito = favoritos.filter(fav => fav.id === id && fav.tipo === 'tv').length > 0;
    
    if (!existeFavorito) {
      favoritos.push(favorito);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    this.setState({ esFav: true, favBoton: 'Sacar de favoritos' });
  }       

  sacaFav(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const nuevosFavoritos = favoritos.filter(fav => !(fav.id === id && fav.tipo === 'tv'));
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    this.setState({ esFav: false, favBoton: 'Agregar a favoritos' });
    
    if (this.props.onFavoritoEliminado) {
      this.props.onFavoritoEliminado(id, 'tv');
    }
  } 

 componentDidMount(){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    const esFavorito = favoritos.filter(fav => fav.id === this.props.id && fav.tipo === 'tv').length > 0;
    
    if (esFavorito) {
      this.setState({ esFav: true, favBoton: 'Sacar de favoritos' });
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
            <img src={this.props.img ? 'https://image.tmdb.org/t/p/w500' + this.props.img : 'https://via.placeholder.com/300x450/cccccc/666666?text=Sin+Imagen'} alt=""/>

          {this.state.mostrarDescripcion ? <p>{this.props.overview}</p> : null}

          <div className="botones-tarjeta">
            <button onClick={() => this.manejarDescripcion()}>{this.state.textoDescripcion}</button>
            <Link to={`/detalle/tv/${this.props.id}`}><button>Ver detalle</button></Link> 
            
            {this.state.esFav ? (
              <button className="more btn-danger" onClick={() => this.sacaFav(this.props.id)}>
                Sacar de favoritos
              </button>
            ) : (
              <button className="more btn-success" onClick={() => this.agregarFav(this.props.id)}>
                Agregar a favoritos
              </button>
          )}
          </div>
        </article>
      </React.Fragment>
    )
  }
}
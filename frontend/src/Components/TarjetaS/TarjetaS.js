import React, { Component } from 'react'
import './TarjetaS.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class TarjetaS extends Component {
  constructor(props){
    super(props)
    this.state = {
      mostrarDescripcion: false,
      textoDescripcion: 'Ver descripcion'
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
            <img src={`https://image.tmdb.org/t/p/w500${this.props.img}`} alt=""/>  
            {this.state.mostrarDescripcion ? <p>{this.props.overview}</p> : null}
            <button onClick={() => this.manejarDescripcion()}>{this.state.textoDescripcion}</button>
            <Link to={`/detalle/tv/${this.props.id}`}><button>Ver detalle</button></Link>
          </article>

        </React.Fragment>
    

    )
  }
}
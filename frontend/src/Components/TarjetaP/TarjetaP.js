import React, { Component } from 'react'
import './TarjetaP.css'

export default class TarjetaP extends Component {
  render() {
    return (
        <React.Fragment>
          <article className="tarjetaP">
            <h2>{this.props.nombre}</h2>
            <img src={this.props.img}></img>
            <p>{this.props.overview}</p>
          </article>

        </React.Fragment>
    

    )
  }
}

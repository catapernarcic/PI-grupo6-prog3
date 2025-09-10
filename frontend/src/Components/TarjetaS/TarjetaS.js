import React, { Component } from 'react'
import './TarjetaS.css'

export default class TarjetaS extends Component {
  render() {
    return (
        <React.Fragment>
          <article className="tarjetaS">
            <h2>{this.props.nombre}</h2>
            <img src={this.props.img}></img>
            <p>{this.props.overview}</p>
          </article>

        </React.Fragment>
    

    )
  }
}
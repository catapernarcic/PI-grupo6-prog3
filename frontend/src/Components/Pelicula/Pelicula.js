import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TarjetaP from '../TarjetaP/TarjetaP'
import './Pelicula.css'
class Pelicula extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    };
  render() {
    return (
        <React.Fragment>
            <section className="sectionPeliculas">
                {
                    this.props.peliculas.map((elm, idx) => <TarjetaP key={elm + idx} id={elm.id} nombre={elm.title} img={elm.poster_path} overview={elm.overview}/>)
                }

                </section>
        </React.Fragment>

    )
  }
}

export default withRouter(Pelicula);
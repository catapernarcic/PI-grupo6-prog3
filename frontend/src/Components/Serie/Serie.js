import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TarjetaS from '../TarjetaS/TarjetaS'

class Serie extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    };
  render() {
    return (
        <React.Fragment>
            <section className="sectionSeries">
                {
                    this.props.series.map((elm, idx) => <TarjetaS key={elm + idx} nombre={elm.name}/>)
                }

                </section>
        </React.Fragment>

    )
  }
}

export default withRouter(Serie);
import React, {Component} from "react";
import {Link} from 'react-router-dom'
import Pelicula from '../../Components/Pelicula/Pelicula'



class Peliculas extends Component{

    constructor(props){
      super(props)
      this.state ={
        peliculas: [],
        API_KEY: "21945569abcb8b8f35ad5e0c66a9d763"
      }
    
    }
    
    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.state.API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({
          peliculas: data.results,
      }))
      .catch((error) => console.log(error))
  }

      render(){
        return(
            <React.Fragment>
                <p>peliculas</p>
                {<Pelicula peliculas={this.state.peliculas}/>}

            </React.Fragment>

        )
      }


    }

export default Peliculas;
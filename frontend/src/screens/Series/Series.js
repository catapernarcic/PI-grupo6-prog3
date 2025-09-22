import React, {Component} from "react";
import {Link} from 'react-router-dom'
import Serie from '../../Components/Serie/Serie'
import FormularioP from'../../Components/FormularioP/FormularioP'
import './series.css'
import Loader from "../../Components/Loader/Loader";

class Series extends Component{
    constructor(props){
      super(props)
      this.state ={
        series: [],
        API_KEY: "21945569abcb8b8f35ad5e0c66a9d763",
        sigPag: 1,
        backup: [],
        cargando: true,
        filtrando: false
      }
    }
    componentDidMount(){
      this.setState({ cargando: true });
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.state.API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({
          series: data.results,
          backup: data.results,
          sigPag: this.state.sigPag + 1
      }))
      .then(() => this.setState({ cargando: false }))
       .catch((error) => {
        console.log(error);
        this.setState({ cargando: false });
      })
  }
  cargarMas(){
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.state.API_KEY}&page=${this.state.sigPag}`) 
    .then((resp) => resp.json())
    .then((data) => this.setState({
          series: this.state.series.concat(data.results),
          sigPag: this.state.sigPag + 1,
          backup: this.state.backup.concat(data.results)

      }))
      .catch((error) => console.log(error))
  }
  buscadas(serieBuscada){
    const texto = serieBuscada.toLowerCase()
    const filtrado = this.state.backup.filter( (elm) => elm.name.toLowerCase().includes(texto))
    this.setState({
        series: filtrado,
        filtrando: texto.length > 0
    })
  }

    render(){
       if (this.state.cargando){        
          return <Loader />;             
        }
        return(
            <React.Fragment>
                <h1>Todas las series: </h1>
                <FormularioP tipo="series" filtrados={(texto) => this.buscadas(texto)}/>
                {<Serie series={this.state.series}/>}
                {(!this.state.filtrando || this.state.series.length > 4) && (
                    <section className="seccionBoton">
                      <button onClick={()=> this.cargarMas()}> Cargar mas</button>
                    </section>
                )}
                
            </React.Fragment>
        )
    }

}

export default Series;
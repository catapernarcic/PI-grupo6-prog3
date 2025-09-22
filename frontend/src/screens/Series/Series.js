import React, {Component} from "react";
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
            filtrando: false,
            filtro: ""
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
        .then((data) => {
          this.setState({
            series: this.state.series.concat(data.results),
            sigPag: this.state.sigPag + 1,
            backup: this.state.backup.concat(data.results)
          });
        })
      .catch((error) => console.log(error))
  }
  FiltrarSeries(serieAFiltrar) {
    return this.state.backup.filter((i) =>
      (i.name && i.name.toLowerCase().includes(serieAFiltrar.toLowerCase())) ||
      (i.title && i.title.toLowerCase().includes(serieAFiltrar.toLowerCase()))
    );
  }

  buscadas(serieBuscada){
    this.setState({ filtro: serieBuscada });
  }

    render(){
       if (this.state.cargando){        
          return <Loader />;             
        }
        
        let seriesFiltradas = this.FiltrarSeries(this.state.filtro);
        
        return(
            <React.Fragment>
                <h1>Todas las series: </h1>
                <FormularioP tipo="series" filtrados={(texto) => this.buscadas(texto)}/>
                {seriesFiltradas.length > 0 ? (
                    <Serie series={seriesFiltradas}/>
                ) : (
                    <div className="alert alert-warning text-center">
                        <h3>No existe</h3>
                    </div>
                )}
                {(!this.state.filtrando || seriesFiltradas.length > 4) && (
                    <section className="seccionBoton">
                      <button onClick={()=> this.cargarMas()}> Cargar mas</button>
                    </section>
                )}
                
            </React.Fragment>
        )
        }

}

export default Series;
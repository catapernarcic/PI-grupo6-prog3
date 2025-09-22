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
        .then((data) => {
          const nuevasSeries = this.state.series;
          const nuevoBackup = this.state.backup;
          
          data.results.map((serie) => {
            nuevasSeries.push(serie);
            nuevoBackup.push(serie);
            return serie;
          });
          
          this.setState({
            series: nuevasSeries,
            sigPag: this.state.sigPag + 1,
            backup: nuevoBackup
          });
        })
      .catch((error) => console.log(error))
  }
  buscadas(serieBuscada){
    const texto = serieBuscada.toLowerCase()
    
    if (texto.length === 0) {
      // Si no hay texto de búsqueda, mostrar todas las series cargadas
      this.setState({
        series: this.state.backup,
        filtrando: false
      })
    } else {
      // Buscar en los elementos cargados
      const filtrado = this.state.backup.filter( (elm) => 
        (elm.name && elm.name.toLowerCase().includes(texto)) || 
        (elm.title && elm.title.toLowerCase().includes(texto))
      )
      this.setState({
        series: filtrado,
        filtrando: true
      });
    }
  }

    render(){
       if (this.state.cargando){        
          return <Loader />;             
        }
        return(
            <React.Fragment>
                <h1>Todas las series: </h1>
                <FormularioP tipo="series" filtrados={(texto) => this.buscadas(texto)}/>
                {this.state.series.length > 0 ? (
                    <Serie series={this.state.series}/>
                ) : (
                    <div className="alert alert-warning text-center">
                        <h3>No existe</h3>
                    </div>
                )}
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
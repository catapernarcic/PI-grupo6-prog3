import React, {Component} from "react";
import Pelicula from '../../Components/Pelicula/Pelicula'
import './Peliculas.css'
import FormularioP from'../../Components/FormularioP/FormularioP'
import Loader from "../../Components/Loader/Loader";

class Peliculas extends Component{

    constructor(props){
      super(props)
        this.state ={
            peliculas: [],
            API_KEY: "21945569abcb8b8f35ad5e0c66a9d763",
            sigPag: 1,
            backup: [],
            cargando: true,
            filtrando: false,
            filtro: ""
          }
    
    }
    
    componentDidMount(){
      this.setState({ cargando: true })
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.state.API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({
          peliculas: data.results,
          sigPag: this.state.sigPag + 1,
          backup: data.results
          
      }))
      .then(() => this.setState({ cargando: false })) 
      .catch((error) => {
        console.log(error)
        this.setState({ cargando: false }) 
      })
     
  }
    cargarMas(){
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.state.API_KEY}&page=${this.state.sigPag}`) 
    .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            peliculas: this.state.peliculas.concat(data.results),
            sigPag: this.state.sigPag + 1,
            backup: this.state.backup.concat(data.results)
          });
        })
      .catch((error) => console.log(error))
  }
  FiltrarPelis(peliAFiltrar) {
    return this.state.backup.filter((i) =>
      (i.title && i.title.toLowerCase().includes(peliAFiltrar.toLowerCase())) ||
      (i.name && i.name.toLowerCase().includes(peliAFiltrar.toLowerCase()))
    );
  }

  buscadas(peliBuscada){
    this.setState({ filtro: peliBuscada });
    }

      render(){
         if (this.state.cargando){         
        return <Loader />               
        }
        
        let pelisFiltradas = this.FiltrarPelis(this.state.filtro);
        
        return(

            <React.Fragment>
                <h1>Todas las peliculas:</h1>
                <FormularioP tipo="peliculas" filtrados={(texto) => this.buscadas(texto)}/>
                {pelisFiltradas.length > 0 ? (
                    <Pelicula peliculas={pelisFiltradas}/>
                ) : (
                    <div className="alert alert-warning text-center">
                        <h3>No existe</h3>
                    </div>
                )}
                {(!this.state.filtrando || pelisFiltradas.length > 4) && (
                    <section className="seccionBoton">
                      <button onClick={()=> this.cargarMas()} className="boton"> Cargar mas</button>
                    </section>
                )}
                
            </React.Fragment>

        )
          }


    }

export default Peliculas;
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
        filtrando: false
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
          const nuevasPeliculas = this.state.peliculas;
          const nuevoBackup = this.state.backup;
          
          data.results.map((pelicula) => {
            nuevasPeliculas.push(pelicula);
            nuevoBackup.push(pelicula);
            return pelicula;
          });
          
          this.setState({
            peliculas: nuevasPeliculas,
            sigPag: this.state.sigPag + 1,
            backup: nuevoBackup
          });
        })
      .catch((error) => console.log(error))
  }
  buscadas(peliBuscada){
    const texto = peliBuscada.toLowerCase()
    
    if (texto.length === 0) {
      // Si no hay texto de búsqueda, mostrar todas las películas cargadas
      this.setState({
        peliculas: this.state.backup,
        filtrando: false
      })
    } else {
      // Buscar en los elementos cargados
      const filtrado = this.state.backup.filter( (elm) => 
        (elm.title && elm.title.toLowerCase().includes(texto)) || 
        (elm.name && elm.name.toLowerCase().includes(texto))
      )
      this.setState({
        peliculas: filtrado,
        filtrando: true
      });
    }
    }

      render(){
         if (this.state.cargando){         
        return <Loader />               
        }
        
        return(

            <React.Fragment>
                <h1>Todas las peliculas:</h1>
                <FormularioP tipo="peliculas" filtrados={(texto) => this.buscadas(texto)}/>
                {this.state.peliculas.length > 0 ? (
                    <Pelicula peliculas={this.state.peliculas}/>
                ) : (
                    <div className="alert alert-warning text-center">
                        <h3>No existe</h3>
                    </div>
                )}
                {(!this.state.filtrando || this.state.peliculas.length > 4) && (
                    <section className="seccionBoton">
                      <button onClick={()=> this.cargarMas()} className="boton"> Cargar mas</button>
                    </section>
                )}
                
            </React.Fragment>

        )
      }


    }

export default Peliculas;
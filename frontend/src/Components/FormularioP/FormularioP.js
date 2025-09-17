import React, { Component } from 'react' 
import { withRouter } from 'react-router-dom'; 
import './Formulario.css' 
class FormularioP extends Component { 
    constructor(props){ 
        super(props) 
        this.state = { 
            busqueda: '' 
        } 
    } 
    controlarForm(evento){ 
        evento.preventDefault() 
        this.props.history.push('/resultados/' + this.state.busqueda)
     } 
     controlarInput(evento){ 
        this.setState({ busqueda: evento.target.value },
             ()=> this.props.filtrados(this.state.busqueda) 
            ) 
    } 
    render(){ 
        return( 
        <React.Fragment> 
            <form className="formulario" 
                onSubmit={(evento)=> this.controlarForm(evento)}> 
            <input onChange={(evento) => this.controlarInput(evento)} /> 
            <button>Buscar peliculas</button> 
            </form> </React.Fragment> ) 
            }
    } 
 
 export default withRouter(FormularioP);
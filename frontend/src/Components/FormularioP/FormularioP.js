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
        const tipo = this.props.tipo || 'peliculas';
        console.log('TIPO', tipo)
        this.props.history.push('/resultados/' + tipo + '/' + this.state.busqueda)
     } 
     controlarInput(evento){ 
        this.setState({ busqueda: evento.target.value },
             ()=> this.props.filtrados(this.state.busqueda) 
            ) 
    } 
    render(){ 
        const tipo = this.props.tipo || 'peliculas';
        const textoBoton = tipo === 'series' ? 'Buscar series' : 'Buscar peliculas';
        const placeholder = tipo === 'series' ? 'Buscar series...' : 'Buscar peliculas...';
        
        return( 
        <React.Fragment> 
            <form className="formulario" 
                onSubmit={(evento)=> this.controlarForm(evento)}> 
            <input 
                placeholder={placeholder}
                onChange={(evento) => this.controlarInput(evento)} 
            /> 
            <button>{textoBoton}</button> 
            </form> </React.Fragment> ) 
            }
    } 
 
 export default withRouter(FormularioP);
import React, { Component } from 'react'

export default class Resultados extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {

        return (
        <div><p>{this.props.match.params}</p></div>
        )
    }
}

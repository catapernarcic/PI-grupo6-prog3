import React, {Component} from "react";
import {Link} from 'react-router-dom'
import Serie from '../../Components/Serie/Serie'


class Series extends Component{
    constructor(props){
      super(props)
      this.state ={
        series: [],
        API_KEY: "21945569abcb8b8f35ad5e0c66a9d763"
      }
    }
    componentDidMount(){
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.state.API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({
          series: data.results,
      }))
      .catch((error) => console.log(error))
  }


    render(){
        return(
            <React.Fragment>
                <p>series</p>
                {<Serie series={this.state.series}/>}
            </React.Fragment>
        )
    }

}

export default Series;
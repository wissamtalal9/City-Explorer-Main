import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './components/SearchForm';
import Location from './components/Location';
import AlertMsg from "./components/AlertMsg";
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      map: "",
      lat: "",
      lon: "",
      showData: false,
      weatherData: [],
      showError: false,
    }
  }
  handleLocation = (event) => {
    let display_name = event.target.value;
    
      this.setState({
        display_name: display_name
      })

  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.display_name === ""){
      this.setState({
        showError: true
      })
    }else{

      let config = {
        method: "GET",
        baseURL: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}&format=json`
      }
      axios(config).then(res => {
        let responseData = res.data[0]
        this.setState({
          display_name: responseData.display_name,
          lon: responseData.lon,
          lat: responseData.lat,
          map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=1-18`,
  
          showData: true,
  
        })
  
      }).then(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`)
          .then(res => {
            console.log(res.data);
            this.setState({
              weatherData: res.data,
  
  
            })
  
          });
      })
    }
    
    
  }

render() {
  return (
    <div>
      <h1> WELCOME TO CITY EXPLORER!</h1>
      <br />
      {
        this.state.showError &&
        <AlertMsg />
      }

      <SearchForm handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />
      <br />
      {
        this.state.showData &&
        <Location
          display_name={this.state.display_name}
          lon={this.state.lon}
          lat={this.state.lat}
          map={this.state.map} />
      }
      {this.state.weatherData.map(item => {
        return <>

          <ListGroup style={{ width: '25rem' }}>
            <ListGroup.Item>Date: {item.datetime}</ListGroup.Item>
            <ListGroup.Item>Description: {item.weather.description}</ListGroup.Item>

          </ListGroup>
        </>
      })}
    </div>
  )
}
}

export default App
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './components/SearchForm';
import Location from './components/Location';
import AlertMsg from "./components/AlertMsg";
import axios from 'axios';
import {
  ListGroup,
  Card,} from 'react-bootstrap';

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
      rendering: false,
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
    if (this.state.display_name === "") {
      this.setState({
        showError: true
      })
    } else {
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
          map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=1-10`,

          showData: true,
        })
      }).then(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&country=${this.state.display_name}`)
          .then(res => {
            console.log(res.data);
            this.setState({
              weatherData: res.data,
            })

          });
      })
        .then(() => {
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies?query=${this.state.display_name}`)
            .then(res => {
              console.log('test', res.data);
              this.setState({
                finalCleanedMovies: res.data,
                rendering: true,

              })
              console.log('test', this.state.finalCleanedMovies)
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
          return (
            <>
              <div class="col d-flex justify-content-center">
                <ListGroup style={{ width: '50rem' }}>
                  <ListGroup.Item><h4>Date:</h4> {item.datetime}</ListGroup.Item>
                  <ListGroup.Item><h4>Description:</h4> {item.weather.description}</ListGroup.Item>
                </ListGroup>
                <br />
              </div>
            </>
          )
        })
        }
        {
          this.state.rendering &&
          this.state.finalCleanedMovies.map(item => {
            return (
              <>
                <div class="col d-flex justify-content-center">
                  <div class="row">
                    <div class="col-sm-6">
                      <Card style={{ width: '50rem' }}>
                        <Card.Img variant="top" src={item.poster_path} alt={item.title} width="500" height="1100" />
                        <Card.Body>
                          <Card.Title><h2>{item.title}</h2> </Card.Title>
                          <Card.Text>
                            <h3>Overview:</h3> {item.overview}
                            <br />
                            <h3> Vote_average: </h3>{item.vote_average}
                            <br />
                            <h3> Vote_count: </h3>{item.vote_count}
                            <br />
                            <h3>Popularity:</h3> {item.popularity}
                            <br />
                            <h3> Release_date:</h3> {item.release_date}
                            <br />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
                <br />
              </>
            )
          }
          )
        }
      </div>
    )
  }
}
export default App

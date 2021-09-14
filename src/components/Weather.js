import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
                <h1> {this.props.name}</h1>
                {
                 this.props.forcast.map(item=>{
            return (
                    <div>
              <h1> {item.date} : {item.description} </h1>
              </div>
              )
          })
          }
            </div>
        )
    }
}

export default Weather

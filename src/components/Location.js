import React, { Component } from 'react'
import './first.css'


export class Location extends Component {
    render() {
        return (
            <div>            

      <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">city name</th>
      <th scope="col">longitude</th>
      <th scope="col">latitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{this.props.city_name}</td>
      <td>{this.props.lat}</td>
      <td>{this.props.lon}</td>
    </tr>
   
  </tbody>
</table>
<div className="ratio ratio-16x9 div_iframe">
      <iframe src={this.props.map}  title="country map" allowfullscreen className={this.props.iframe}></iframe>
    </div>
            </div>
        )
    }
}

export default Location
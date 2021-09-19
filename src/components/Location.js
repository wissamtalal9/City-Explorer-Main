import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import style from "./style.css"


class Location extends Component {
    render() {
        return (
            <div class="col d-flex justify-content-center">
                <Card style={{ width: '50rem' }}>
                <Card.Img variant="top" src={this.props.map} alt={this.props.display_name} width="1000" height="900" />
                    <Card.Body>
                        <Card.Title><h2>{this.props.display_name}</h2></Card.Title>                       
                        <Card.Text>
                        Lat,Long:{this.props.lat},{this.props.lon}
                        </Card.Text>                   
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Location

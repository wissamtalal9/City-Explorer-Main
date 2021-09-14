import React, { Component } from 'react';

import { Card } from 'react-bootstrap';
import style from "./style.css"


class Location extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={this.props.map} alt={this.props.display_name} width="800" height="400" />
                    <Card.Body>
                        <Card.Title>{this.props.display_name}</Card.Title>
                        
                        <div class="this">
                        Lat,Long:{this.props.lat},{this.props.lon}
                        </div>
                        
                    </Card.Body>
                </Card>
                
                

            </div>
        )
    }
}

export default Location
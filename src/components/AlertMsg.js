import React, { Component } from 'react'
import {Alert} from "react-bootstrap";

class AlertMsg extends Component {
    render() {
        return (
            <div>
                <Alert  variant='info'>
                    Something Went Wrong Try Again
                </Alert>
            </div>
        )
    }
}
export default AlertMsg

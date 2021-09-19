import React, { Component } from 'react'
import {
    Form,
    Button
} from "react-bootstrap";
import style from "./style.css"


export class SearchForm extends Component {
    render() {
        return (
            <div>
                <h3> <Form.Label >Please Enter Country/City Name</Form.Label></h3>
                <Form.Control type="text"
                    placeholder="Country/City Name"
                    onChange={this.props.handleLocation} />
                <br />
                <Button variant="info" type="submit" onClick={this.props.handleSubmit}>
                    Explore
                </Button>
            </div>
        )
    }
}

export default SearchForm

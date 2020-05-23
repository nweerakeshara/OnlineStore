import React, { Component } from "react";
//To keep backend and front end connectivity, we import axios
import axios from "axios";

import { Link } from "react-router-dom";

export default class CommentsView extends Component {
    state = {
            comments: [],
    };


    componentDidMount() {
        //type of request is 'get'
        console.log(this.props.productid);
        axios.get("http://localhost:5000/api/comments/get/"+this.props.productid)
            .then((response) => {
                this.setState({ comments: response.data });
                console.log(this.state.comments);
            })
            .catch(function (error) {
                console.log(error);
            });
    }




    render() {
        return (
            <div>

                {this.state.comments.map((item) => (
                   <p>{item.cusUn}</p>
                ))}
            </div>
        );
    }
}

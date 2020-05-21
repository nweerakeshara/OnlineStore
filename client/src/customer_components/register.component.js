import React, {Component} from "react";
import axios from "axios";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../actions/cusActions";

class  RegisterCustomer  extends  Component{

    state={
        cusUn: "",
        cusEmail: "",
        cusPw: "",
        msg :null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired
    }

    onChangeCusUn = (e) => {
        this.setState({
            cusUn: e.target.value
        });
    }

    onChangeCusEmail = (e) => {
        this.setState({
            cusEmail: e.target.value
        });
    }

    onChangeCusPw = (e) => {
        this.setState({
            cusPw: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            cusUn : this.state.cusUn,
            cusEmail : this.state.cusEmail,
            cusPw: this.state.cusPw
        };
        console.log(axios.post('http://localhost:5000/api/cus/register', obj).then(res => console.log(res.data)));
        //res.data.loginSuccess,
        this.setState({
            cusUn : "",
            cusEmail : "",
            cusPw: ""
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Customer Sign Up</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.cusUn} onChange={this.onChangeCusUn}/>

                    </div>

                    <div className="form-group">
                        <label>Email Address :</label>
                        <input type="text" className="form-control" value={this.state.cusEmail} onChange={this.onChangeCusEmail}/>

                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.cusPw} onChange={this.onChangeCusPw}/>

                    </div>

                    <div className="form-group">

                        <input type="submit" value="Register" className="btn btn-primary"/>

                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   isAuthenticated: state.cus.isAuthenticated,
   error : state.error
});

export  default connect(mapStateToProps,{register})
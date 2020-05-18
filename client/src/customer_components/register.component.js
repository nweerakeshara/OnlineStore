import React, {Component} from "react";
import axios from "axios";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../actions/cusActions";
import {clearErrors} from "../actions/errorActions";
import {Alert} from 'reactstrap';

class  RegisterCustomer  extends  Component{

    state={
        cusUn: "",
        cusEmail: "",
        cusPw: "",
        msg :null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired

    }

    registerClose = () => {
        this.props.clearErrors();
        this.setState({

        });
    }

    componentDidUpdate =(prevProps) => {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg : error.msg.msg});
            }else{
                this.setState({msg: null });
            }
        }

        if(isAuthenticated){
            this.registerClose();
        }
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

        const {cusUn, cusEmail, cusPw } = this.state;
        const newUser = {
            cusUn,
            cusEmail,
            cusPw
        }

        this.props.register(newUser);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Customer Sign Up</h3>
                <form onSubmit={this.onSubmit}>
                    {this.state.msg ? <Alert color ='danger'>{this.state.msg}</Alert> : null}
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

export  default connect(mapStateToProps,{register, clearErrors})(RegisterCustomer);
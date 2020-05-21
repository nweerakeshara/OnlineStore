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
        cusConfirmPw : "",
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
            cusUn: "",
            cusEmail: "",
            cusPw: "",
            cusConfirmPw : "",
            msg :null
        });

        this.props.history.push('/');
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

    onChangeCusConfirmPw = (e) => {
        if(e.target.value !== this.state.cusPw) {
            this.setState({
                cusConfirmPw: e.target.value,
                msg: "Confirm Password Does Not Match"
            });
        }
        if(e.target.value === this.state.cusPw) {
            this.setState({
                cusConfirmPw: e.target.value,
                msg: ""
            });
        }
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

        this.setState({
            cusUn: "",
            cusEmail: "",
            cusPw: "",
            cusConfirmPw : "",
            msg :null
        });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Customer Sign Up</h3>
                <form onSubmit={this.onSubmit}>
                    {this.state.msg ? <Alert color ='danger'>{this.state.msg}</Alert> : null}
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.cusUn} onChange={this.onChangeCusUn} maxLength="10"/>

                    </div>

                    <div className="form-group">
                        <label>Email Address :</label>
                        <input type="email" className="form-control" value={this.state.cusEmail} onChange={this.onChangeCusEmail}/>

                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.cusPw} onChange={this.onChangeCusPw} minLength="5"/>

                    </div>

                    <div className="form-group">
                        <label>Confirm Password :</label>
                        <input type="password" className="form-control" value={this.state.cusConfirmPw} onChange={this.onChangeCusConfirmPw} minLength="5"/>

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
import React, {Component} from "react";
import swal from "sweetalert";

export default class StoreManagerLogin extends Component{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sm_username : '',
            sm_password : ''
        }
    }

    onChangeUsername(e){
        this.setState({
            sm_username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            sm_password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.sm_username == 'admin' && this.state.sm_password == 'admin'){
            swal("Successful", "Login Granted", "success");
            this.props.history.push('/admin2');
        }else{
            swal("Unsuccessful", "Incorrect username or password", "error");
        }

        this.setState({
            sm_username : '',
            sm_password : ''
        })
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Store Manager Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_username}
                               onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control"
                               value={this.state.sm_password}
                               onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

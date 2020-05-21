import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';



class ItemModal extends Component {

    state = {
        modal: false,
        name : ''
    }

    toggle = () => {
        this.setState({
           modal : !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <button></button>
            </div>
        );
    }
}

export default ItemModal;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input';
import RegularButton from '../../components/button'


class GuestForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            state: 'pending',
            is_pending: true,
            is_attending: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onGuestAdd = this.onGuestAdd.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onGuestAdd(e) {
        e.preventDefault();
        let guest = {
            name: this.state.name,
            email: this.state.email,
            status: 'pending',
            isPending: true,
            isAttending: false
        }
        this.props.addGuestToList(guest);

        this.state.name = '';
        this.state.email = '';
    }

    render() {
        return (
            <>
                <p>Enter data for your guests</p>
                <form onSubmit={this.onGuestAdd}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        placeholder="Name"
                    />
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        placeholder="E-mail"
                    />
                     <RegularButton title='Add guest'/>
                </form>
            </>
        );
    }
}

export default withRouter(GuestForm);
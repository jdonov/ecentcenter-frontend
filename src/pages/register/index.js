import React, { Component } from 'react';
import Input from '../../components/input';
import { register, login } from '../../rest_api/js/data.js';
import { withRouter } from 'react-router-dom';
import UserContext from '../../Context';
import styles from './index.module.css';
import RegularButton from '../../components/button'


class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    static contextType = UserContext;

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const {
            name,
            email,
            password
        } = this.state;

        try {
            if (this.state.password !== this.state.repeat) {
                this.setState({
                    error: {message: "Passwords don't match"}
                });
                return;
            }
            if (this.state.name.length === 0 || this.state.email.length === 0) {
                this.setState({
                    error: {message: 'All inputs are required!'}
                });
                return;
            }
            if (this.state.password.length < 6) {
                this.setState({
                    error: {message: 'Password must be at least 6 characters long'}
                });
                return;
            }

            const resultRegister = await register(name, email, password);

            if (resultRegister.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: resultRegister.message }
                })
                return;
            }

            const resultLogin = await login(email, password);

            if (resultLogin.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: resultLogin.message }
                })
                return;
            }

            this.context.logIn(await resultLogin.json());
            this.props.history.push('/');
        } catch (e) {
            console.error(e);
            this.setState({
                error: { message: e.message }
            })
        }
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div className={styles.errorMessage}>
                    <p>{this.state.error.message}</p>
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <h1>Register</h1>
                {errors}
                <form  onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        placeholder="Name"
                    />
                    <Input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        placeholder="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        placeholder="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        placeholder="Re-password"
                    />
                    <RegularButton title='Register'/>
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);
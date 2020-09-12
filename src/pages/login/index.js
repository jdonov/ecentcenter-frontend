import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input';
import { login } from '../../rest_api/js/data.js';
import UserContext from '../../Context';
import styles from './index.module.css';
import RegularButton from '../../components/button'


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(UserContext);
    const history = useHistory();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (email.length === 0 || password.length === 0) {
                setError('All inputs are required!');
                return;
            }
            const result = await login(email, password);
            if (result.status !== 200) {
                setError('Wrong username or password!')
                return;
            }

            context.logIn(await result.json());
            history.push('/');

        } catch (e) {
            console.error(e);
            setError(e.message)
        }
    }


    let errors = null;
    if (error) {
        errors = (
            <div className={styles.errorMessage}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            {errors}
            <form onSubmit={onSubmitHandler}>
                <Input
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <RegularButton title='Login'/>
            </form>
        </div>
    );
}


export default LoginPage;
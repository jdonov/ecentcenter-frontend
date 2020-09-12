import React, { Component } from 'react';
import styles from './index.module.css';


class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, placeholder } = this.props;
        return (
            <div >
                {label}
                <input
                    placeholder={placeholder}
                    className={styles.input}
                    onChange={onChange}
                    name={name}
                    type={type}
                    value={value} />
            </div>
        );
    }
}

export default Input;
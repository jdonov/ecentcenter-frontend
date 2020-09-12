import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.css';


class GuestList extends Component {
    constructor(props) {
        super(props);

        this.setStatusGuest = this.setStatusGuest.bind(this);
    }

    setStatusGuest(guest) {
        let status = 'pending';
        if (guest.isPending === false && guest.isAttending === true) {
            status = 'confirmed';
        } else if (guest.isPending === false && guest.isAttending === false) {
            status = 'rejected'
        }
        return status;
    };

    render() {
        let guests = this.props.guests || [];
        return (
            <div className={styles.table}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                        {Array.from(guests).map(guest => {
                            return (
                                <Fragment key={guest.id}>
                                    <tr>
                                        <td><h4>{guest.name}</h4></td>
                                        <td><h4>{guest.email}</h4></td>
                                        <td><h4>{this.setStatusGuest(guest)}</h4></td>
                                        <td><button className={styles.btnDel} onClick={() => this.props.deleteGuestHandler(guest.id)}>Delete</button></td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(GuestList);



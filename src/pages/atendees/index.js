import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GuestForm from '../../components/guestForm';
import GuestList from '../../components/guestList';
import { getAllGuestsByEventId, getOwnerNameByOwnerId } from '../../rest_api/js/data'
import { createGuest, setEventGuestId, deleteGuest, sendingEmails } from '../../rest_api/js/data.js';
import styles from './index.module.css';
import RegularButton from '../../components/button'


class Atendees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guests: false,
            submitting: false,
            title: 'Send invitations'
        };

        this.deleteGuestHandler = this.deleteGuestHandler.bind(this);
        this.addGuestToList = this.addGuestToList.bind(this);
        this.sendEmails = this.sendEmails.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let res = await getAllGuestsByEventId(this.props.match.params.eventid);
        let event = await res.json();
        let guests = event.guests;

        this.setState({
            event,
            guests,
            error: false
        });
    }

    async addGuestToList(guest) {
        try {
            if (!guest) {
                this.setState({
                    error: { message: "Invalid input" }
                });
                return;
            }
            const resGuest = await createGuest(guest);
            if (resGuest.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: resGuest.message }
                })
                return;
            }
            let guestid = resGuest.id;
            let eventid = this.props.match.params.eventid;
            await setEventGuestId(guestid, eventid);
            await this.getData();
        } catch (e) {
            console.error(e);
            this.setState({
                error: { message: e.message }
            })
        }
    }

    async deleteGuestHandler(id) {
        await deleteGuest(id);
        await this.getData();
        // window.location.reload();
    }

    async sendEmails() {
        let guestsEmails = [...this.state.guests].map(g => g.email);
        let eventid = this.state.event.id;
        let eventName = this.state.event.name;
        let ownerName = await getOwnerNameByOwnerId();
        let port = '3000';
        let eventLink = `http://localhost:${port}/data/event/${eventid}`;
        await sendingEmails(guestsEmails, ownerName, eventName, eventLink);
        this.setState({ submitting: true });
        this.setState({ title: 'You send invitations successfully!' });
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
                <h1>Atendees List</h1>
                {errors}
                <h2>{this.state.event.name}</h2>
                <h3>{(new Date(this.state.event.dateTime)).toLocaleString()}</h3>
                <GuestForm addGuestToList={this.addGuestToList} />
                <GuestList guests={this.state.guests} deleteGuestHandler={this.deleteGuestHandler} />
                <div>
                    <RegularButton
                        title={this.state.title}
                        disabled={this.state.submitting}
                        onClick={this.sendEmails}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Atendees);
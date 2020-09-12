import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input'
import { getEventById, deleteEvent, guestConfirmation, getAllGuestsByEventId, guestRejection } from '../../rest_api/js/data.js';
import images from '../../utils/imgMap';
import { joinEvent } from '../../rest_api/js/data';
import UserContext from '../../Context';
import { Link } from 'react-router-dom';
import RegularButton from '../../components/button'
import styles from './index.module.css';


class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guestEmail: '',
            titleConfirm: 'Confirm',
            titleReject: 'Reject',
            titleJoin: 'Join',
            submittingJoin: false,
            submittingAnswer: false,
            hideConfirmBtn: false,
            hideRejectBtn: false,
            error: false,
            notFound: false,
            load: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.atendeeHandler = this.atendeeHandler.bind(this);
        this.joinListHandler = this.joinListHandler.bind(this);
        this.onJoinHandler = this.onJoinHandler.bind(this);
        this.onConfirmHandler = this.onConfirmHandler.bind(this);
        this.onRejectHandler = this.onRejectHandler.bind(this);

    }

    static contextType = UserContext;

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            const event = await getEventById(this.props.match.params.eventid);
            if (event.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: event.message }
                })
                return;
            }

            this.setState({ event });
            this.setState({ load: false });
        } catch (e) {
            console.error(e);
            this.setState({
                notFound: e.message
            })
        }

    }

    atendeeHandler(e) {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/atendees/${eventid}`);
    }

    joinListHandler(e) {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/joined/${eventid}`);
    }

    async onJoinHandler(e) {
        let eventid = this.props.match.params.eventid;
        await joinEvent(eventid);

        this.setState({ titleJoin: 'You joined successfully' });
        this.setState({ submittingJoin: true });
    }

    async deleteHandler(e) {
        await deleteEvent(this.props.match.params.eventid);
        this.setState({ event: false });
        this.props.history.push('/users/profile');
    }

    onEditHandler() {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/edit/${eventid}`)
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

    }

    async onConfirmHandler() {
        let guestEmail = this.state.guestEmail;
        let eventid = this.props.match.params.eventid;

        let data = await getAllGuestsByEventId(eventid);
        let event = await data.json();
        let allGuests = event.guests;
        let guest = allGuests.filter(g => g.email === guestEmail);
        let [guestid] = guest.map(o => o.id);
        try {
            if (!guestid) {
                this.setState({
                    error: { message: "Invalid email address" }
                });
                return;
            }
            const result = await guestConfirmation(guestid);
            if (result.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: result.message }
                })
                return;
            }
            this.setState({ error: false })
            this.setState({ titleConfirm: 'You confirmed successfully' });
            this.setState({ submittingAnswer: true });
            this.setState({ hideRejectBtn: true });
        } catch (e) {
            console.error(e);
            this.setState({
                error: { message: e.message }
            })
        }
    }

    async onRejectHandler() {
        let guestEmail = this.state.guestEmail;
        let eventid = this.props.match.params.eventid;

        let data = await getAllGuestsByEventId(eventid);
        let event = await data.json();
        let allGuests = event.guests;
        let guest = allGuests.filter(g => g.email === guestEmail);
        let [guestid] = guest.map(o => o.id);

        try {
            if (!guestid) {
                this.setState({
                    error: { message: "Invalid email address" }
                });
                return;
            }
            const result = await guestRejection(guestid);
            if (result.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: result.message }
                })
                return;
            }
            this.setState({ error: false })
            this.setState({ titleReject: 'You rejected successfully' });
            this.setState({ submittingAnswer: true });
            this.setState({ hideConfirmBtn: true });
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
        if (this.state.notFound) {
            throw new Error('Invalid data')
        }
        let main = <div className={styles.linkContainer}><Link className={styles.link} to="/users/login"><strong>Login</strong> to join event!</Link></div>;

        const event = this.state.event;
        const loggedIn = this.context.user && this.context.user.loggedIn;
        console.log("Test" + event);
        console.log("user" + this.context.user);
        if (loggedIn) {
            if ((this.context.user.id === event.ownerId) && event.isPublic) {
                main = (
                    <div className={styles.btnContainer}>
                        <RegularButton
                            title='Joined List'
                            onClick={this.joinListHandler}
                        />
                        <RegularButton
                            title='Edit event'
                            onClick={this.onEditHandler}
                        />
                        <RegularButton
                            title='Delete event'
                            onClick={this.deleteHandler}
                        />
                    </div>

                )
            } else if ((this.context.user.id === event.ownerId) && !event.isPublic) {
                main = (

                    <div className={styles.btnContainer}>
                        <RegularButton
                            title='Atendee List'
                            onClick={this.atendeeHandler}
                        />
                        <RegularButton
                            title='Edit event'
                            onClick={this.onEditHandler}
                        />
                        <RegularButton
                            title='Delete event'
                            onClick={this.deleteHandler}
                        />
                    </div>

                )
            } else if ((this.context.user.id !== event.ownerId) && event.isPublic) {
                if (event.usersId.length < Number(event.maxGuests)) {
                    if (!event.usersId.find(u => u.id === this.context.user.id)) {
                        main = (
                            <div>
                                <RegularButton
                                    title={this.state.titleJoin}
                                    onClick={this.onJoinHandler}
                                    disabled={this.state.submittingJoin}
                                />
                            </div>
                        )
                    } else {
                        main = (
                            <div>
                                <h3>You have already joined this public event!</h3>
                            </div>
                        )
                    }
                } else {
                    main = (
                        <div>
                            <h3>This public event is fully booked!</h3>
                        </div>
                    )
                }
            }
        } else {
            if (!event.isPublic) {
                main = (
                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                            <Input
                                name="guestEmail"
                                value={this.state.guestEmail}
                                onChange={this.onChangeHandler}
                                placeholder="To send response, please type your email here "
                            />
                            {this.state.hideConfirmBtn ? null : <button className={styles.btnConfirm} onClick={this.onConfirmHandler} disabled={this.state.submittingAnswer}>{this.state.titleConfirm}</button>}

                            {this.state.hideRejectBtn ? null : <button className={styles.btnReject} onClick={this.onRejectHandler} disabled={this.state.submittingAnswer}>{this.state.titleReject}</button>}
                        </form>
                    </div>
                )
            }
        }

        return (
            <>
                {this.state.load ? <p>Loading ...</p>
                    : <div className={styles.container}>
                        {errors}
                        <div className={styles.eventPage}>
                            <div className={styles.imgContainerDiv}>
                                <img alt={event.category} src={event.imageUrl || images[event.category]} />
                            </div>
                            <h1>{event.name}</h1>
                            <h3>Location name: {event.locationName}</h3>
                            <h3>Location address: {event.address}</h3>
                            <h3>Date/time: {(new Date(event.dateTime)).toLocaleString()}</h3>
                            <p>{event.description}</p>
                        </div>
                        <div className={styles.mainContainer}>
                            {main}
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default withRouter(EventPage);

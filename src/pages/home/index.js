import React, { Component } from 'react';
import { getAllPublicEvents } from '../../rest_api/js/data';
import EventsList from '../../components/eventsList';
import Input from '../../components/input';
import { Link } from 'react-router-dom';
import styles from './index.module.css';


export class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchEvents: [],
            searchString: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let events = await getAllPublicEvents();
        events.sort((a, b) => b.date_time - a.date_time);
        events = events.slice(0, 6);
        this.setState({ events });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const { searchString } = this.state;
        const allEvents = await getAllPublicEvents();

        let events = allEvents.filter(e => e.name.toLowerCase().includes(searchString.toLowerCase()) ||
            e.category.toLowerCase().includes(searchString.toLowerCase()) ||
            e.description.toLowerCase().includes(searchString.toLowerCase()) ||
            e.address.toLowerCase().includes(searchString.toLowerCase()));
        this.setState({ events });

        this.props.history.push({
            pathname: `/search`,
            state: {
                events: this.state.events
            }
        });
    }

    render() {

        return (
            <div className={styles.container}>
                <div className={styles.firstSection}>
                    <div className={styles.info}>
                        <h1>EVENT CENTER</h1>
                        <h3>It's free, fast and fancy</h3>
                        <p>Start from here...</p>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.create}>
                            <div>
                                <select className={styles.select}>
                                    <option>Тype of event</option>
                                    <option value="Party">Party</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Festival">Festival</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Sporting Event or Competition">Sporting Event or Competition</option>
                                    <option value="Trip">Trip</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <Link className={styles.link} to={'/data/event'}>CREATE EVENT</Link>
                            </div>
                        </div>
                        <div className={styles.search}>
                            <form onSubmit={this.onSubmitHandler}>
                                <div>
                                    <Input
                                        name="searchString"
                                        type="text"
                                        value={this.state.search}
                                        onChange={this.onChangeHandler}
                                        placeholder="Search"
                                    />
                                </div>
                                <div>
                                    <button className={styles.btn}>SEARCH EVENTS</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={styles.secondSection}>
                    <h1>Public events</h1>
                    <div className={styles.eventsCards}>
                        {this.state.events.length === 0 ?
                            <p>There are no events &hellip;</p> :
                            <EventsList events={this.state.events} />}
                    </div>
                </div>

            </div>
        );
    }

};

export default HomePage;


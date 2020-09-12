import React, { Component } from 'react';
import { getAllPublicEvents } from '../../rest_api/js/data';
import EventsList from '../../components/eventsList';
import Input from '../../components/input';
import RegularButton from '../../components/button'
import styles from './index.module.css';

export class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: this.props.location.state.events,
            searchString: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

        this.setState({ events: events });

    }



    render() {
        return (
            <div className={styles.container}>
                <h2>SEARCH PAGE </h2>
                <div>
                    <form className={styles.formSearch} onSubmit={this.onSubmitHandler}>
                        <Input
                            name="searchString"
                            type="text"
                            value={this.state.search}
                            onChange={this.onChangeHandler}
                            placeholder="Search"
                        />
                        <RegularButton title='Search public events'/>
                    </form>
                    <div className={styles.divSearched}>
                        <h1>Public events</h1>
                        {this.state.events.length === 0 ?
                            <h2>There are no events &hellip;</h2> :
                            <EventsList events={this.state.events} />}
                    </div>
                </div>
            </div>
        );
    }

}

export default SearchPage;


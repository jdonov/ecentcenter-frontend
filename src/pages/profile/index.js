import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getEventsByOwnerId } from '../../rest_api/js/data.js';
import EventsList from '../../components/eventsList'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };

    }
    componentDidMount() {
        this.getData();
    }
  
    async getData() {
        const data = await getEventsByOwnerId();
        const events = await data.json();
        this.setState({ events });
    }

    render() {
        return (
            <div>
                <h1>My events</h1>
                {this.state.events.length === 0 ?
                    <p>There are no created events &hellip;</p> :
                    <EventsList events={this.state.events} />}
            </div>
        );
    }
}


export default withRouter(ProfilePage);
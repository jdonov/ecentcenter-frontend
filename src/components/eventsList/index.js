import React, { Component } from 'react';
import EventCard from '../eventCard';
import images from '../../utils/imgMap';
import styles from './index.module.css';


class EventsList extends Component {
    render() {
        return (
            <div className={styles.cardsList}>
                {this.props.events.map(e => (
                    <EventCard
                        key={e.id}
                        eventid={e.id}
                        name={e.name}
                        category={e.category}
                        location_name={e.locationName}
                        date_time={e.dateTime}
                        imageUrl={e.imageUrl || images[e.category]}
                        /> 
                ))}
            </div>
        );
    }
}

export default EventsList
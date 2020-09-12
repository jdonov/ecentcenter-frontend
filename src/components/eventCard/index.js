import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import images from '../../utils/imgMap.js'

function EventCard({ eventid, name, category, location_name, date_time, imageUrl }) {
    return (
        <article className={styles.eventCard}>
            <div className={styles.imgContainer}>
                <img alt={category} src={`${imageUrl}` || `${images[category]}`} />
            </div>
            <div className={styles.info}>
                <h1>{name}</h1>
                <h3>Location name: {location_name}</h3>
                <h3>Date/time: {(new Date(date_time)).toLocaleString()}</h3>
            </div>
            <div className={styles.linkContainer}>
                <Link className={styles.link} to={'/data/event/' + eventid}>View Details</Link>
            </div>
        </article>
    );
}

export default EventCard;
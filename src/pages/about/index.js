import React from 'react';
import styles from './index.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div>
                <h1>How it works</h1>
            </div>
            <div className={styles.text}>
                <h3>What is Event center app?</h3>
                <p>Event center app lets you to create your own events, send invitations by email and join public events, created by other users.</p>

                <h5>Create an event</h5>
                <p>If you are registered user you will be able to create your own events.To create an event it is necessary to enter data about the event - name of the event, description, address and name of the place, date and time so that your guests can be fully informed.
                Optionally, you can enter the maximum number of guests, specify the type of event by selecting one of 11 categories of events and upload an image url by your choice, that will displayed on the event you created. If you do not select an event category - by default it will be "party", if you do not enter an image url - we will select a suitable picture for you according to the event category. A key point is to choose whether the event is public or private.</p>

                <p><strong>Public event</strong> - all registered users in the application will be able to see it and join it. If you want to limit the number of visitors - you must specify the maximum number of guests when creating the event.</p>

                <p><strong>Private event</strong> is visible only for those who have a link to it. You have opportunity to create a list of attendees who do not need to be registered in the application, to whom you can send an invitation to the event by email. Attendees can confirm or decline your invitation and this will be reflected on the event page.</p>

                <h5>Joining a public event</h5>
                <p>Each registered user can join to any public event, as long as there are vacancies. For convenience, the home page has a search engine for public events.</p>

                <h5>Event management</h5>
                <p>Any user who has created an event - can edit and delete it, as well as manage it, depending on whether it is public or private.
                At Joined List for public event – you will see a list of everyone who joined the event.
                At Attendee List for private event - you will be able to send invitations by e-mail and monitor their response.</p>
            </div>
        </div>
    )
}

export default AboutPage;




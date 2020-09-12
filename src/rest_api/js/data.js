
function host(endpoint) {
    return `https://eventcenter-backend-api.herokuapp.com/api/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'login',
    LOGOUT: 'logout',
    EVENT: 'events/event',
    GUESTS_BY_EVENT: 'events/guests/event',
    OWN_EVENTS: 'events/ownerId',
    GUESTS: 'guests',
    EMAILS: 'email',
    USER: 'users',
    GETUSERS: '/data/Users'
};

//register
export async function register(name, email, password) {
    const response = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword: password
        })
    });
    // const data = await response.json();
    return response;
}

//login
export async function login(email, password) {
    const response = await fetch(`https://eventcenter-backend-api.herokuapp.com/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password
        })
    });
    const jwt = await response.headers.get("Authorization");
    // const data = await response.json();
    sessionStorage.setItem('jwt', jwt);
    // localStorage.setItem('email', data.email); //нужно ли е?
    // localStorage.setItem('userid', data.id);
    return response;
}

//logout
export async function logoutApi() {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    sessionStorage.removeItem('jwt');
    // localStorage.removeItem('email'); //ако е нужно?
    // localStorage.removeItem('userid');

    const response = await fetch(host(endpoints.LOGOUT), {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    return response;
}

//get event by Id
export async function getEventById(id) {
    const response = await fetch(host(endpoints.EVENT + '/' + id));
    const data = await response.json();
    if(response.status === 404){
        throw new Error(`Page not found`);
    }
    return data;
}


//create new event
export async function createEvent(event) {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.EVENT), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(event)
    });
    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }

    return await response.json();
}

//get events by user ID
export async function getEventsByOwnerId() {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }
    // const ownerId = localStorage.getItem('userid');

    const result = fetch(host(endpoints.OWN_EVENTS), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    return result;
    // return data;
}

//edit event
export async function updateEvent(eventid, updatedProps) {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + "/" + eventid), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(updatedProps)
    });

    return result;
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
}

// delete event
export async function deleteEvent(id) {

    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.EVENT + "/" + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return result;

    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
}

//create Guest
export async function createGuest(guest) {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.GUESTS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(guest)
    });
    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}


//set guestId to event
export async function setEventGuestId(guestid, eventid) {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const response = await fetch(host(endpoints.EVENT + "/" + eventid + "/guest/" + guestid), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }/*,
        body: JSON.stringify([`${guestid}`])*/
    });

    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

//get all guests in an event
export async function getAllGuestsByEventId(eventid) {
    // const token = sessionStorage.getItem('jwt');
    // if (!token) {
    //     throw new Error(`User is not logged in`);
    // }

    const result = fetch(host(endpoints.GUESTS_BY_EVENT + `/` + eventid), {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}


//delete guest
export async function deleteGuest(id) {

    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = fetch(host(endpoints.GUESTS + "/" + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return result;

    // should I update event?;

}

//sending emails to the guests
export async function sendingEmails(guestsEmails, ownerName, eventName, eventLink) {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.EMAILS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "subject": "Event center Invitation",
            "textMessage": `Hello!\nYou have new invitation for ${eventName} from ${ownerName}.\nFor more details, please follow the link: ${eventLink}\n\nBest regards,\nEvent center`,
            "to": guestsEmails
        })
    });

    return result;
}

//get owner name by ownerId
export async function getOwnerNameByOwnerId() {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    // const ownerId = localStorage.getItem('userid');
    const response = await fetch(host(endpoints.USER), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await response.json();
    return data.name;
}

//guest's confirmation
export async function guestConfirmation(guestid) {

    const result = await fetch(host(endpoints.GUESTS + `/update/${guestid}`), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
                { 
                "isPending": false,
                 "isAttending": true
                })
    });
    const data = await result.json();
    return data;
}

//guest's confirmation
export async function guestRejection(guestid) {

    const result = await fetch(host(endpoints.GUESTS + `/update/${guestid}`), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
                { 
                "isPending": false,
                 "isAttending": false
                })
    });
    const data = await result.json();
    return data;
}

//guest's answer
export async function guestAnswer(guestid, answer) {

    const result = await fetch(host(endpoints.GUESTS + `/update/${guestid}`), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
                { 
                "isPending": false,
                 "isAttending": answer
                })
    });
    const data = await result.json();
    return data;
}

//get all public events by date
export async function getAllPublicEvents(){
    const result = await fetch(host(endpoints.EVENT + `?isPublic=true`), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
  
    return data;
}

export async function joinEvent(eventid){
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    // const guestId = localStorage.getItem('userid');

    const response = await fetch(host(endpoints.EVENT + "/" + eventid + "/join/"), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await response.json();

    if (data.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, data);
        throw error;
    }

    return data;
}

export async function getAllJoinedUsersByEventId(eventid){
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.EVENT + `/${eventid}/joinedUsers`), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}

export async function getCoutJoinedUsersByEventId(eventid){
    const token = localStorage.getItem('jwt');

    if (!token) {
        throw new Error(`User is not logged in`);
    }

    const result = await fetch(host(endpoints.GETUSERS + `/count?where=Event%5Busers_id%5D.objectId%20%3D%20%27${eventid}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    // const data = await result.json();

    // if (data.hasOwnProperty('errorData')) {
    //     const error = new Error();
    //     Object.assign(error, data);
    //     throw error;
    // }
    // return data;
    return result;
}

// `/data/Users/count?where=Event%5Busers_id%5D.objectId%20%3D%20%27${eventid}%27`
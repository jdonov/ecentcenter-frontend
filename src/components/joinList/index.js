import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class JoinList extends Component {
    render() {
        let guests = this.props.guests || [];
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        
                        </tr>
                        {Array.from(guests).map(guest => {
                            return (
                                <Fragment key={guest.id}>
                                    <tr>
                                        <td><h4>{guest.name}</h4></td>
                                        <td><h4>{guest.email}</h4></td>
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

export default withRouter(JoinList);



import React, { useContext } from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import CreatePage from './pages/create';
import EditPage from './pages/edit';
import EventPage from './pages/event';
import AtendeesPage from './pages/atendees';
import JoinedPage from './pages/joined';
import ErrorPage from './pages/error';
import UserContext from './Context';
import SearchPage from './pages/search';

const App = () => {
  const context = useContext(UserContext)
  const loggedIn = context.user && context.user.loggedIn;


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/users/register" component={RegisterPage} />
        <Route exact path="/users/login" component={LoginPage} />
        <Route exact path="/users/profile">
          {loggedIn ? (<ProfilePage />) : (<Redirect to="/users/login" />)}
        </Route>
        <Route exact path="/data/event/:eventid" component={EventPage} />
        <Route exact path="/data/event">
          {loggedIn ? (<CreatePage />) : (<Redirect to="/users/login" />)}
        </Route>
        <Route exact path="/data/event/edit/:eventid">
          {loggedIn ? (<EditPage />) : (<Redirect to="/users/login" />)}
        </Route>
        <Route exact path="/data/event/atendees/:eventid">
          {loggedIn ? (<AtendeesPage />) : (<Redirect to="/users/login" />)}
        </Route>
        <Route exact path="/data/event/joined/:eventid">
          {loggedIn ? (<JoinedPage />) : (<Redirect to="/users/login" />)}
        </Route>
        <Route exact path="/users/logout" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);

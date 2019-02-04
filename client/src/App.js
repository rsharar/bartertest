import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import NavCategory from './components/NavCategory/NavCategory'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Sidenav from './components/Sidenav/Sidenav'
import PostItemForm from './components/PostItem/PostItem'
import Home from './components/Home/Home'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<div>
				<nav>
					<div className="nav-wrapper row">
						<ul id="nav-mobile" className="hide-on-med-and-down center">
							<NavCategory />
							<div className="col s4"></div>
							<div className="col s1">
								<li className="nav-item right">
									<Link to="/users/post" className="nav-link">
										Post an item
						</Link>
								</li>
							</div>
							<div className="col s1">
								<li className="nav-item right">
									<Link to="#" className="nav-link" onClick={props._logout}>
										Logout
						</Link>
								</li>
							</div>
						</ul>
					</div>
				</nav >
			</div>
		)
	} else {
		return (
			<div>
				<nav>
					<div className="nav-wrapper row">
						<ul id="nav-mobile" className="hide-on-med-and-down center">
							<NavCategory />
							<div className="col s4"></div>
							<div className="col s1">
								<li className="nav-item right">
									<Link to="/login" className="nav-link">
										login
						</Link>
								</li>
							</div>
							<div className="col s1">
								<li className="nav-item right">
									<Link to="/signup" className="nav-link">
										sign up
						</Link>
								</li>
							</div>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			category: '',
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<Sidenav />
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />
				<Route exact path="/users/post" component={PostItemForm} />
			</div>
		)
	}
}

export default App
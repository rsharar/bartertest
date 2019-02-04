import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './style.css'


class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
		console.log(event.target.value);
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('SUCCESSFUL LOGIN')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
			.catch(err => {
				console.log("GOOGLE OAUTH ERROR: ", err)
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm container z-depth-3">
				<h4>Signup form</h4>
				<i className="material-icons left">person</i>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<i className="material-icons left">lock</i>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<button id="sign-up-btn" onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Sign up!
    <i className="material-icons right">send</i>
				</button>
			</div>
		)
	}
}

export default SignupForm
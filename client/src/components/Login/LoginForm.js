import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="container z-depth-3">
					<a href="/auth/google">
						{/* <GoogleButton /> */}
						<img src={googleButton} alt="sign into Google Button" id="googleBtn"/>
					</a>
					<div> OR </div>
					<form id="loginForm">
						<label className="formInput" htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<label className="formInput"htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<button id="login-btn" onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Login
    <i className="material-icons right">send</i>
				</button>
					</form>
				</div>
			)
		}
	}
}

export default LoginForm

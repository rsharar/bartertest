import React, { Component } from 'react'
import API from '../../utils/API';
import './style.css'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

class PostItemForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            owneruserid: '',
            category: '',
            description: '',
            imageurl: '',
            location: '',
            status: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
		axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				this.setState({
					owneruserid: response.data.user._id
                })
			} else {
                console.log("no logged in user")
            }
        })
    }
		

    handleChange(event) {
        console.log(this.props.id)
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // Validation with title and description fields
        if (this.state.title && this.state.description) {
            API.postProduct({
                title: this.state.title,
                owneruserid: this.state.owneruserid,
                category: this.state.category,
                description: this.state.description,
                imageurl: this.state.imageurl,
                location: this.state.location,
                status: this.state.status,
            })
                .then(response => {
                    console.log(response)
                    console.log("product posted!")
                })
                .catch(err => {
                    console.log("POST ITEM ERROR: ", err)
                });
        }
    }
    render() {
        return (
            <div className="container z-depth-3" id="postItemForm">
                <h4>Post an Item</h4>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="productTitle">Product Title: </label>
                    <input
                        className="formElement"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="e.g. DeWalt Angle Grinder"
                    />
                </div>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="productCategory">Category: </label>
                    <select name="category" className="formElement"
                        value={this.state.category} onChange={this.handleChange} style={{ display: 'inline-block' }}>
                        <option value="tools">All</option>
                        <option value="crafts">Crafts</option>
                        <option value="electronics">Electronics</option>
                        <option value="sports">Sports</option>
                        <option value="tools">Tools</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="productDescription">Description: </label>
                    <input
                        className="formElement"
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder="Describe your item in a few sentences."
                    />
                </div>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="imageURL">Photo: </label>
                    <input
                        className="formElement"
                        type="text"
                        name="imageurl"
                        value={this.state.imageurl}
                        onChange={this.handleChange}
                        placeholder="Add an image URL"
                    />
                </div>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="productLocation">Location: </label>
                    <input
                        className="formElement"
                        type="text"
                        name="location"
                        value={this.state.location}
                        onChange={this.handleChange}
                        placeholder="Neighborhood, City or State"
                    />
                </div>
                <div className="postItemFields">
                    <label className="formTitle" htmlFor="productStatus">Status: </label>
                    <input
                        type="text"
                        name="status"
                        placeholder="To borrow? To barter? To give away?"
                        value={this.state.status}
                        onChange={this.handleChange}
                    />
                </div>
                <button id="postFormBtn" onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Post my Item!
    <i className="material-icons right">send</i>
                </button>
            </div>
        )
    }
}

export default PostItemForm;
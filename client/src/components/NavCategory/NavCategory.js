import React, { Component } from 'react'
import API from '../../utils/API';
import './style.css'


export default class NavCategory extends Component {
    constructor() {
        super()
        this.state = {
            category: '',
            searchQuery: '',
            products: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleSubmit(event) {
        console.log("Search: " + this.state.searchQuery)
        event.preventDefault()
        // Validation with category selected
        if (this.state.category) {
            // this.state.category is updated based on dropdown selection
            API.getProductsByCategory({
                category: this.state.category
            })
                .then(response => {
                    // return all matching products with category
                    console.log(response.data)
                    // update state of empty products []
                    this.setState({ products: response.data })
                })
                .catch(err => {
                    console.log("SEARCH BY CATEGORY ERROR: ", err)
                });
        }
        if (this.state.searchQuery.length > 1) {
            API.getProductsBySearch({
                searchQuery: this.state.searchQuery
            })
                .then(response => {
                    // return all matching products with category
                    console.log(response.data)
                    // update state of empty products []
                    this.setState({ products: response.data })
                })
                .catch(err => {
                    console.log("SEARCH BY CATEGORY ERROR: ", err)
                });
        }
    }
    render() {
        return (
            <div className="navbox ">
                <div className="row searchBar col s0.5">
                    <div className="input-field col s6 s12 red-text">
                        <i className="material-icons left">search</i>
                    </div>
                </div>
                <div className="col s2.5">
                    <input 
                    name="searchQuery" 
                    type="text" 
                    value={this.state.searchQuery}
                    onChange={this.handleChange}
                    style={{ width:'300px' }}
                    placeholder="search" 
                    id="autocomplete-input" className="autocomplete black-text" />
                </div>
                <div className="postItemFields col s2">
                    {/* <label className="formTitle" htmlFor="productCategory">Category: </label> */}
                    <select name="category" className="formElement"
                        value={this.state.category} onChange={this.handleChange} style={{ width: '200px', display: 'inline-block'}}>
                        <option value="tools">All</option>
                        <option value="crafts">Crafts</option>
                        <option value="electronics">Electronics</option>
                        <option value="sports">Sports</option>
                        <option value="tools">Tools</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="col s1">
                <button id="searchBtn"
                    onClick={this.handleSubmit}
                    className="btn waves-effect waves-light" type="submit" name="action" style={{ width: '150px' }}>Find items!
                </button>
                </div>
            </div>
        )
    }
}

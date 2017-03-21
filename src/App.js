/* ROOT Component of your App  */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const APP_TITLE = 'Recipe & Ingredients App'
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS } from './utils/api'

//components
import WeatherCard from './components/WeatherCard'
import RecipeCard from './components/RecipeCard'

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state = {
            weather: undefined,
            recipe: undefined,
            city: '',
            page_data: '',
            sort_data: ''
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <div className="App-content">

                    {/* Bandeau selection des données pour la recherche */ }
                    <div className="row brown lighten-4">

                        <div className="col s3">
                            <div className="center inline" style={ { paddingTop: 46 } }>
                                <div className="input-field inline valign-wrapper">
                                    {/* input onChange event calls recipes with ingredient choose by the user */ }
                                    <input className="waves-effect waves-light btn white deep-orange-text" type="text" placeholder="Search By Ingredients" value={ this.state.city } onChange={ this.handleChange } />
                                </div>
                            </div>
                        </div>

                        <div className="col s3">
                            <div className="collection deep-orange lighten-2">
                                {/* Links to select the way to sort 6 */ }
                                <li className="collection-header white-text" style={ { paddingLeft: 15 } }><h5>Sort By</h5></li>
                                <a className="collection-item deep-orange-text" value='r' onChange={ this.handleChange_sort }>
                                    Top Rating
                                </a>
                                <a className ="collection-item deep-orange-text" value='t' onChange={ this.handleChange_sort }>
                                    Trending
                                </a>
                            </div>
                        </div>

                        <div className="col s3">
                            <div className="center-align" style={ { paddingTop: 60 } }>
                                {/*-- Dropdown Trigger -- */ }
                                <a className='dropdown-button btn deep-orange lighten-2' data-activates='dropdown1'>Number of pages ?</a>

                                {/*-- Dropdown Structure -- */ }
                                <ul id='dropdown1' className='dropdown-content'>
                                    <li><a className="deep-orange-text" value='1' onChange={ this.handleChange_page }>
                                        1
                                    </a></li>
                                    <li><a className="deep-orange-text" value='2' onChange={ this.handleChange_page }>
                                        2
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col s3">
                            <div className="center-align" style={ { paddingTop: 60 } }>
                                {/* button onClick event calls the fetchWeather method */ }
                                <button className="waves-effect waves-light btn deep-orange lighten-2" onClick={ this.fetchWeather } >
                                    Recipe ?
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bandeau Affichage des ingrédients */ }
                    <div className="row brown lighten-5" style={ { marginTop: 20 } } >
                        { this.displayRecipeInfo() }
                    </div>

                    {/* Affichage des recettes */ }
                    <div className="row" style={ { marginTop: 20 } } >
                        { this.displayWeatherInfo() }
                    </div>

                </div>
            </div >
        )
    }

    handleChange = ( event ) => {
        this.setState( {
            city: event.target.value
        } );
    }

    handleChange_page = ( event ) => {
        this.setState( {
            page_data: event.target.value
        } );
    }

    handleChange_page = ( event ) => {
        this.setState( {
            sort_data: event.target.value
        } );
    }

    //method triggered by onClick event of the "Weather?" button
    /* Arrow function syntax used for Autobinding, see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding */
    fetchWeather = async () => {

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */

        try {
            const weather = await get( ENDPOINTS.SEARCH_API_URL, {
                //YOU NEED TO PROVIDE YOUR API KEY HERE
                key: '596b09d3a23693bbfff183ac4204caab',
                q: this.state.city,
                page: this.state.page_data,
                sort: this.state.sort_data
            } )

            console.log( weather )

            /* React state DOCUMENTATION : https://facebook.github.io/react/docs/lifting-state-up.html */

            this.setState( {
                weather: weather
            } )
        }
        catch ( error ) {
            console.log( 'Failed fetching data: ', error )
        }
    }

    //handle display of the received weather object
    displayWeatherInfo = () => {
        const weather = this.state.weather

        if ( weather ) {
            return weather.recipes.map( recipe => {
                return (
                    <WeatherCard title={ recipe.title } image_url={ recipe.image_url }
                        publisher={ recipe.publisher } social_rank={ recipe.social_rank }
                        fetchRecipe={ this.fetchRecipe } recipe_id={ recipe.recipe_id } />
                )
            } )

        }
        return null
    }


    //method triggered by onClick event of the "Obtenir la recette" button

    fetchRecipe = async ( rId ) => {

        try {
            const recipe = await get( ENDPOINTS.GET_API_URL, {
                key: '596b09d3a23693bbfff183ac4204caab',
                rId: rId
            } )

            console.log( recipe.recipe )

            this.setState( {
                recipe: recipe.recipe
            } )
        }
        catch ( error ) {
            console.log( 'Failed fetching data: ', error )
        }
    }

    //handle display of the received weather object
    displayRecipeInfo = () => {
        const recipe = this.state.recipe

        if ( recipe ) {
            return (
                <RecipeCard title={ recipe.title } image_url={ recipe.image_url }
                    ingredients={ recipe.ingredients } />
            )
        }
        return null
    }

}
export default App
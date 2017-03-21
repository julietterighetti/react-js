import React, { Component } from 'react'

class WeatherCard extends Component {

    // THIS COMPONENT TAKES A 'data' object as "props"

    /*
        DATA FORMAT SENT BY THE API :
        {
            "count": 1, 
            "recipes": [{
                "publisher": "Allrecipes.com",
                "social_rank": 99.81007979198002, 
                "f2f_url": "http://food2fork.com/F2F/recipes/view/29159", 
                "publisher_url": "http://allrecipes.com", 
                "title": "Slow-Cooker Chicken Tortilla Soup", 
                "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
                "page":1}]
        }
    */

    fetchRecipe = () => {
        this.props.fetchRecipe( this.props.recipe_id )
    }

    render() {

        // Props nécessaire au "SEARCH"
        const title = this.props.title
        const image_url = this.props.image_url
        const publisher = this.props.publisher
        const social_rank = this.props.social_rank

        // Props nécessaire au "GET"
        const recipe_id = this.props.recipe_id

        return (

            <div className="col s3 m6 l3">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={ image_url } />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator deep-orange-text">
                            { title }
                            <i className="material-icons black-text right"> more_vert </i>
                        </span>
                        <div className="waves-effect waves-light btn deep-orange lighten-2" onClick={ this.fetchRecipe }>
                            Voir cette recette
                        </div>
                    </div>

                    <div className="card-reveal">
                        <span className="card-title deep-orange-text">
                            { title }
                            <i className="material-icons black-text right">close</i>
                        </span>
                        <p>Name of the publisher : { publisher }
                            <br />
                            <br />
                            Social Rank : { social_rank }
                        </p>
                    </div>
                </div>
            </div>

        )
    }

}

export default WeatherCard
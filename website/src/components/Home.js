import React, {Component} from 'react';
import {geolocated} from "react-geolocated";
import {Link} from "react-router-dom";
import Label from "./Label";

const axios = require("axios").default;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }

    async search(event) {
        const query = event.target.value;
        if (query.length === 0) {
            this.setState({results: []});
            this.locationSuggestions();
            return;
        }
        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?name=' + query
        );
        this.setState({results: response.data});
    }

    async locationSuggestions() {

        // showing all for demonstration purposes
        let response = await axios.get('https://api.memoryclip.hannsadrian.de/query?all=true');
        this.setState({results: response.data});

        /*if (!this.props) {
            return;
        }

        if (!this.props.coords) {
            setTimeout(this.locationSuggestions, 100);
            return;
        }

        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
            let longitude = this.props.coords.longitude;
            let latitude = this.props.coords.latitude;
            console.log('lat=' + latitude + "&lng=" + longitude);

            let response = await axios.get(
                'https://api.memoryclip.hannsadrian.de/query?lat=' + latitude + "&lng=" + longitude
            );
            this.setState({results: response.data});
        }*/
    }

    componentDidMount() {
        this.locationSuggestions();
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-100 pt-10 px-6 sm:pl-32 sm:pt-20">
                <h1 className="text-2xl font-medium select-none">📚 Memory<span className="font-bold">CLIP</span></h1>
                <p className="text-gray-900">Dieses Projekt bietet eine frei wählbare Erinnerung<br/>
                    an die Bombardierung Dresdens.</p>
                <input onChange={this.search.bind(this)} placeholder="Ort suchen"
                       className="select-none mt-4 mb-2 p-2 px-3 max-w-md bg-gray-100 rounded w-full border-1pt border-gray-400 shadow-lg outline-none focus:outline-none focus:border-blue-600 trans"/>
                <div className="mb-6 max-w-md">
                    {this.state.results.map((val, index) => (
                        <Link to={"/article/"+val.id}>
                            <div key={index}
                                 className="select-none flex my-2 pl-1 p-2 bg-gray-100 border-gray-400 rounded cursor-pointer border-1px shadow hover:shadow-md trans">
                                <div className="w-10 h-10 my-auto mx-2 rounded-full"
                                     style={{backgroundImage: 'url(' + val.img[0] + ')', backgroundSize: 'cover'}}
                                />
                                <div className="w-9/12">
                                    <h2 className="text-lg font-semibold">{val.name}</h2>
                                    <p className="text-sm truncate">{val.article}</p>
                                    <Label type={val.type}/>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default geolocated({
    userDecisionTimeout: 5000
})(Home);
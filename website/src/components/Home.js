import React, {Component} from 'react';

const axios = require("axios").default;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }

    async search(event) {
        console.log(event.target.value)
        const query = event.target.value;
        if (query.length === 0) {
            this.setState({results: []});
            //this.locationSuggestions();
            return;
        }
        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?name=' + query
        );
        this.setState({results: response.data});
    }

    async locationSuggestions() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?lat=' + location.coords.latitude + "&lng=" + location.coords.longitude
        );
        this.setState({results: response.data});
    }

    componentDidMount() {
        //this.locationSuggestions();
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-200 pt-10 px-6 sm:pl-32 sm:pt-20">
                <h1 className="text-2xl font-medium">📚 Memory<span className="font-bold">CLIP</span></h1>
                <p className="text-gray-900">Dieses Projekt soll eine frei wählbare Erinnerung an möglichst<br/>
                    vielen Orten in Bezug auf die Bombardierung Dresdens bieten.</p>
                <input onChange={this.search.bind(this)} placeholder="Ort suchen"
                       className="mt-4 mb-2 p-2 max-w-xs w-full outline-none focus:outline-none focus:shadow-outline trans rounded-lg"/>
                <div>
                    {this.state.results.map((val, index) => (
                        <div key={index} className="flex my-2 pl-1 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-white trans-faster max-w-sm">
                            <div className="w-10 h-10 my-auto mx-2 rounded-full"
                               style={{backgroundImage: 'url(' + val.img[0] + ')', backgroundSize: 'cover'}}
                            />
                            <div className="w-9/12">
                                <h2 className="text-lg font-semibold">{val.name}</h2>
                                <p className="text-sm truncate">{val.article}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
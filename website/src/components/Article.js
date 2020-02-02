import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Label from "./Label";
import ImpressPrivacy from "./ImpressPrivacyButton";

const axios = require("axios").default;

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    async componentDidMount() {
        const articles = await axios.get('https://api.memoryclip.hannsadrian.de/entry?id=' + this.props.match.params.id);
        this.setState({articles: articles.data});
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-100 pt-10 px-6 sm:pl-32 sm:pt-12">
                <div className="max-w-xl pb-32">
                    <Link to="/"><p className="uppercase text-sm font-semibold mb-3 hover:text-blue-600 trans-fast">{"<- Zurück"}</p></Link>
                    {this.state.articles.map((article, index) => (
                        <>
                            <img className="rounded-lg mb-6 w-full" src={article.img[0]} alt=""/>
                            <Label type={article.type}/>
                            <h1 className="text-2xl font-medium mb-1">{article.name}</h1>
                            <p className="text-gray-900">{article.article}</p>
                            <div className="my-6">
                                <p>
                                    <a className="p-2 rounded border-1px border-gray-400 shadow hover:shadow-md trans"
                                       href={"https://maps.apple.com/?dirflg=w&daddr=" + article.coordinates.lat + "," + article.coordinates.lng}
                                       target="_blank" rel="noopener noreferrer"
                                    >
                                        Auf Karte anzeigen
                                    </a>
                                </p>

                                {!!article.link ?
                                    <>
                                        <p className="mt-5">
                                            <a
                                                className="p-2 rounded border-1px border-gray-400 shadow hover:shadow-md trans truncate"
                                                href={article.link.ref}
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                {article.link.name}
                                            </a>
                                        </p>
                                    </>
                                    : <></>
                                }
                            </div>
                        </>
                    ))}
                    <ImpressPrivacy/>
                </div>
            </div>
        );
    }
}

export default Article;
import React, {Component} from 'react';

class Label extends Component {
    render() {
        return (
            <span
                className={(this.props.type.includes("building") ? "bg-blue-200 text-blue-700 border-blue-300"
                        : this.props.type.includes("stolperstein") ? "bg-orange-200 text-orange-700 border-orange-300"
                            : this.props.type.includes("depot") ? "bg-green-200 text-green-700 border-green-300"
                                : this.props.type.includes("place") ? "bg-purple-200 text-purple-700 border-purple-300"
                                    : "bg-gray-200 text-gray-700 border-gray-300"
                ) + " mt-1 border-1px rounded text-sm px-1 mr-auto"}>{this.props.type.replace("building", "Gebäude").replace("place", "Platz").replace("depot", "Mahndepot").replace("stolperstein", "Stolperstein")}</span>
        );
    }
}

export default Label;
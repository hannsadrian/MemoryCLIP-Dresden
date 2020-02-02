import React, {Component} from "react";
import {Link} from "react-router-dom";

class ImpressPrivacy extends Component {
    render() {
        return (
            <div className={"text-left pb-5 " + (this.props.centered ? "justify-center" : this.props.inline ? "w-auto mb-0 flex-none relative" : "") + " " + this.props.className}>
                <Link to={"/impressprivacy"}><button className="italic focus:outline-none text-gray-600">impressum & datenschutz</button></Link>
            </div>
        );
    }
}

export default ImpressPrivacy;
import React, {Component} from "react";
import "./header.css"


export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="header shadow">
            <span className="logo-div">
              <a href={"/"}> <img src={'/images/logo.png'} className='logo-image'/></a>
            </span>
            <div className='header-right'>
                <ul className='menu-items'>
                    <li>
                        Log In
                    </li>
                    <li>
                        About Us
                    </li>
                </ul>
            </div>
        </div>
    }

}

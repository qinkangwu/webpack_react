import './hello.css';
import './hello.scss';
import React, {Component} from 'react';

let style={
    backgroundColor:'blue'
}

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h1 style={style}>Hello world</h1>
                <img/>
            </div>
        )
    }
}
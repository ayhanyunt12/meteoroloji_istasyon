import React from 'react';
import SearchBar from './SearchBar';
import '../../../css/style.css'

const Demo = (props) => (
    <div className="page-wrapper">
        <div className="container">
            <SearchBar onChange={props.onChange}/>
        </div>
    </div>
);

export default Demo;
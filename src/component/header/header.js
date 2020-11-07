import React from 'react';
import './app-header.css'

const Header = ({like, allPosts}) => {
    return (
        <div className="app-header d-flex">
            <h1>Ilyas Gamidov</h1>
            <h2>{allPosts} записей, из них понравилось {like}</h2>
        </div>
    )
};

export default Header;
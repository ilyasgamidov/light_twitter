import React, { Component } from 'react';
import './post-list-item.css';

export default class PostListItem extends Component {

    state = {
        important: false,
        like: false
    };

    onImportant = () => {
        this.setState(({important}) => ({
            important: !important
        }))
    };

    onLike = () => {
        this.setState(({like}) => ({
            like: !like
        }))
    };

    render() {

        const {label, onDelete, important, like, onToggleLike, onToggleImportant} = this.props;

        let className = 'app-list-item d-flex justify-content-between';

        if (important) {
            className += ' important'
        }

        if (like) {
            className += ' like'
        }

        return (
            <div className={className}>
                <span className="app-list-item-label"
                onClick={onToggleLike}>
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-star btn-sm"
                    onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button className="btn-trash btn-sm"
                    onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}

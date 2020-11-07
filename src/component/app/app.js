import React, { Component } from 'react';
import Header from '../header/header';
import SearchPanel from '../search-panel/search';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAdd from '../post-add/post-add';

import './app.css'

export default class App extends Component{

    state = {
        data: [
            {label: "React Elements", important: false, like: false, id: 1},
            {label: "React Components", important: false, like: false, id: 2},
            {label: "React State", important: false, like: false, id: 3}
        ],
        term: '',
        filter: 'all'
    };

    maxId = 4;

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    };

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const old = data[index];
            const newLike = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newLike, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    };

    onToggleLike = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const old = data[index];
            const newLike = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newLike, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    };

    searchPosts = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1;
        })
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdataSearch = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }
    
    render() {
        const {data, term, filter} = this.state;
        const like = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPosts(data, term), filter);

        return (
            <div className="app">
                <Header 
                like={like} 
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdataSearch={this.onUpdataSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLike={this.onToggleLike} />
                <PostAdd 
                onAdd={this.addItem} />
            </div>
        )
    }
};


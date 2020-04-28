import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log(values)
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} i calculated {this.state.values[key]}
                </div>
            )
        }
        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>enter your index:</label>
                    <input
                        value={this.state.index} onChange={e => this.setState({ index: e.target.value })} />
                    <button>submit</button>
                </form>
                <h3>indexes i have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>calculated values:</h3>
                {this.renderValues()}
            </div>
        )
    }

};

export default Fib;
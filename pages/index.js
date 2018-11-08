import React, { Component } from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import io from 'socket.io-client';

class Index extends Component {
  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    this.socket = io();
    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data);
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data.message] });
  };

  sendMessage = e => {
    e.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      message: this.state.message
    });
    this.setState({ message: '' });
  };

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div
        className="ui form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          className="ui container"
          style={{
            minHeight: 200,
            height: '100%'
          }}
        >
          {this.state.messages.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
        <div className="ui divider" />
        <div className="fields">
          <div className="twelve wide field">
            <textarea
              style={{
                boxSizing: 'border-box',
                height: 'initial',
                minHeight: 'initial'
              }}
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
          <div className="four width field">
            <button className="ui button" onClick={this.sendMessage}>
              send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostActiveUser: null
    };
    this.fetch = this.fetch.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/api/dashboard/mostactiveuser')
      .then(response => {
        console.log(response);
      });
  }

  render() {

    return (
      <div>
        <h1>Dashboard</h1>
        <h2>Most Active User:{this.state.mostActiveUser}</h2>
        <p>- user that viewed the most stories</p>
      </div>
    );
  }
}

export default Dashboard;

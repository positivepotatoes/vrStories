import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostActiveUser: null,
      mostPopularStory: null
    };
    this.fetch = this.fetch.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    var context = this;
    axios.get('/api/dashboard/mostactiveuser')
      .then(response => {
        context.setState({
          mostActiveUser: response.data.first + response.data.last
        });
      });
    // axios.get('/api/dashboard/mos')
    //   .then(response => {
    //     context.setState({
    //       mostPopularStory: response.data
    //     })
    //   });
  }

  render() {

    return (
      <div>
        <h1>🚀 Dashboard 🚀</h1>
        <h4>User that viewed the most stories: {this.state.mostActiveUser}</h4>
        <h4>💥 Most Popular Story: {this.state.mostPopularStory}💥</h4>
      </div>
    );
  }
}

export default Dashboard;

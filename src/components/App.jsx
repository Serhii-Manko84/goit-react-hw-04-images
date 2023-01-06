import { Component } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import css from './App.module.css';

export class App extends Component {
  state = {
    guery: '',
  };
  componentDidUpdate(prevProps, prevState) {}

  getSearchRequest = query => this.setState({ query });

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.getSearchRequest} />
        Ваш ключ API:31784289-8c5c8bddae77d61fff616be96{' '}
      </div>
    );
  }
}

import { Component } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = event => {
    this.setState({ query: event.currentTarget.value });
  };

  onSubmitForm = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('Specify the query parameters');
      return;
    }
    onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}

// Searchbar.prototype = {
//   onSubmit: PropTypes.func.isRequired,
// };

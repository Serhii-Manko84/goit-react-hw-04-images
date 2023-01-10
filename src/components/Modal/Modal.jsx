import { Component } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdrop = event => {
    console.log(event.target, 'target');
    console.log(event.currentTarget, 'CurrentTarget');

    if (event.currentTarget === event.target) {
      //   console.log(event.target);
      //   console.log(event.currentTarget);
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.handleBackdrop}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      document.querySelector('#portal')
    );
  }
}

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
};

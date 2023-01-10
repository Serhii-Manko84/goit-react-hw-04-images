import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onToggleModal = () => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen }));
  };

  render() {
    return (
      <li className={css.item}>
        <img
          className={css.image}
          src={this.props.webformatURL}
          alt=""
          onClick={this.onToggleModal}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            onClose={this.onToggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

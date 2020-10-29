import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CardList from './CardList';

import styles from '../css/listSlider.module.css';

function ListSlider({ stations }) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {stations.map((station) => {
          return <CardList key={station.id} {...station} />;
        })}
        {'  '}
      </Slider>
    </div>
  );
}

ListSlider.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListSlider;

import React, { createRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CardList from './CardList';

import styles from '../css/listSlider.module.css';

function ListSlider({ stations }) {
  const sliderRef = createRef();
  const scroll = useCallback(
    (y) => {
      if (y > 0) {
        return sliderRef.current.slickNext();
      }
      return sliderRef.current.slickPrev();
    },
    [sliderRef]
  );

  useEffect(() => {
    window.addEventListener('wheel', (e) => {
      scroll(e.deltaY);
    });
  });

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    draggable: true,
  };

  // const slide = (y) => {
  //   const { current } = slider;
  //   return y > 0 ? current.slickNext() : current.slickPrev();
  // };

  // useEffect(() => {
  //   window.addEventListener('wheel', (e) => {
  //     slide(e.wheelDelta);
  //   });
  // }, []);

  return (
    <div className={styles.container}>
      <Slider ref={sliderRef} {...settings} className={styles.slider}>
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

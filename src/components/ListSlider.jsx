import React, { useRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CardList from './CardList';

import styles from '../css/listSlider.module.css';

function ListSlider({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
  handleRoutingControl,
  display,
}) {
  const sliderRef = useRef();
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
    window.addEventListener('scroll', (e) => {
      e.stopPropagation();
      scroll(e.deltaY);
    });
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    draggable: true,
  };

  return (
    <div className={styles.container}>
      <Slider ref={sliderRef} className={styles.slider} {...settings}>
        {stations
          .filter((station) => {
            if (bankingIsChecked) {
              return station.banking === 'True';
            }
            return station;
          })
          .filter((station) => {
            if (bikesIsChecked) {
              return station.availableBikes > 0;
            }
            return station;
          })
          .filter((station) => {
            if (standsIsChecked) {
              return station.availableBikeStand > 0;
            }
            return station;
          })
          .map((station) => {
            return (
              <CardList
                key={station.id}
                station={station}
                handleRoutingControl={handleRoutingControl}
                display={display}
              />
            );
          })}
      </Slider>
    </div>
  );
}

ListSlider.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleRoutingControl: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};

export default ListSlider;

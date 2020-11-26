import React from 'react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import CardList from './CardList';

import '../css/listSlider.css';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Scrollbar, Mousewheel]);

function ListSlider({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
  handleRoutingControl,
  display,
}) {
  return (
    <div className="container">
      <Swiper
        className="slider"
        direction="vertical"
        mousewheel
        scrollbar={{ draggable: true }}
        spaceBetween={50}
        slidesPerView={3}
      >
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
              <SwiperSlide key={station.id}>
                <CardList
                  station={station}
                  handleRoutingControl={handleRoutingControl}
                  display={display}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
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

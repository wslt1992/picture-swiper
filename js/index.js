// import 'babel-polyfill';
import '../css/index.scss';
import "normalize.css";
import "../../semantic/dist/semantic.css";
import "layui-src/dist/css/layui.css";
import "layui-src/dist/css/layui.mobile.css";

import "layui-src/dist/layui.all";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';

import './autoWidth';
window.reset_vw_base(780);


var galleryTop = new Swiper('.gallery-top', {
  // spaceBetween: 100,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 5,
  // slidesPerGroup: 3,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  freeMode: true,
  // by: 'container',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;


  
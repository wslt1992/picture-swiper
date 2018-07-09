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

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
      document.body.style.display = "block";
      // console.log("加载完成");
  } else {
      document.body.style.display = "none";
  }
};
// var mySwiper1 = new Swiper('.swiper-container1', {
//   autoplay: true,//可选选项，自动滑动
//   loop : true,
//   pagination: {
//     el: '.swiper-pagination',
//   },
  
// });
// var mySwiper2 = new Swiper('.swiper-container2', {
//   grabCursor:true,
//   autoplay: true,//可选选项，自动滑动
//   loop : true,
//   pagination: {
//     el: '.swiper-pagination',
//   },
//   controller: {
//     control:mySwiper1,
//     inverse: true,
//   },
// });
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  centeredSlides: true,
  // slidesPerView: 'auto',
  touchRatio: 0.2,
  slideToClickedSlide: true,
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;
  // layui.use('carousel', function(){
  //   var carousel = layui.carousel;
  //   //建造实例
  //   carousel.render({
  //     elem: '#test1'
  //     ,width: '100%' //设置容器宽度
  //     ,arrow: 'always' //始终显示箭头
  //     //,anim: 'updown' //切换动画方式
  //   });
  // });

  
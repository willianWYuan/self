<template lang="pug">
  .swiper-container
    .swiper-wrapper
      .swiper-slide(v-for='item in photoList' v-bind:mid='item.mid' v-bind:key='item.mid')
        img(v-bind:src='item.img')

    .swiper-pagination
    .swiper-button-prev
    .swiper-button-next
</template>

<script>
  import Swiper from "swiper"
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'carrousel',
    data() {
      return {
        photoList: [{
          mid: 1,
          img: require('../assets/img/timg01.jpg')
        }, {
          mid: 4,
          img: require('../assets/img/timg02.jpg')
        }, {
          mid: 5,
          img: require('../assets/img/timg03.jpg')
        }]
      }
    },
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        speed: 600,
        autoplay: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        onTouchEnd: function() {
          swiper.startAutoplay()
        }
      });
      console.log(swiper);
    }
  }
</script>

<style lang="sass">
  .swiper-container 
    width: 100%;
    height: 400px;
  
  .swiper-container-autoheight .swiper-slide
    text-align: center;
    font-size: 18px;
    height: 400px;
    background: #fff;
    display: -webkit-box;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
  
</style>

<template>
  <div>
     <ul class="cb-slideshow">
        <li><div>3</div></li>
        <li><div>2</div></li>
        <li><div>1</div></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'counter',
  props: {
    counter: Object
  },
  mounted () {
    let $this = this
    setTimeout(function () {
      $this.counter.value = false
    }, 2900)
  }
}
</script>

<style scoped>
.cb-slideshow {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
    list-style-type: none;
}
.cb-slideshow li div {
    color: white;
    z-index: 1000;
    position: absolute;
    top:45%;
    bottom:0;
    left: 0;
    width: 100%;
    text-align: center;
    opacity: 0;
    line-height: 100%;
    -webkit-animation: titleAnimation 9s linear infinite 0s;
    -moz-animation: titleAnimation 9s linear infinite 0s;
    -o-animation: titleAnimation 9s linear infinite 0s;
    -ms-animation: titleAnimation 9s linear infinite 0s;
    animation: titleAnimation 9s linear infinite 0s;
}
.cb-slideshow li div h3 {
    font-family: 'BebasNeueRegular', 'Arial Narrow', Arial, sans-serif;
    font-size: 240px;
    padding: 0;
    line-height: 200px;
	color: rgba(169,3,41, 0.8);
}
.cb-slideshow li:nth-child(1) span {
}
.cb-slideshow li:nth-child(2) span {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    -o-animation-delay: 1s;
    -ms-animation-delay: 1s;
    animation-delay: 1s;
}
.cb-slideshow li:nth-child(3) span {
    /*background-image: url(../img/3.jpg);*/
    -webkit-animation-delay: 2s;
    -moz-animation-delay: 2s;
    -o-animation-delay: 2s;
    -ms-animation-delay: 2s;
    animation-delay: 2s;
}
.cb-slideshow li:nth-child(4) span {
    /*background-image: url(../img/4.jpg);*/
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    -ms-animation-delay: 3s;
    animation-delay: 3s;
}
.cb-slideshow li:nth-child(2) div {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    -o-animation-delay: 1s;
    -ms-animation-delay: 1s;
    animation-delay: 1s;
}
.cb-slideshow li:nth-child(3) div {
    -webkit-animation-delay: 2s;
    -moz-animation-delay: 2s;
    -o-animation-delay: 2s;
    -ms-animation-delay: 2s;
    animation-delay: 2s;
}
.cb-slideshow li:nth-child(4) div {
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    -ms-animation-delay: 3s;
    animation-delay: 3s;
}
/* Animation for the title */
@-webkit-keyframes titleAnimation {
	0% {
	    opacity: 0;
      font-size: 300px;
	    -webkit-transform: translateY(0);
	}
	6% {
    font-size: 30px;
	    opacity: 1;
	    -webkit-transform: translateY(0px);
	}
	8% {
      font-size: 70px;
	    opacity: 1;
	    -webkit-transform: scale(1);
	}
	15% { opacity: 0 }
	25% {
	    opacity: 0;
	    -webkit-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-moz-keyframes titleAnimation {
	0% {
	    opacity: 0;
	    -moz-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -moz-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -moz-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -moz-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-o-keyframes titleAnimation {
	0% {
	    opacity: 0;
	    -o-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -o-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -o-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -o-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-ms-keyframes titleAnimation {
	0% {
	    opacity: 0;
      font-size: 300px;
	    -ms-transform: translateY(0);
	}
	8% {
	    opacity: 1;
      font-size: 70px;
	    -ms-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
      font-size: 70px;
	    -ms-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -webkit-transform: scale(10);
	}
	100% { opacity: 0 }
}
@keyframes titleAnimation {
	0% {
	    opacity: 0;
      font-size: 2000px;
	}
	5% {
	    opacity: 1;
      font-size: 300px;
	}
	11% {
	    opacity: 1;
      font-size: 10px;
	}
	18% {
    font-size: 1px;
    opacity: 0
	}
  50% {
  }
  80% {
  }
	100% {
   }
}
/* Show at least something when animations not supported */
.no-cssanimations .cb-slideshow li span{
	opacity: 1;
}
@media screen and (max-width: 1140px) {
	.cb-slideshow li div h3 { font-size: 100px }
}
@media screen and (max-width: 600px) {
	.cb-slideshow li div h3 { font-size: 50px }
}

</style>

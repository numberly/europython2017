<template>
  <div>
    <div id="pikachu" v-if="counter > 4"></div>
    <div id="salameche" v-if="counter > 9"></div>
    <div id="carapuce" v-if="counter > 14"></div>
    <div id="bulbizarre" v-if="counter > 19"></div>
  </div>
</template>

<script>
export default {
  name: 'distractor',
  props: {
    counter: Number
  }
}
</script>

<style scoped>

/* pikachu */

#pikachu {
  width: 195px;
  height: 219px;
  background-image: url('../assets/img/zaza.png');
  position: fixed;
  z-index: 999;
  -webkit-animation-name: pikachu;
  -webkit-animation-duration: 4s;
  animation-name: pikachu;
  animation-duration: 4s;
  animation-iteration-count: 100;
}
  /* Chrome, Safari, Opera */
  @-webkit-keyframes pikachu {
      0% {left:0px; top:0px;}
      10% {left:147px; top:16px;}
      20% {left:674px; top:163px;}
      30% {left:34px; top:487px;}
      40% {left:793px; top:130px;}
      50% {left:219px; top:452px;}
      60% {left:318px; top:427px;}
      70% {left:872px; top:25px;}
      80% {left:497px; top:218px;}
      90% {left:221px; top:71px;}
      100% {left:0px; top:0px;}
  }

  @-webkit-keyframes pikachu-hz {
      0% {top:0px; left:0px;}
      10% {top:147px; left:16px;}
      20% {top:674px; left:163px;}
      30% {top:34px; left:487px;}
      40% {top:793px; left:130px;}
      50% {top:219px; left:452px;}
      60% {top:318px; left:427px;}
      70% {top:872px; left:25px;}
      80% {top:497px; left:218px;}
      90% {top:221px; left:71px;}
      100% {top:0px; left:0px;}
  }

  @media all and (orientation:portrait) {
  }

  #salameche {
    width: 152px;
    height: 168px;
    background-image: url('../assets/img/trotrotromp.png');
    position: absolute;
    -webkit-animation-name: salameche; /* Chrome, Safari, Opera */
    -webkit-animation-duration: 4s; /* Chrome, Safari, Opera */
    animation-name: salameche;
    animation-duration: 4s;
    animation-iteration-count: 100;
  }

  @-webkit-keyframes salameche {
      0% {left:851px; top:25px;}
      10% {left:612px; top:585px;}
      20% {left:319px; top:401px;}
      30% {left:182px; top:200px;}
      40% {left:877px; top:328px;}
      50% {left:342px; top:599px;}
      60% {left:821px; top:181px;}
      70% {left:482px; top:425px;}
      80% {left:60px; top:247px;}
      90% {left:573px; top:127px;}
      100% {left:851px; top:25px;}
  }

  @-webkit-keyframes salameche-hz {
      0% {top:851px; left:25px;}
      10% {top:612px; left:585px;}
      20% {top:319px; left:401px;}
      30% {top:182px; left:200px;}
      40% {top:877px; left:328px;}
      50% {top:342px; left:599px;}
      60% {top:821px; left:181px;}
      70% {top:482px; left:425px;}
      80% {top:60px; left:247px;}
      90% {top:573px; left:127px;}
      100% {top:851px; left:25px;}
  }

#carapuce{
  width: 124px;
  height: 187px;
  background-image: url('../assets/img/trotrorol.png');
  position: fixed;
  -webkit-animation-duration: 4s; /* Chrome, Safari, Opera */
  -webkit-animation-name: carapuce; /* Chrome, Safari, Opera */
  animation-name: carapuce;
  animation-duration: 4s;
  animation-iteration-count: 100;
}

@-webkit-keyframes carapuce {
    0% {left:483px; top:166px;}
    10% {left:163px; top:424px;}
    20% {left:929px; top:368px;}
    30% {left:200px; top:167px;}
    40% {left:900px; top:104px;}
    50% {left:566px; top:298px;}
    60% {left:522px; top:215px;}
    70% {left:904px; top:102px;}
    80% {left:535px; top:515px;}
    90% {left:411px; top:189px;}
    100% {left:483px; top:166px;}
}

/* Standard syntax */
@keyframes carapuce-hz {
  0% {top:483px; left:166px;}
  10% {top:163px; left:424px;}
  20% {top:929px; left:368px;}
  30% {top:200px; left:167px;}
  40% {top:900px; left:104px;}
  50% {top:566px; left:298px;}
  60% {top:522px; left:215px;}
  70% {top:904px; left:102px;}
  80% {top:535px; left:515px;}
  90% {top:411px; left:189px;}
  100% {top:483px; left:166px;}
}

#bulbizarre{
  width: 242px;
  height: 147px;
  background-image: url('../assets/img/trotrodo2.png');
  position: fixed;
  -webkit-animation-duration: 4s; /* Chrome, Safari, Opera */
  -webkit-animation-name: bulbizarre; /* Chrome, Safari, Opera */
  animation-name: bulbizarre;
  animation-duration: 4s;
  animation-iteration-count: 100;
}

@-webkit-keyframes bulbizarre {
    0% {left:922px; top:203px;}
    10% {left:121px; top:577px;}
    20% {left:800px; top:292px;}
    30% {left:245px; top:55px;}
    40% {left:503px; top:492px;}
    50% {left:328px; top:156px;}
    60% {left:253px; top:138px;}
    70% {left:73px; top:87px;}
    80% {left:264px; top:573px;}
    90% {left:408px; top:522px;}
    100% {left:922px; top:203px;}
}

@keyframes bulbizarre-hz {
  0% {top:922px; left:203px;}
  10% {top:121px; left:577px;}
  20% {top:800px; left:292px;}
  30% {top:245px; left:55px;}
  40% {top:503px; left:492px;}
  50% {top:328px; left:156px;}
  60% {top:253px; left:138px;}
  70% {top:73px; left:87px;}
  80% {top:264px; left:573px;}
  90% {top:408px; left:522px;}
  100% {top:922px; left:203px;}
}

@media all and (orientation:portrait) {
  #bulbizarre {
    -webkit-animation-name: bulbizarre-hz; /* Chrome, Safari, Opera */
    animation-name: bulbizarre-hz;
  }

  #carapuce {
    -webkit-animation-name: carapuce-hz; /* Chrome, Safari, Opera */
    animation-name: carapuce-hz;
  }

  #pikachu {
    -webkit-animation-name: pikachu-hz; /* Chrome, Safari, Opera */
    animation-name: pikachu-hz;
  }

  #salameche {
    -webkit-animation-name: salameche-hz; /* Chrome, Safari, Opera */
    animation-name: salameche-hz;
  }
}

</style>

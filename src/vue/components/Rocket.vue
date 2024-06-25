<script setup lang="ts">
defineOptions({
  name: 'Rocket',
});

defineProps<{
  img?: string;
  fly?: boolean;
}>();
</script>

<template>
  <div class="Rocket" :class="{ 'is-fly': fly }">
    <div class="Rocket__antenna" />
    <div class="Rocket__body" />
    <div class="Rocket__window" :class="{ 'has-gloss': !img }">
      <img v-if="img" :src="img">
    </div>
    <div class="Rocket__fins" />
    <div class="Rocket__pipe" />
    <div class="Rocket__flamethrower">
      <div class="Rocket__flames">
        <i v-for="i in 'abcdef'" :key="i" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Rocket,
.Rocket * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.Rocket {
  position: relative;
  top: 150px;
  left: calc(50% - 100px);
  width: 200px;
  height: 300px;
}

.Rocket.is-fly {
  animation: anim-fly 6s ease-in-out 0s infinite alternate none;
}

.Rocket__antenna {
  position: absolute;
  width: 4px;
  height: 60px;
  background-color: #ebecf0;
  transform: translate(98px, -100%);
}
.Rocket__antenna:before {
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  width: 16px;
  height: 16px;
  background-color: #ebecf0;
  border-radius: 100%;
  box-shadow: inset -3px -3px 0 #e1e2e6;
  transform: translate(-50%, 0);
  content: " ";
}

.Rocket__body {
  position: absolute;
  z-index: 1;
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-color: #ebecf0;
  border-radius: 100%;
  box-shadow: inset -33px -33px 0 rgba(#e4e6e1, 60%);
  transform: scale(0.46, 1) translateX(-108px);
}
.Rocket__body:before {
  position: absolute;
  display: block;
  width: 100%;
  height: 285px;
  background-color: #ff9991;
  border-radius: 300px;
  transform: translateY(-60%) scale(.9, .46);
  content: " ";
}

.Rocket__window {
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background-color: #f5f6ff;
  border: 6px solid #d7d8dc;
  border-radius: 100%;
  transform: translate(80px, 110px);
}
.Rocket__window img {
  width: 28px;
}
.Rocket__window.has-gloss:before,
.Rocket__window.has-gloss:after {
  position: absolute;
  top: -50%;
  right: 3px;
  display: block;
  width: 5px;
  height: 60px;
  background-color: rgba(#fff, 30%);
  transform: rotate(45deg);
  content: " ";
}
.Rocket__window.has-gloss:before {
  right: 13px;
}

.Rocket__fins {
  position: absolute;
  transform: translate(50px, 60px);
}
.Rocket__fins:before,
.Rocket__fins:after {
  position: absolute;
  display: block;
  height: 56px;
  border-top: 140px solid transparent;
  border-bottom: 20px solid transparent;
  content: " ";
}
.Rocket__fins:before {
  border-right: 100px solid #ff9991;
  transform: translate(-50%, 0);
}
.Rocket__fins:after {
  border-left: 100px solid #ff9991;
  transform: translate(50%, 0);
}

.Rocket__pipe {
  position: absolute;
  z-index: 2;
  width: 80px;
  height: 10px;
  border-top: 30px solid #82868a;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  transform: translate(60px, 270px);
}
.Rocket__pipe:before {
  position: absolute;
  top: -70px;
  left: -10px;
  display: block;
  width: 80px;
  height: 80px;
  background-color: #82868a;
  border-radius: 100%;
  transform: scale(1, .25);
  content: " ";
}
.Rocket__pipe:after {
  position: absolute;
  top: -30px;
  left: 1px;
  display: block;
  width: 60px;
  height: 60px;
  background-color: #787c80;
  border-radius: 100%;
  transform: scale(1, .15);
  content: " ";
}

.Rocket__flamethrower {
  position: absolute;
  z-index: 3;
  width: 60px;
  height: 500px;
  overflow: hidden;
  border-radius: 60px;
  transform: scale(1, .15) translate(70px, 560px);
}
.Rocket__flamethrower .Rocket__flames {
  width: 100%;
  height: 60px;
  margin-top: 140px;
  transform: scale(1, 6.67);
  opacity: .9;
}

.Rocket__flamethrower i {
  position: absolute;
  display: block;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
  transform-origin: top center;
  opacity: .8;
}

.Rocket__flamethrower i:nth-of-type(1) {
  z-index: -1;
  margin-left: 5px;
  border-top: 50px solid #ffbe64;
  animation-duration: .35s;
  animation-delay: 0s;
}

.Rocket__flamethrower i:nth-of-type(2) {
  z-index: 0;
  margin-left: 16px;
  border-top: 40px solid #ff8c64;
  animation-duration: .38s;
  animation-delay: -.5s;
}

.Rocket__flamethrower i:nth-of-type(3) {
  z-index: 1;
  margin-left: -6px;
  border-top: 30px solid #ffa064;
  animation-duration: .4s;
  animation-delay: -1s;
}

.Rocket__flamethrower i:nth-of-type(4) {
  z-index: -1;
  margin-left: 9px;
  border-top: 50px solid #ffc864;
  border-right-width: 20px;
  border-left-width: 20px;
  animation-duration: .55s;
  animation-delay: -1.2s;
}

.Rocket__flamethrower i:nth-of-type(5) {
  z-index: 2;
  margin-left: 14px;
  border-top: 35px solid #ffdc64;
  animation-duration: .25s;
  animation-delay: -1.2s;
}

.Rocket__flamethrower i:nth-of-type(6) {
  z-index: 2;
  margin-left: -6px;
  border-top: 35px solid #ffe66e;
  animation-duration: .25s;
  animation-delay: -1.2s;
}

.Rocket.is-fly .Rocket__flamethrower i {
  animation-name: anim-fire;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes anim-fly {
  100% { transform: translate(40px, 60px) rotate(41deg) }
  66% { transform: translate(-30px, -50px) rotate(50deg) }
  36% { transform: translate(50px, 40px) rotate(39deg) }
  0% { transform: translate(-40px, -30px) rotate(50deg) }
}

@keyframes anim-fire {
  100% { transform: skew(30deg) }
  74% { transform: skew(-15deg) }
  58% { transform: skew(10deg) }
  30% { transform: skew(-35deg) }
  0% { transform: skew(25deg) }
}
</style>

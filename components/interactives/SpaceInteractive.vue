<template>
  <div class="interactive">
    <svg>
      <g class="planets">
        <circle v-for="planet in planets"
          class="orbit" :r="planet.distance"></circle>
        <g v-for="planet in planets"
          class="planet"
          :style="{transform: 'translate('+position(planet).x+'px ,'+position(planet).y+'px)'}">
          <text class="text-background":dx="0" :dy="-planet.size - 2">{{ planet.name }}</text>
          <text :dx="0" :dy="-planet.size - 2">{{ planet.name }}</text>
          <circle :fill="planet.colour" :r="planet.size"></circle>
        </g>
      </g>
    </svg>
    <Slider v-model="time" :min="0" :max="365" :tip-format="dayFormat"></Slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      planets: [{
        name: 'Sun',
        orbitPeriod: 27,
        distance: 0,
        size: 50,
        colour: 'gold',
      }, {
        name: 'Mercury',
        orbitPeriod: 88,
        distance: 60,
        size: '10',
        colour: 'orange',
      }, {  
        name: 'Venus',
        orbitPeriod: 225,
        distance: 90,
        size: '15',
        colour: 'yellow',
      }, {
        name: 'Earth',
        orbitPeriod: 365,
        distance: 125,
        size: '18',
        colour: 'blue',
      }, {
        name: 'Mars',
        orbitPeriod: 687,
        distance: 160,
        size: '13',
        colour: 'red',
      }, {
        name: 'Jupiter',
        orbitPeriod: 4221,
        distance: 220,
        size: '40',
        colour: 'maroon',
      }, {
        name: 'Saturn',
        orbitPeriod: 10747,
        distance: 260,
        size: '35',
        colour: 'tan',
      }, {
        name: 'Uranus',
        orbitPeriod: 30589,
        distance: 300,
        size: '27',
        colour: 'cyan',
      }, {
        name: 'Neptune',
        orbitPeriod: 59800,
        distance: 340,
        size: '26',
        colour: 'teal',
      }],
    }
  },
  methods: {
    position(planet) {
      return {
        x: planet.distance * Math.cos(this.time/planet.orbitPeriod * Math.PI*2),
        y: planet.distance * Math.sin(this.time/planet.orbitPeriod * Math.PI*2),
      }
    },
    dayFormat(days) {
      return days+' days'
    },
  },
  watch: {
    time() {
      if (this.time >= 365)
        this.$parent.$emit('complete')
    }
  },
}
</script>

<style>
.interactive > svg {
  width: 100%;
  height: 100%;
  background-color: #221122;
}

.planets {
  transform: translate(360px, 140px);
}

.orbit {
  fill: none;
  stroke: #eeccee;
  stroke-width: 2px;
}

.text-background {
}

.text-background, .planet text {
  text-anchor: middle;
}
.planet text {
  fill: white
}
.text-background {
  fill: none;
  stroke: #221122;
  stroke-width: 5px;
}

.ivu-slider-wrap, .ivu-slider-bar {
  height: 22px;
  border-radius: 20px;
}

.ivu-slider-button-wrap, .ivu-slider-button {
  width: 30px;
  height: 30px;
}
</style>

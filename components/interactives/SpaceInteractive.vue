<template>
  <div class="interactive">
    <svg viewBox="0 0 720 300">
      <g class="planets">
        <circle v-for="planet in planets"
          class="orbit" :r="planet.distance"></circle>
        <path class="orbit-progress" :d="`M ${earth.distance} 0 A ${earth.distance} ${earth.distance} ${time/365*360} ${time/365 < 0.5 ? 0 : 1} 1 ${position(earth).x} ${position(earth).y}`"></path>
        <g v-for="planet in planets"
          class="planet"
          :style="{transform: 'translate('+position(planet).x+'px ,'+position(planet).y+'px)'}">
          <text class="text-background":dx="0" :dy="-planet.size - 2">{{ planet.name }}</text>
          <text :dx="0" :dy="-planet.size - 2">{{ planet.name }}</text>
          <image :href="require('~/assets/images/planets/'+planet.name+'.png')"
            :width="planet.size" :height="planet.size" :x="-planet.size/2" :y="-planet.size/2"></image>
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
  computed: {
    earth() {
      return this.planets.find(p => p.name == 'Earth')
    },
  },
}
</script>

<style>
.ivu-slider-wrap, .ivu-slider-bar {
  height: 16px;
  border-radius: 12px;
}

.ivu-slider-button-wrap, .ivu-slider-button {
  width: 24px;
  height: 24px;
}

.ivu-slider-bar {
  background-color: #49bd9a;
}

.ivu-slider-button {
  background-color: #49bd9a;
  border: 1px solid #49bd9a;
}

</style>


<style scoped>
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

.orbit-progress {
  fill: none;
  stroke: #49bd9a;
  stroke-width: 4px;
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

</style>

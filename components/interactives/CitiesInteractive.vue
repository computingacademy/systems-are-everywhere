<template>
  <div class="interactive">
    <svg viewBox="0 0 340 340">
      <image :href="require('~/assets/images/cities/australia-night.jpg')" width="340" height="340"></image>
      <g v-for="city in cities"
        :key="city.name"
        :class="{city: true, hidden: city.hidden}"
        :style="{transform: 'translate('+city.x+'px, '+city.y+'px)'}">
        <circle r="10"
          @click="city.hidden = false"></circle>
        <text text-anchor="middle" dy="25">{{ city.name }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [{
        name: 'Sydney',
        x: 300, y: 215,
        hidden: true,
      }, {
        name: 'Melbourne',
        x: 255, y: 245,
        hidden: true,
      }, {
        name: 'Brisbane',
        x: 315, y: 170,
        hidden: true,
      }, {
        name: 'Perth',
        x: 50, y: 205,
        hidden: true,
      }, {
        name: 'Adelaide',
        x: 210, y: 220,
        hidden: true,
      }, {
        name: 'Hobart',
        x: 275, y: 280,
        hidden: true,
      }, {
        name: 'Darwin',
        x: 155, y: 65,
        hidden: true,
      }, {
        name: 'Canberra',
        x: 285, y: 225,
        hidden: true,
      }],
    }
  },
  watch: {
    cities: {
      handler(cities) {
        if (cities.filter(city => !city.hidden).length >= 3)
          this.$parent.$emit('complete')
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
  background-color: #02031d;
}

.city circle {
  fill: #49bd9a;
}

.city.hidden text,
.city.hidden circle {
  fill: rgba(0,0,0,0);
}

.city text {
  fill: white;
}
</style>

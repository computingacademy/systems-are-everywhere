<template>
  <div class="interactive">
    <svg viewBox="0 0 415 340">
      <image :href="require('~/assets/images/cities/australia-night.jpg')" width="415" height="340"></image>
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
        x: 365, y: 230,
        hidden: true,
      }, {
        name: 'Melbourne',
        x: 315, y: 260,
        hidden: true,
      }, {
        name: 'Brisbane',
        x: 380, y: 170,
        hidden: true,
      }, {
        name: 'Perth',
        x: 55, y: 210,
        hidden: true,
      }, {
        name: 'Adelaide',
        x: 260, y: 235,
        hidden: true,
      }, {
        name: 'Hobart',
        x: 335, y: 310,
        hidden: true,
      }, {
        name: 'Darwin',
        x: 195, y: 40,
        hidden: true,
      }, {
        name: 'Canberra',
        x: 350, y: 240,
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

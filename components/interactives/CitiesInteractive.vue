<template>
  <div class="interactive">
    <div class="australia">
      <svg>
        <g v-for="city in cities"
          :class="{city: true, hidden: city.hidden}"
          :style="{transform: 'translate('+city.x+'px, '+city.y+'px)'}">
          <circle r="20"
            @click="city.hidden = false"></circle>
          <text dx="25" dy="5">{{ city.name }}</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [{
        name: 'Sydney',
        x: 520, y: 220,
        hidden: true,
      }, {
        name: 'Melbourne',
        x: 460, y: 260,
        hidden: true,
      }, {
        name: 'Brisbane',
        x: 530, y: 170,
        hidden: true,
      }, {
        name: 'Perth',
        x: 220, y: 210,
        hidden: true,
      }, {
        name: 'Adelaide',
        x: 410, y: 230,
        hidden: true,
      }, {
        name: 'Hobart',
        x: 480, y: 300,
        hidden: true,
      }, {
        name: 'Darwin',
        x: 340, y: 40,
        hidden: true,
      }, {
        name: 'Canberra',
        x: 500, y: 240,
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

<style>
.interactive {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin-bottom: 80px;
}

svg {
  width: 100%;
  height: 100%;
}

.australia {
  height: 100%;
  background-image: url('~assets/images/australia-night.jpg');
  background-color: #010220;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.city circle {
  fill: orange;
}

.city.hidden text,
.city.hidden circle {
  fill: rgba(0,0,0,0);
}

.city text {
  fill: white;
}
</style>

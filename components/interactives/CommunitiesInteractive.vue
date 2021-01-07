<template>
  <div class="interactive communities">
    <svg>
    </svg>
    <Slider v-model="level" :step="1" :min="0" :max="maxLevel" @input="zoom" show-tip="never"></Slider>
  </div>
</template>

<script>
import {getGeo} from 'geoplugin';
import circleChart from '~/assets/js/circle-packing'

export default {
  data() {
    return {
      level: 0,
      maxLevel: 100,
      states: [],
      suburbs: [],
    }
  },
  mounted() {
    let vm = this
    vm.chart = circleChart(vm.$el.querySelector('svg'))

    getGeo()
      .then(response => response.city)
      .catch(error => 'Adelaide')
      .then(vm.chart.zoomToCity)
      .then(() => this.chart.zoomToLevel(this.maxLevel-this.level))

    vm.chart.onZoom(event => {
      if (event.transform.k < 1)
        vm.$parent.$emit('complete')
    })

  },
  methods: {
    zoom(level) {
      this.chart.zoomToLevel(this.maxLevel-this.level+0.8)
    },
  },
}
</script>

<style>

.interactive.communities > svg {
  height: 100%;
  width: 100%;
  background-color: #ddaa88;
}

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

</style>

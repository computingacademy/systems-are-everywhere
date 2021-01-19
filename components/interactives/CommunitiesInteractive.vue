<template>
  <div class="interactive communities">
    <svg>
    </svg>
    <Slider v-model="level" :step="1" :min="0" :max="maxLevel" @input="zoom" show-tip="never"></Slider>
  </div>
</template>

<script>
import {getGeoByIp} from 'geoplugin';
import circleChart from '~/assets/js/circle-packing'

export default {
  data() {
    return {
      level: 50,
      maxLevel: 100,
      states: [],
      suburbs: [],
    }
  },
  mounted() {
    let vm = this
    vm.chart = circleChart(vm.$el.querySelector('svg'))

    let myIp = fetch(`https://api.ipify.org`)

    getGeoByIp(myIp)
      .then(response => 'Adelaide') // hack to ensure Adelaide is always in the centre
      .catch(error => 'Adelaide')
      .then(vm.chart.zoomToCity)
      .then(() => this.chart.zoomToLevel(this.maxLevel-this.level))

    var zoom_complete = false

    vm.chart.onZoom(event => {
      if (event.transform.k < 1 && zoom_complete && this.$parent.step == 0)
        vm.$parent.$emit('complete')
      if (event.transform.k > 100 && zoom_complete && this.$parent.step == 1)
        vm.$parent.$emit('complete')
      if (event.transform.k == 50 && !zoom_complete[0])
        zoom_complete = true
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

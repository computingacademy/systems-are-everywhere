<template>
  <div class="interactive">
    <svg>
    </svg>
  </div>
</template>

<script>
import {getGeo} from 'geoplugin';
import circleChart from '~/assets/js/circle-packing'

export default {
  data() {
    return {
      states: [],
      suburbs: [],
    }
  },
  mounted() {
    let vm = this
    let chart = circleChart(vm.$el.querySelector('svg'))

    getGeo()
      .then(response => response.city)
      .catch(error => 'Adelaide')
      .then(chart.zoomToCity)

    chart.onZoom(event => {
      if (event.transform.k < 1)
        vm.$parent.$emit('complete')
    })
  },
}
</script>

<style>
.interactive > svg {
  height: 100%;
  width: 100%;
  background-color: #ddaa88;
}
</style>

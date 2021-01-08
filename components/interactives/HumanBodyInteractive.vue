<template>
  <div class="interactive human-body">
    <div class="dragdrop body-systems-dragdrop">
      <div class="body-systems">
        <img class="body-system" id="finished" src="~/assets/images/human-body/Body_Whole.png">
        <DropZone class="blank-body" v-on:drop="addSystem($event)" snap="true" multiple="true" />
        <Draggable v-for="(system, index) in systems" :key="system.name"
          class="body-system" v-bind:value="system.name" element="div"
          :disabled="inBody(system)"
          :style="{zIndex: 100+system.index}"
          :spread="{from: [0.1, 0.5], to: [0.4, 0.8], index: index, count: systems.length}">
          <h3 v-if="!inBody(system)" style="text-align:right;overflow-x:visible;margin-left:100px;white-space:nowrap">
            {{ system.name }}
          </h3>
          <svg v-if="!inBody(system)" height="10" width="10" style="float:right;overflow:visible">
            <line x1="-45" y1="0" x2="115" y2="0" style="stroke:rgb(200,200,200);stroke-width:1" />
            <line x1="0" y1="0" x2="-10" y2="30" style="stroke:rgb(200,200,200);stroke-width:1" />
            <line x1="-10" y1="30" x2="-50" y2="30" style="stroke:rgb(200,200,200);stroke-width:1" />
          </svg>
          <img :src="require('~/assets/images/human-body/'+system.image)">
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systems: [
        {name: 'Muscle System', image: 'Body_Muscles.png', index: 0},
        {name: 'Skeletal System', image: 'Body_Skeletal.png', index: 1},
        {name: 'Cardiac System', image: 'Body_Cardiac.png', index: 2},
        {name: 'Nervous System', image: 'Body_Nervous.png', index: 3},
        {name: 'Digestive System', image: 'Body_Digestive.png', index: 4},
      ],
      body: [],
    }
  },
  methods: {
    addSystem(value) {
      this.body.push(value)
      if (this.body.length == this.systems.length) {
        this.$parent.$emit('complete')
        setTimeout(() => {
          // show complete body
          document.getElementById("finished").style.display = "inline-block";
          display: inline-block;
        }, 500)}
    },
    inBody(system) {
      return this.body.indexOf(system.name) !== -1
    },
  }
}
</script>

<style>
.human-body .body-systems-dragdrop {
  display: block;
}

.human-body .body-systems {
  display: flex;
  flex-direction: row;
}

.human-body .body-system {
  text-align: center;
  width: 170px;
  padding: 10px;
  z-index: 100;
  background: rgba(200,200,200, 0.1);
  /*box-shadow: 2px 2px 4px rgba(40,20,0, 0.2);*/
}

.human-body #finished {
  height: 270px;
  width: 130px;
  z-index: 110;
  margin-left: 200px;
  overflow: visible;
  display: none;
  background-color: white;
}

.human-body .body-system img {
  height: 260px;
}

.human-body .body-system h3 {
  font-size: 16px;
}

.human-body .blank-body {
  text-align: left;
  display: block;
  height: 270px;
  width: 170px;
  margin-right: 100px;
  margin-left: auto;
  background-color: white;
  background-image: url('~assets/images/human-body/Body_Empty.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid black;
}
.human-body .blank-body.hover {
  background: gold;
}
</style>

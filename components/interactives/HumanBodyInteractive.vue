<template>
  <div class="interactive">
    <div class="dragdrop body-systems-dragdrop">
      <div class="body-systems">
        <DropZone class="blank-body" v-on:drop="addSystem($event)" snap="true" multiple="true" />
        <Draggable v-for="(system, index) in systems"
          class="body-system" v-bind:value="system.name" element="div"
          :disabled="inBody(system)"
          :style="{zIndex: 100+system.index}"
          :spread="{from: [0.2, 0], to: [0.8, 1], index: index, count: systems.length}">
          <img :src="require('~/assets/images/human-body/'+system.image)">
          <h3 v-if="!inBody(system)">
            {{ system.name }}
          </h3>
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
        {name: 'Cardiac System', image: 'Body_Cardiac.png', index: 2},
        {name: 'Digestive System', image: 'Body_Digestive.png', index: 4},
        {name: 'Skeletal System', image: 'Body_Skeletal.png', index: 1},
        {name: 'Muscle System', image: 'Body_Muscles.png', index: 0},
        {name: 'Nervous System', image: 'Body_Nervous.png', index: 3},
      ],
      body: [],
    }
  },
  methods: {
    addSystem(value) {
      this.body.push(value)
      if (this.body.length == this.systems.length)
        this.$parent.$emit('complete')
    },
    inBody(system) {
      return this.body.indexOf(system.name) !== -1
    },
  }
}
</script>

<style>
.body-systems-dragdrop {
  display: block;
}

.body-systems {
  display: flex;
  flex-direction: row;
}

.body-system {
  text-align: center;
  width: 170px;
  padding: 10px;
  z-index: 100;
  background: rgba(40,20,0, 0.1);
  box-shadow: 2px 2px 4px rgba(40,20,0, 0.2);
}

.body-system img {
  height: 140px; 
}

.body-system h3 {
  font-size: 16px;
}

.blank-body {
  text-align: left;
  display: block;
  height: 180px;
  width: 170px;
  margin: auto;
  background: white;
  border: 2px solid black;
}
.blank-body.hover {
  background: gold;
}
</style>

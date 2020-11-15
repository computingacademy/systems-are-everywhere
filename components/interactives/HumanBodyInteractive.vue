<template>
  <div class="interactive">
    <div class="body-systems-dragdrop">
      <div class="body-systems">
        <DropZone class="blank-body" v-on:drop="addSystem(index, $event)" snap="true" />
        <Draggable v-for="(system, index) in systems"
          class="body-system" v-bind:value="system.name" element="div"
          :x="-20 + index*150" :y="index ==2 ? 120 : 0">
          <img :src="require('~/assets/images/human-body/'+system.image)">
          <h3>
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
        {name: 'Cardiac System', image: 'Body_Cardiac.png'},
        {name: 'Digestive System', image: 'Body_Digestive.png'},
        {name: 'Skeletal System', image: 'Body_Skeletal.png'},
        {name: 'Muscle System', image: 'Body_Muscles.png'},
        {name: 'Nervous System', image: 'Body_Nervous.png'},
      ],
      body: [],
    }
  },
  methods: {
    addSystem(index, value) {
      this.body.push(value)
      if (this.body.length == this.systems.length)
        this.$parent.$emit('complete')
    }
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
  padding: 10px;
  z-index: 100;
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
  width: 150px;
  margin: auto;
  background: white;
  border: 2px solid black;
}
.blank-body.hover {
  background: gold;
}
</style>

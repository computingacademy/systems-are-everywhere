<template>
  <div class="interactive recipes">
    <div class="dragdrop recipe-dragdrop">
      <div class="recipe-steps">
        <div v-for="(step, index) in steps" :key="step">
          <h2 class="subtitle step-position">{{index+1}}.</h2>
          <DropZone 
            class="blank-step" v-on:drop="addStep(index, $event)" v-on:leave="removeStep(index, $event)" snap="true" />
        </div>
      </div>
      <Draggable v-for="(step, index) in steps" :key="step.index"
        class="recipe-step" v-bind:value="step.index" element="div"
        :spread="{from: [0.8, 0.1], to: [0.8, 0.9], index: index, count: steps.length}">
        <img :src="require('~/assets/images/recipe/'+step.image)">
        {{ step.step }}
      </Draggable>
      <img id="finished" src="~/assets/images/recipe/Cake.png">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {index: 2, step: 'Pour into the cake tin', image: 'pour.png'},
        {index: 3, step: 'Bake the cake in the oven', image: 'oven.png'},
        {index: 1, step: 'Mix in the eggs and flour', image: 'flour_eggs.png'},
        {index: 0, step: 'Cream the butter and sugar', image: 'beater.png'},
        {index: 4, step: 'Ice the cake', image: 'icing.png'},
      ],
      blankSteps: [],
    }
  },
  methods: {
    addStep(index, value) {
      let blankSteps = this.blankSteps
      blankSteps[index] = value 
      let inOrder = this.steps.every((step, index) => blankSteps[index] == index)
      if (inOrder) {
        this.$parent.$emit('complete')
        setTimeout(() => {
          // show cake
          document.getElementById("finished").style.display = "inline-block";
          display: inline-block;
        }, 500)
      }
    },
    removeStep(index, value) {
      if (this.blankSteps[index] == value)
        this.blankSteps[index] = null 
    },
  }
}
</script>

<style>
.recipes #finished {
  width: 300px;
  height: 200px;
  z-index: 80;
  margin-left: 60px;
  margin-top: 40px;
  overflow: visible;
  display: none;
}

.recipes .step-position {
  display: inline-block;
  margin-top: 20px;
  height: 50px;
  float: left;
  margin-left: -30px;
}

.recipes .recipe-dragdrop {
  display: flex;
}

.recipes .recipe-steps {
  width: 300px;
  margin-left: 40px;
}

.recipes .recipe-step {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  width: 320px;

  font-size: 20px;
  background-color: white;
  box-shadow: -2px 2px 4px rgba(0,0,0, 0.3);
  z-index: 100;
}

.recipes .recipe-step img {
  margin-right: 8px;
  height: 40px;
}

.recipes .blank-step {
  display: block;
  height: 50px;
  width: 310px;
  background: white;
  border-bottom: 1px solid #999999;
}
.recipes .blank-step.hover {
  background: gold;
}
</style>

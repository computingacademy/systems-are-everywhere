<template>
  <div class="interactive recipes">
    <div class="dragdrop recipe-dragdrop">
      <div class="recipe-steps">
        <DropZone v-for="(step, index) in steps"  :key="step.index"
          class="blank-step" v-on:drop="addStep(index, $event)" v-on:leave="removeStep(index, $event)" snap="true" />
      </div>
      <Draggable v-for="(step, index) in steps" :key="step.index"
        class="recipe-step" v-bind:value="step.index" element="div"
        :spread="{from: [0.3, 0], to: [0.3, 0.6], index: index, count: steps.length}">
        <img :src="require('~/assets/images/recipe/'+step.image)">
        {{ step.step }}
      </Draggable>
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
      if (inOrder)
        this.$parent.$emit('complete')
    },
    removeStep(index, value) {
      if (this.blankSteps[index] == value)
        this.blankSteps[index] = null 
    },
  }
}
</script>

<style>
.recipes .recipe-dragdrop {
  display: flex;
}

.recipes .recipe-steps {
  width: 300px;
  margin: auto;
}

.recipes .recipe-step {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  padding: 4px;

  font-size: 20px;
  background-color: white;
  box-shadow: -2px 2px 4px rgba(0,0,0, 0.3);
  z-index: 100;
}

.recipes .recipe-step img {
  margin-right: 5px;
  height: 40px;
}

.recipes .blank-step {
  display: block;
  height: 50px;
  background: white;
  border: 2px solid black;
}
.recipes .blank-step.hover {
  background: gold;
}
</style>

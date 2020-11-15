<template>
  <div class="interactive">
    <div class="dragdrop">
      <div class="steps">
        <DropZone v-for="(step, index) in steps"
          class="blank-step" v-on:drop="addStep(index, $event)" snap="true" />
      </div>
      <Draggable v-for="(step, index) in steps"
        class="step" v-bind:value="step.index" element="div"
        v-bind:x="0 + index * 80" v-bind:y="180 + index*10">
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
        {index: 3, step: 'Pour into the cake tin'},
        {index: 2, step: 'Mix in the flour'},
        {index: 4, step: 'Bake the cake in the oven'},
        {index: 1, step: 'Mix in the eggs'},
        {index: 0, step: 'Cream the butter and sugar'},
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
    }
  }
}
</script>

<style>
.dragdrop {
  display: flex;
}

.steps {
  width: 100%;
}

.step {
  margin: 0px;
  font-size: 20px;
  color: darkred;
  background-color: white;
  box-shadow: -2px 2px 4px rgba(0,0,0, 0.3);
  z-index: 100;
}

.blank-step {
  text-align: left;
  display: block;
  height: 30px;
  background: white;
  border: 2px solid black;
}
.blank-step.hover {
  background: gold;
}
</style>

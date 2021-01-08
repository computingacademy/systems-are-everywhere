<template>
  <div class="interactive branches">
    <div class="dragdrop">
      <div class="branches matrix">
        <Draggable v-for="(picture, index) in pictures" :key="picture.image"
          :class="{picture: true, correct: picture.correct, incorrect: picture.correct == false}"
          v-bind:value="picture" element="div"
          :spread="{from: [0, 0.1], to: [0.3, 0.8], index: index, count: pictures.length}">
          <img :src="require('~/assets/images/branches/'+picture.image)">
        </Draggable>
        <DropZone v-for="system in systems" :key="system"
          class="system"
          v-on:drop="checkPicture(system, $event)"
          v-on:leave="resetPicture($event)">
          <span class="label">{{ system }}</span>
        </DropZone>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systems: ['rivers', 'vessels', 'lightning', 'trees'],
      pictures: [{
        system: 'rivers',
        image: 'branches-01.jpg',
      }, {
        system: 'trees',
        image: 'branches-02.jpg',
      }, {
        system: 'lightning',
        image: 'branches-03.jpg',
      }, {
        system: 'trees',
        image: 'branches-04.jpg',
      }, {
        system: 'vessels',
        image: 'branches-05.jpg',
      }, {
        system: 'rivers',
        image: 'branches-06.jpg',
      }, {
        system: 'vessels',
        image: 'branches-07.jpg',
      }, {
        system: 'lightning',
        image: 'branches-08.jpg',
      }],
    }
  },
  methods: {
    checkPicture(system, picture) {
      picture.correct = picture.system == system
      let allCorrect = this.pictures.every(picture => picture.correct)
        if (allCorrect)
          this.$parent.$emit('complete')
      this.$forceUpdate();
    },
    resetPicture(picture) {
      this.$set(picture, 'correct', undefined)
    },
  },
}
</script>

<style>
.interactive.branches .matrix {
  height: 300px;
  width: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 200px;
}

.branches .system {
  width: 50%;
  background: white;
  border: 2px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

}

.branches .system.hover {
  background: gold;
}

.branches .system .label {
  padding: 0px 5px;
  border-radius: 5px;

  font-size: 20px;
  font-weight: bold;
  color: #49bd9a;
  background-color: white;
  z-index: 30;
}

.branches .picture {
  padding: 0px;
  line-height: 0;
}

.branches .picture img {
  filter: grayscale(100%);
  border-radius: 30px;
}

.branches .correct img {
  filter: initial;
}
.branches .incorrect img {
  opacity: 0.5;
}
.branches .incorrect {
  background-color: red;
}
</style>

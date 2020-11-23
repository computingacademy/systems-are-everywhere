<template>
  <div class="interactive branches">
    <div class="dragdrop">
      <Draggable v-for="(picture, index) in pictures" :key="picture.image"
        :class="{picture: true, correct: picture.correct, incorrect: picture.correct == false}"
        v-bind:value="picture" element="div"
        :spread="{from: [0.3, 0.3], to: [0.7, 0.7], index: index, count: pictures.length}">
        <img :src="require('~/assets/images/branches/'+picture.image)">
      </Draggable>
      <DropZone v-for="system in systems"
        class="system"
        v-on:drop="checkPicture(system, $event)"
        v-on:leave="resetPicture($event)">
        <span class="label">{{ system }}</span>
      </DropZone>
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
      }],
    }
  },
  methods: {
    checkPicture(system, picture) {
      picture.correct = picture.system == system
      this.$forceUpdate();
    },
    resetPicture(picture) {
      this.$set(picture, 'correct', undefined)
    },
  },
  watch: {
    pictures: {
      handler: function(pictures) {
        let allCorrect = pictures.every(picture => picture.correct)
        if (allCorrect)
          this.$parent.$emit('complete')
      },
      deep:true,
    },
  },
}
</script>

<style>
.interactive.branches > div {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.system {
  width: 50%;
  background: white;
  border: 2px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

}
.system.hover {
  background: gold;
}

.system .label {
  padding: 0px 5px;
  border-radius: 5px;

  font-size: 20px;
  font-weight: bold;
  color: #49bd9a;
  background-color: white;
  z-index: 30;
}

.picture {
  padding: 0px;
  line-height: 0;
}

.picture img {
  filter: grayscale(100%);
}

.correct img {
  filter: initial;
}
.incorrect img {
  opacity: 0.5;
}
.incorrect {
  background-color: red;
}
</style>

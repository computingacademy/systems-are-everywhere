<template>
  <div class="interactive">
    <div class="dragdrop">
      <Draggable v-for="(letter, index) in letters"
        class="letter" v-bind:value="letter" element="div"
        :spread="{from: [0.1, 0.3], to: [0.9, 0.7], index: index, count: letters.length}">
        {{ letter }}
      </Draggable>
      <div class="book">
        <h1>My best</h1>
        <div class="blanks">
          <DropZone v-for="(letter, index) in letters"
            class="blank" v-on:drop="addLetter(index, $event)" removeLetter="(index, $event)" snap="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: 'AMTE',
      blanks: [],
      words: ['MATE', 'TEAM', 'MEAT'],
    }
  },
  methods: {
    addLetter(index, value) {
      this.blanks[index] = value 
      this.checkWord()
    },
    checkWord() {
      let word = this.blanks.join('')
      if (this.words.indexOf(word) !== -1)
        this.$parent.$emit('complete')
    },
    removedLetter(index, value) {
      if (this.blanks[index] == value)
        this.blanks[index] = null 
    },
  }
}
</script>

<style>
.book {
  background: url('~assets/images/book.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 200px;
  height: 230px;
  margin: auto;
  padding: 20px;

  text-align: center;
}

.book > h1 {
  color: gold;
  font-weight: bold;
  margin-bottom: 20px;
}

.letter {
  width: 35px;
  margin: 0px;
  background-color: white;
  box-shadow: -2px 2px 4px rgba(0,0,0, 0.3);
  z-index: 100;

  font-size: 40px;
  color: #49bd9a;
  text-align: center;
}

.blank {
  display: inline-block;
  width: 35px;
  height: 50px;
  background: white;
  border: 2px solid black;
}
.blank.hover {
  background: gold;
}
</style>

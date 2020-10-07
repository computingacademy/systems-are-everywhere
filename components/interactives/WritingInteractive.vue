<template>
  <div class="interactive">
    <div class="book">
      <h1>My best</h1>
      <div class="blanks">
        <DropZone v-for="(letter, index) in letters"
          class="blank" v-on:drop="addLetter(index, $event)" />
      </div>
    </div>
    <Draggable v-for="letter in letters"
      class="letter" v-bind:value="letter">
      {{ letter }}
    </Draggable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: 'MATE',
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
        this.$emit('complete')
    }
  }
}
</script>

<style>
.book {
  background: url('~assets/images/book.png');
  background-repeat: no-repeat;
  position: absolute;
  width: 200px;
  height: 230px;
  left: 320px;
  top: 200px;
  padding: 30px 40px 10px 20px;
  text-align: center;
}

.book > h1 {
  color: gold;
}

.letter {
  margin: 0px;
  font-size: 40px;
  color: darkred;
  z-index: 100;
}

.drop-zone {
  display: inline-block;
  width: 35px;
  height: 50px;
  background: white;
  border: 2px solid black;
}
.drop-zone.hover {
  background: gold;
}
</style>

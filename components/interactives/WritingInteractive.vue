<template>
  <div class="interactive writing">
    <div class="dragdrop">
      <Draggable v-for="(letter, index) in letters" :key="letter"
        class="letter" v-bind:value="letter" element="div"
        :spread="{from: [0.1, 0.3], to: [0.4, 0.7], index: index, count: letters.length}">
        {{ letter }}
      </Draggable>
      <div class="book">
        <div class="blanks">
          <DropZone v-for="(letter, index) in letters"  :key="letter"
            class="blank" v-on:drop="addLetter(index, $event)" removeLetter="(index, $event)" snap="true" />
        </div>
        <h1>goes to School</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: 'TPOS',
      blanks: [],
      words: ['SPOT','STOP','TOPS','POTS','POST','OPTS'],
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
.writing .book {
  background: url('~assets/images/writing/book.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 200px;
  height: 230px;
  margin: auto;
  padding: 20px;

  text-align: center;
}

.writing .book > h1 {
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
}

.writing .letter {
  width: 35px;
  margin: 0px;
  background-color: white;
  border: 1px solid #DDDDDD;
  /*box-shadow: -1px 1px 2px rgba(0,0,0, 0.1);*/
  z-index: 100;

  font-size: 40px;
  color: #49bd9a;
  text-align: center;
}

.writing .blank {
  display: inline-block;
  width: 35px;
  height: 50px;
  background: white;
  border: 2px solid black;
}
.writing .blank.hover {
  background: gold;
}
</style>

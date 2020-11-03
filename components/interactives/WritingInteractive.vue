<template>
  <div class="interactive">
    <div class="dragdrop">
      <div class="book">
        <h1>My best</h1>
        <div class="blanks">
          <DropZone v-for="(letter, index) in letters"
            class="blank" v-on:drop="addLetter(index, $event)" snap="true" />
        </div>
      </div>
      <Draggable v-for="(letter, index) in letters"
        class="letter" v-bind:value="letter" element="div"
        v-bind:x="-60 + index%2 * 280" v-bind:y="index/2 * 150 - 280">
        {{ letter }}
      </Draggable>
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
    }
  }
}
</script>

<style>
.dragdrop {
  margin: auto;
}

.book {
  background: url('~assets/images/book.png');
  background-repeat: no-repeat;
  width: 200px;
  height: 230px;
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

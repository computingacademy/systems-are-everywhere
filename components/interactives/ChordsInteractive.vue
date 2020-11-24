<template>
  <div class="interactive">
    <div class="piano"> 
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone'
import { Instrument } from "piano-chart"

export default {
  data() {
    return {
      requiredKeys: ['D3', 'G3', 'B3'],
      keysDown: [],
      keysPressed: [],
    }
  },
  mounted() {
    let vm = this

    let sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
    }).toDestination();

    let piano = new Instrument(this.$el.querySelector('.piano'), {
      startOctave: 3,
      endOctave: 4,
      showNoteNames: 'always',
      highlightedNotes: this.requiredKeys,
    })

    piano.create()

    piano.addKeyMouseDownListener(function(key) {
      event.preventDefault()
      let keyString = key.note+key.octave
      const now = Tone.now()
      sampler.triggerAttack(keyString, now)
      piano.keyDown(key)
      if (vm.keysDown.indexOf(keyString) == -1) {
        vm.keysDown.push(keyString)
        vm.recordKey(keyString)
      }
    })

    piano.addKeyMouseUpListener(function(key) {
      const now = Tone.now()
      sampler.triggerRelease(key.note+key.octave, now)
      piano.keyUp(key)
      vm.keysDown.splice(vm.keysDown.indexOf(key.note+key.octave), 1)
    })

    const keys = {
      s: 'C3',
      e: 'C#3',
      d: 'D3',
      r: 'D#3',
      f: 'E3',
      g: 'F3',
      y: 'F#3',
      h: 'G3',
      u: 'G#3',
      j: 'A3',
      i: 'A#3',
      k: 'B3',
      l: 'C4',
    }

    this.autoplayKey = key => {
      const now = Tone.now()
      sampler.triggerAttack(key, now)
      piano.keyDown(key)
    }

    this.pressKey = event => {
      let key = keys[event.key]
      if (key && vm.keysDown.indexOf(key) == -1) {
        vm.keysDown.push(key)
        const now = Tone.now()
        sampler.triggerAttack(key, now)
        piano.keyDown(key)
        vm.recordKey(key)
      }
    }

    this.releaseKey = event => {
      let key = keys[event.key]
      if (key) {
        vm.keysDown.splice(vm.keysDown.indexOf(key), 1)
        const now = Tone.now()
        sampler.triggerRelease(key, now)
        piano.keyUp(key)
      }
    }

    window.addEventListener('keydown', this.pressKey)
    window.addEventListener('keyup', this.releaseKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.pressKey)
    window.removeEventListener('keyup', this.releaseKey)
  },
  watch: {
    keysPressed(keys) {
      let allKeysPressed = this.requiredKeys
        .every(key => keys.indexOf(key) !== -1)
      if (allKeysPressed) {
        this.$parent.$emit('complete')
        setTimeout(() => {
          this.requiredKeys.forEach(this.autoplayKey)
        }, 1000)
      }
    }
  },
  methods: {
    recordKey(key) {
      this.keysPressed.push(key)
      if (this.keysPressed.length > this.requiredKeys.length)
        this.keysPressed.splice(0, this.keysPressed.length-this.requiredKeys.length)
    },
  },
}
</script>

<style>
.piano {
  height: 100%;
  text-align: center;
  touch-action: none;
}
</style>

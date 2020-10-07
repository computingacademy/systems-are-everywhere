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
      keysDown: [],
    }
  },
  mounted() {
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
      highlightedNotes: ['D', 'B', 'G'],
    })

    piano.create()

    piano.addKeyMouseDownListener(function(key) {
      const now = Tone.now()
      sampler.triggerAttack(key.note+key.octave, now)
      piano.keyDown(key)
    })

    piano.addKeyMouseUpListener(function(key) {
      const now = Tone.now()
      sampler.triggerRelease(key.note+key.octave, now)
      piano.keyUp(key)
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

    let vm = this

    window.addEventListener('keydown', function(event) {
      let key = keys[event.key]
      if (key && vm.keysDown.indexOf(key) == -1) {
        vm.keysDown.push(key)
        const now = Tone.now()
        sampler.triggerAttack(key, now)
        piano.keyDown(key)
      }
    })

    window.addEventListener('keyup', function(event) {
      let key = keys[event.key]
      if (key) {
        vm.keysDown.splice(vm.keysDown.indexOf(key), 1)
        const now = Tone.now()
        sampler.triggerRelease(key, now)
        piano.keyUp(key)
      }
    })
  },
  watch: {
    keysDown(keys) {
      if (keys.indexOf('D3') !== -1
        && keys.indexOf('G3') !== -1
        && keys.indexOf('B3') !== -1)
        this.$parent.$emit('complete')
    }
  },
}
</script>

<style>
.interactive {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 80px;
}

.piano {
  height: 100%;
  text-align: center;
}
</style>

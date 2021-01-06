<template>
  <div class="interactive">
    
  </div>
</template>


<script>
import { Network } from 'vis-network';

export default {
  data() {
    return {
      organisms: [{
        name: 'wattle'
      }, {
        name: 'grass'
      }, {
        name: 'gumtree'
      }, {
        name: 'grasshopper',
        eats: ['grass'],
      }, {
        name: 'termite',
        eats: ['wattle', 'gumtree', 'grass'],
      }, {
        name: 'emu',
        eats: ['grasshopper'],
      }, {
        name: 'echidna',
        eats: ['termite'],
      }, {
        name: 'lizard',
        eats: ['wattle'],
      }, {
        name: 'wombat',
        eats: ['grass'],
      }, {
        name: 'kangaroo',
        eats: ['grass'],
      }, {
        name: 'honey-eater',
        eats: ['gumtree'],
      }, {
        name: 'magpie',
        eats: ['termite', 'grasshopper'],
      }, {
        name: 'kookaburra',
        eats: ['termite', 'lizard'],
      }, {
        name: 'falcon',
        eats: ['lizard'],
      }, {
        name: 'dingo',
        eats: ['echidna', 'emu'],
      }],
    }
  },
  mounted() {
    let vm = this

    let data = {
      nodes: this.organisms.map(organism => {
        return {
          id: organism.name,
          label: organism.name,
          shape: 'circularImage',
          image: require('~/assets/images/food-web/'+organism.name+'.png'),
          imagePadding: 5,
          color: {
            border: '#49bd9a',
          },
        }
      }),
      edges: this.organisms
        .map(organism => {
          let foods = organism.eats || []
          return foods.map(food => {
            return {
              from: organism.name,
              to: food
            }
          })
        })
        .reduce((a,b) => a.concat(b), []),
    }

    let options = {
      nodes: {
        color: {
          background: 'white',
        },
      },
      edges: {
        color: '#49bd9a',
        width: 4,
        arrows: 'to',
      },
      layout: {
        hierarchical: {
          nodeSpacing: 10,
          levelSeparation: 120,
          sortMethod: 'directed',
          shakeTowards: 'leaves',
        },
      },
    }

    let network = new Network(this.$el, data, options)

    network.on('select', event => {
      if (this.$parent.step == 0) {
        let grasshopper = vm.organisms.find(o => o.name == 'grasshopper')
        let foodSelected = event.nodes.indexOf(grasshopper.eats[0]) != -1
        if (foodSelected) {
          vm.$parent.$emit('complete')
          setTimeout(() => network.selectNodes([]), 1000)
        }
      } else {
        let selected = vm.organisms.find(o => o.name == event.nodes[0])
        let predatorSelected = (selected.eats || []).indexOf('grasshopper') != -1 
        if (predatorSelected) {
          vm.$parent.$emit('complete')
          setTimeout(() => network.selectNodes([]), 1000)
        }
      }
    })
  },
}
</script>

<style>

</style>

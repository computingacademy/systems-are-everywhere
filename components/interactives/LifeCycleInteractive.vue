<template>
  <div class="interactive">
    
  </div>
</template>


<script>
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

export default {
  data() {
    return {
      stages: [{
        name: 'chrysalis',
        next: 'butterfly',
      }, {
        name: 'butterfly',
        next: 'egg',
      }, {
        name: 'caterpillar',
        next: 'chrysalis',
      }, {
        name: 'egg',
        next: 'caterpillar',
      }]
    }
  },
  mounted() {
    let vm = this

    let data = {
      nodes: this.stages.map((organism, index) => {
        return {
          id: organism.name,
          label: organism.name,
          fixed: true,
          physics: false,
          x: -300 + index*150,
          y: 0,
          size: 50,
          shape: 'circularImage',
          image: require('~/assets/images/life-cycle/'+organism.name+'.png'),
          imagePadding: 20,
          color: {
            border: '#49bd9a',
          },
        }
      }),
      edges: new DataSet([]),
    }

    let options = {
      nodes: {
        physics: false,
        color: {
          background: 'white',
        },
      },
      edges: {
        color: '#49bd9a',
        width: 4,
        arrows: 'to',
        smooth: {
          type: 'curvedCW',
        },
      },
      layout: {
        hierarchical: {
          nodeSpacing: 10,
          levelSeparation: 120,
          sortMethod: 'directed',
          shakeTowards: 'leaves',
        },
      },
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false,
      },
      manipulation: {
        controlNodeStyle: {
          color: '#49bd9a',
        },
        addEdge: (newEdge, callback) => {
          callback(newEdge)

          // Remove old edges from the same node as the new edge
          data.edges.forEach(edge => {
            if (edge.from == newEdge.from && edge.to != newEdge.to)
              data.edges.remove(edge.id)
          })

          for (var i = 0; i <= this.$parent.instructions.length; i++) {
            let targets = [3,2,0,1]
            let organism = vm.stages[targets[i]]
            let node = network.body.nodes[organism.name]
            let edge = node.edges.find(e => e.fromId == node.id)
            let stage = edge && edge.toId == organism.next
            if (!stage) {
              vm.$parent.$emit('jump',i)
              break;
            } else {
              let allStages = vm.stages.every(organism => {
                let node = network.body.nodes[organism.name]
                let edge = node.edges.find(e => e.fromId == node.id)
                return edge && edge.toId == organism.next
              })
              if (allStages) {
                vm.$parent.$emit('jump',3)
                vm.$parent.$emit('complete')
                break;
              }
            }
          }

          network.addEdgeMode()
        }
      },
      physics: {
        enabled: false,
      },
      layout: {
        randomSeed: 0,
      }
    }

    let network = new Network(this.$el, data, options)

    network.on('afterDrawing', function(){
    })

    network.addEdgeMode()
  },
}
</script>

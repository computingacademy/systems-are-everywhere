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
        name: 'crysalis',
        next: 'butterfly',
      }, {
        name: 'butterfly',
        next: 'egg',
      }, {
        name: 'larvae',
        next: 'crysalis',
      }, {
        name: 'egg',
        next: 'larvae',
      }],
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
          //shape: 'circularImage',
          //image: require('~/assets/images/food-web/'+organism.name+'.png'),
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
        addEdge: (newEdge, callback) => {
          callback(newEdge)

          // Remove old edges from the same node as the new edge
          data.edges.forEach(edge => {
            if (edge.from == newEdge.from && edge.to != newEdge.to)
              data.edges.remove(edge.id)
          })


          let allStages = vm.stages.every(organism => {
            let node = network.body.nodes[organism.name]
            let edge = node.edges.find(e => e.fromId == node.id)
            return edge && edge.toId == organism.next
          })
          
          if (allStages)
            vm.$parent.$emit('complete')

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

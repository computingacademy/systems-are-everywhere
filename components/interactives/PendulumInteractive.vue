<template>
  <div class="interactive">
  </div>
</template>

<script>
import Matter from 'matter-js'

export default {
  data() {
    return {
    }
  },
  mounted() {
    let element = this.$el

    var Engine = Matter.Engine,
          Events = Matter.Events,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Body = Matter.Body,
          Composite = Matter.Composite,
          Composites = Matter.Composites,
          Constraint = Matter.Constraint,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Vector = Matter.Vector;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: element,
        engine: engine,
        options: {
            width: element.offsetWidth,
            height: element.offsetHeight,
            wireframes: false,
            background: '#57a3f3'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var group = Body.nextGroup(true),
        length = 170,
        width = 25;
        
   var pendulum = Composites.stack(0, 160, 1, 1, -20, 0, function(x, y) {
        return Bodies.rectangle(x, y, length*2, width, { 
            collisionFilter: { group: group },
            angle: Math.PI/2,
            frictionAir: 0,
            chamfer: 5,
            render: {
                fillStyle: 'transparent',
                lineWidth: 4
            }
        });
    });

    pendulum.bodies[0].render.strokeStyle = '#ccddcc';

    Composite.add(pendulum, Constraint.create({ 
        bodyB: pendulum.bodies[0],
        pointB: { x: 0, y: -length * 0.9 },
        pointA: { x: 0, y: 160 },
        stiffness: 1,
        length: 0,
        render: {
            strokeStyle: '#ccddcc'
        }
    }));

    World.add(world, pendulum);

    var doublePendulum = Composites.stack(element.offsetWidth, 160, 2, 1, -20, 0, function(x, y) {
        return Bodies.rectangle(x, y, length, width, { 
            collisionFilter: { group: group },
            angle: Math.PI/2,
            frictionAir: 0,
            chamfer: 5,
            render: {
                fillStyle: 'transparent',
                lineWidth: 4
            }
        });
    });

    doublePendulum.bodies[0].render.strokeStyle = '#ccddcc';
    doublePendulum.bodies[1].render.strokeStyle = '#ccddcc';

    world.gravity.scale = 0.002;
    
    Composites.chain(doublePendulum, 0, 0.45, 0, -0.45, { 
        stiffness: 1, 
        length: 0,
        angularStiffness: 0.01,
        render: {
            strokeStyle: '#ccddcc'
        }
    });
    
    Composite.add(doublePendulum, Constraint.create({ 
        bodyB: doublePendulum.bodies[0],
        pointB: { x: 0, y: -length * 0.42 },
        pointA: { x: element.offsetWidth + 10, y: 160 },
        stiffness: 1,
        length: 0,
        angle: Math.PI,
        render: {
            strokeStyle: '#ccddcc'
        }
    }));

    World.add(world, doublePendulum);

    var arm = pendulum.bodies[0]
    var upperArm = doublePendulum.bodies[0]
    var lowerArm = doublePendulum.bodies[1]


    var arms = [arm, lowerArm]
    arms.forEach(function(arm) {
      var trail = [];

      Events.on(render, 'afterRender', function() {
          trail.unshift({
              position: Vector.clone(arm.position),
              speed: arm.speed
          });

          Render.startViewTransform(render)
          render.context.globalAlpha = 0.7

          for (var i = 0; i < trail.length; i += 1) {
              var point = trail[i].position
              var speed = trail[i].speed
              
              var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170)
              render.context.fillStyle = 'hsl(' + hue + ', 100%, 75%)'
              render.context.fillRect(point.x, point.y, 5, 5)
          }

          render.context.globalAlpha = 1
          Render.endViewTransform(render)

          if (trail.length > 500) {
              trail.pop()
          }
      })
    })

    let vm = this
    // complete on unaided swing of pendulums
    Events.on(render, 'afterRender', function() {
      if (lowerArm.angularSpeed > 0.1 && mouse.button == -1)
        vm.$parent.$emit('complete')
    })

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 700, y: 600 }
    });
  }
}
</script>

<style>
</style>

<template>
  <nav class="navbar">
    <div class="progress">
      <Tooltip v-for="slide in slides" :content="slide.title">
        <nuxt-link :class="['slide', slide.type, slide.completed ? 'completed' : '']" :to="slide.path"></nuxt-link>
      </Tooltip>
    </div>
    <div class="links">
      <NextButton v-if="next" :to="next.path" :disabled="!complete" />
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'

let slides = [
  {path: '/', title: 'Introduction', type: 'title-slide'},
  {path: '/what-are-systems/', title: 'What are systems?', type: 'title-slide'},
  {path: '/examples/writing/', title: 'Writing', type: 'interactive-slide'},
  {path: '/examples/space/', title: 'Space', type: 'interactive-slide'},
  {path: '/examples/human-body/', title: 'Human Body', type: 'interactive-slide'},
  {path: '/components/', title: 'Contain components', type: 'section-slide'},
  {path: '/components/cities/', title: 'Cities', type: 'interactive-slide'},
  {path: '/more-than-sum-of-parts/', title: 'More than the sum of their parts', type: 'section-slide'},
  {path: '/more-than-sum-of-parts/music/', title: 'Music', type: 'interactive-slide'},
  {path: '/relationships/', title: 'Have relationships', type: 'section-slide'},
  {path: '/relationships/food-web/', title: 'Food web', type: 'interactive-slide'},
  {path: '/processes/', title: 'Have processes', type: 'section-slide'},
  {path: '/processes/recipes/', title: 'Recipes', type: 'interactive-slide'},
  {path: '/cycles/', title: 'Cycles', type: 'section-slide'},
  {path: '/cycles/life-cycles/', title: 'Life Cycles', type: 'interactive-slide'},
  {path: '/surprising/', title: 'Are surprising', type: 'section-slide'},
  {path: '/surprising/pendulums/', title: 'Pendulums', type: 'interactive-slide'},
  {path: '/contain-systems/', title: 'Contain other systems', type: 'section-slide'},
  {path: '/contain-systems/communities/', title: 'Communities', type: 'interactive-slide'},
  {path: '/understand-other-systems/', title: 'Help us understand other systems', type: 'section-slide'},
  {path: '/understand-other-systems/branching-systems/', title: 'Branching systems', type: 'interactive-slide'},
  {path: '/conclusion/', title: 'The end!', type: 'title-slide'},
]

export default {
  props: ['completed'],
  data: function() {
    let path = this.$route.fullPath;
    let currentIndex = slides.findIndex(slide => slide.path == path);

    return {
      path: path,
      slides: slides,
      currentIndex: currentIndex,
      next: slides[currentIndex+1],
    }
  },
  watch: {
    completed: {
      handler: function(completed) {
        this.complete = completed === undefined ? true : this.completed,
        Vue.set(this.slides[this.currentIndex], 'completed', this.complete);
      },
      immediate: true,
    }
  }
}
</script>

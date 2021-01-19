<template>
  <nav class="navbar">
    <div class="progress">
      <Tooltip v-for="section in sections" :key="section.title" :content="section.title" placement="top">
        <div :class="['section', section.slides[0].path == currentSlide.path ? 'open' : '']">
            <Tooltip v-for="(slide, index) in section.slides" :key="slide.title" v-if="currentSection(section) || index == 0"
              :content="slide.title" placement="bottom">
              <nuxt-link :class="['slide', slide.type, currentSection(section) ? 'opened' : '', slide.completed ? 'completed' : '']" :to="slide.path"></nuxt-link>
            </Tooltip>
        </div>
      </Tooltip>
    </div>
    <div class="links">
      <NextButton v-if="next" :to="next.path" :disabled="!complete" />
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'

let sections = [
  {
    title: 'Title',
    slides: [
      {type: 'title-slide', path: '/', title: 'Systems are everywhere'},
    ],
  },
  {
  title: 'Introduction',
    slides: [
      {type: 'title-slide', path: '/introduction/', title: 'What are systems?'},
    ],
  },
  {
    title: 'Examples',
    slides: [
      {type: 'title-slide', path: '/examples/', title: 'What are systems?'},
      {path: '/examples/books/', title: 'Books', type: 'title-slide'},
      {path: '/examples/writing/', title: 'Writing', type: 'interactive-slide'},
      {path: '/examples/libraries/', title: 'Libraries', type: 'title-slide'},
      {path: '/examples/space/', title: 'Space', type: 'interactive-slide'},
      {path: '/examples/human-body/', title: 'Human Body', type: 'interactive-slide'},
    ]
  },
  {
    title: 'Components',
    slides: [
      {type: 'section-slide', path: '/components/', title: 'Contain components'},
      {path: '/components/cities/', title: 'Cities', type: 'interactive-slide'},
    ],
  },
 {
    title: 'More',
    slides: [
      {type: 'section-slide', path: '/more-than-sum-of-parts/', title: 'More than the sum of their parts'},
      {path: '/more-than-sum-of-parts/music/', title: 'Music', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Relationships',
    slides: [
      {type: 'section-slide', path: '/relationships/', title: 'Have relationships'},
      {path: '/relationships/food-web/', title: 'Food web', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Processes',
    slides: [
      {type: 'section-slide', path: '/processes/', title: 'Have processes'},
      {path: '/processes/recipes/', title: 'Recipes', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Cycles',
    slides: [
      {type: 'section-slide', path: '/cycles/', title: 'Cycles'},
      {path: '/cycles/life-cycles/', title: 'Life Cycles', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Surprise!',
    slides: [
      {type: 'section-slide', path: '/surprising/', title: 'Are surprising'},
      {path: '/surprising/pendulums/', title: 'Pendulums', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Systems in systems',
    slides: [
      {type: 'section-slide', path: '/contain-systems/', title: 'Contain other systems'},
      {path: '/contain-systems/communities/', title: 'Communities', type: 'interactive-slide'},
    ],
  },
  {
    title: 'Other systems',
    slides: [
      {type: 'section-slide', path: '/understand-other-systems/', title: 'Help us understand other systems'},
      {path: '/understand-other-systems/branching-systems/', title: 'Branching systems', type: 'interactive-slide'},
    ],
  },
  {
    title: 'The end!',
    slides: [
      {type: 'title-slide', path: '/conclusion/', title: 'The end!'},
    ],
  },
]

export default {
  props: ['completed'],
  data: function() {
    let path = this.$route.fullPath;

    let slides = sections
      .map(section => section.slides)
      .reduce((a, b) => a.concat(b), [])
    
    let currentIndex = slides.findIndex(slide => slide.path == path);

    return {
      path: path,
      sections: sections,
      slides: slides,
      currentIndex: currentIndex,
      currentSlide: slides[currentIndex],
      next: slides[currentIndex+1],
    }
  },
  watch: {
    completed: {
      handler: function(completed) {
        this.complete = completed === undefined ? true : this.completed,
        Vue.set(this.slides[this.currentIndex], 'completed', this.complete);
        sections
          .filter(section => section.slides != undefined)
          .forEach(section => {
            let allCompleted = section.slides.every(slide => slide.completed)
            if (allCompleted)
              Vue.set(section, 'completed', this.complete);
          })
      },
      immediate: true,
    }
  },
  methods: {
    currentSection(section) {
      if (section.slides[0].path != '/')
        return this.$route.path.startsWith(section.slides[0].path)
      else
        return this.$route.path == section.slides[0].path
    },
  },
}
</script>

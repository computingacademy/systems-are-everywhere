<template>
  <div class="slide main-slide">
    <div class="content">
      <div class="title-container">
        <h1 class="main-title">
          But what are systems?
        </h1>
      </div>
      <h2 class="main-subtitle">
        Let's look at some examples...
      </h2>
    </div>
    <NavBar />
  </div>
</template>

<script>
</script>

<style scoped>

.title-container {
  display: flex;
  flex-direction: row;
}

.title-container > * {
  margin: auto;
}

.main-title {
  height:250px;
}

.main-subtitle {
  text-align: right;
  font-weight: 600;
}

</style>
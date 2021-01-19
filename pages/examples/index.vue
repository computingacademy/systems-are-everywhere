<template>
  <div class="slide main-slide">
    <div class="content">
      <div class="title-container">
        <h1 class="main-title">
          Let's take a look at some <em>systems</em>...
        </h1>
      </div>
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
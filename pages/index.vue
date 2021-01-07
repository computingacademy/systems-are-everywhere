<template>
  <div class="slide main-slide">
    <div class="content">
      <div class="title-container">
        <img class="robot" src="~assets/images/robot/zoom.png">
        <h1 class="main-title">
          Systems are Everywhere!
        </h1>
      </div>
      <h2 class="main-subtitle">
        <em>Can you find them?</em>
      </h2>
    </div>
    <NavBar></NavBar>
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

.robot {
  height:350px;
}

.main-subtitle {
  text-align: right;
  font-weight: 600;
}

</style>
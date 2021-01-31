<template>
  <div class="slide main-slide">
    <div class="content">
      <div class="title-container">
        <img class="robot" src="~assets/images/robot/zoom.png">
        <h1 class="main-title">
          Systems are Everywhere!
        </h1>
      </div>
    </div>
    <NavBar />
    <div>
      <p class="supported">This activity has been designed for use on Desktop/Laptop PCs and tablets and is not recommended for phones.</p>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>

.supported {
  font-family:
  'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  text-align:center;
  display: block;
}

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
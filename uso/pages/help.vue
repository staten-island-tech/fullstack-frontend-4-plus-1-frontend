<template>
  <div class="help-page">
    <div class="under-nav"></div>
    <div class="help-page-container">
      <h1 id="l-bozo">L bozo</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  /*  mounted() {
    this.lBozo();
  }, */
  methods: {
    /*  lBozo() {
      let time = 10;
      const lBozoText = document.getElementById('l-bozo');
      setTimeout(() => {
        lBozoText.style.transition = '0.8s ease-in';
        lBozoText.style.fontSize = '50rem';
        console.log(time);
      }, time);
      setTimeout(() => {
        lBozoText.style.transition = '0.8s ease-out';
        lBozoText.style.fontSize = '3rem';
        time = time + 840;
        console.log(time);
      }, time);
      setTimeout(() => {
        lBozoText.style.transition = '0.8s ease-out';
        lBozoText.style.fontSize = '50rem';
        time = time + 840;
        console.log(time);
      }, time);
    }, */
  },
};
</script>

<style scoped>
.help-page-container {
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#l-bozo {
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  font-size: 10rem;
}

@keyframes example {
  0% {
    color: red;
    font-size: 10rem;
  }
  12.5% {
    color: orange;
  }
  25% {
    color: yellow;
    font-size: 69rem;
  }
  37.5% {
    color: green;
  }
  50% {
    font-size: 10rem;
    color: blue;
  }
  62.5% {
    color: blue;
  }
  75% {
    color: indigo;
    font-size: 69rem;
  }
  87.5% {
    color: violet;
  }
}
</style>

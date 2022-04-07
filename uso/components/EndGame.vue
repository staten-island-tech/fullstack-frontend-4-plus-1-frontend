<template>

<!-- transfer over to components -->

  <div>

      <div class="endgame__page"> 
        <!-- <div class="under-nav"></div> -->

        <div class="endgame__page--container">
            <h1>hello world!</h1>
        </div>

      </div>
    
  </div>
</template>

<script>

export default {
};

</script>



<style scoped>

.endgame__page--container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  height: 100vh;
  background-image: linear-gradient(
      rgba(30, 30, 30, 0.5),
      rgba(30, 30, 30, 0.5)
    ),
    url('~/assets/images/backgrounds/inazumaEndPg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

</style>

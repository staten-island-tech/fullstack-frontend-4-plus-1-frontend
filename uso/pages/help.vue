<template>
  <div class="help-page">
    <div class="under-nav"></div>
    <div class="help-page-container">
      <!-- <h1>L bozo</h1> -->
      <section id="paimon" class="paimonInfo">
        <div class="section-header">
          <h1 class="section-heading">help urself, bozo</h1>
          <div class="underline"></div>
        </div>
        <div class="paimonStuffs">
          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonStuff">
            <div class="paimonStuff-header">
              <h3>L bozo</h3>
            </div>
            <p class="paimonStuff-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum. Ac felis donec et
              odio pellentesque diam volutpat commodo.
            </p>
          </div>

          <div class="paimonInfo-img-wrapper">
            <img src="../assets/images/help/paimon-help.png" class="ehe" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
* {
  font-family: 'Dongle', sans-serif;
}

.help-page {
  height: 100vh;
  background-image: linear-gradient(rgba(4, 22, 54, 0.7), rgba(11, 4, 48, 0.7)),
    /* url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
      url('~/assets/images/backgrounds/help-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.help-page-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.paimonInfo {
  width: 100%;
  /* background-color: #f2ffff; */
  /* background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("../images/amberklee.jpg") no-repeat center; */
  background-size: cover;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0 5rem 0;
}

.section-heading {
  font-size: 9rem;
  font-weight: 500;
  color: #fff;
}

.underline {
  width: 20rem;
  height: 0.5rem;
  background-color: #a8c6ff;
}

.paimonStuffs {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(6, 6rem);
  grid-row-gap: 4rem;
}

.paimonStuff {
  width: 100%;
  margin-bottom: 2rem;
}

.paimonStuff:nth-child(1) {
  grid-column: 4 / 7;
  grid-row: 1 / 3;
}

.paimonStuff:nth-child(2) {
  grid-column: 3 / 6;
  grid-row: 3 / 5;
}

.paimonStuff:nth-child(3) {
  grid-column: 4 / 7;
  grid-row: 5 / -1;
}

.paimonStuff:nth-child(4) {
  grid-column: 11 / 14;
  grid-row: 1 / 3;
}

.paimonStuff:nth-child(5) {
  grid-column: 12 / 15;
  grid-row: 3 / 5;
}

.paimonStuff:nth-child(6) {
  grid-column: 11 / 14;
  grid-row: 5 / -1;
}

.paimonStuff-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.paimonStuff-header i {
  font-size: 8rem;
  color: #4b4b4b;
  margin-right: 2rem;
}

.paimonStuff-header h3 {
  font-size: 6rem;
  line-height: 2.6rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.paimonStuff-text {
  font-size: 2.5rem;
  text-align: justify;
}

.paimonInfo-img-wrapper {
  grid-column: 7 / 11;
  grid-row: 2 / 6;
  width: 100%;
}

.paimonInfo-img-wrapper img {
  width: 90%;
  height: auto;
  object-fit: cover;
  opacity: 1;
  margin-top: -10rem;
}

.ehe {
  transition: all 0.5s ease-in-out;
}

.ehe:hover {
  transform: scale(1.1);
}

.ehe[disabled]:hover {
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

@media (max-width: 1500px) {
  .paimonInfo-img-wrapper {
    grid-row: 3 / -1;
  }
}

@media (max-width: 1400px) {
  .paimonStuff:nth-child(1) {
    grid-column: 3 / 7;
  }

  .paimonStuff:nth-child(2) {
    grid-column: 2 / 6;
  }

  .paimonStuff:nth-child(3) {
    grid-column: 3 / 7;
  }

  .paimonStuff:nth-child(4) {
    grid-column: 11 / 15;
  }

  .paimonStuff:nth-child(5) {
    grid-column: 12 / 16;
  }

  .paimonStuff:nth-child(6) {
    grid-column: 11 / 15;
  }
}

@media (max-width: 1000px) {
  .paimonStuffs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .paimonStuff {
    width: 40rem;
    margin-bottom: 6rem;
  }

  .paimonInfo-img-wrapper {
    width: 40rem;
  }

  .paimonInfo-img-wrapper img {
    width: 100%;
  }
}

@media (max-width: 500px) {
  html {
    font-size: 45%;
  }

  .paimonStuff {
    width: 30rem;
  }
}
</style>

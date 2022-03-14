<template>
  <div class="help-page">
    <div class="under-nav"></div>
    <div class="help-page-container">
      <!-- <h1>L bozo</h1> -->
      <section id="paimon" class="paimonInfo">
          <div class="section-header">
            <h1 class="section-heading"><b>L bozo</b></h1>
            <div class="underline"></div>
          </div>
          <div class="paimonStuffs">
        
            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Overview</h3>
              </div>
              <p class="paimonStuff-text">
                Teyvat is a world comprised of seven different nations: Mondstat,
                Liyue, Inazuma, Sumeru, Fontaine, Natlan, and Snezhnaya. Each nation
                has their own respective Archons. Check Archon section below for more!
              </p>
            </div>

            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Tours</h3>
              </div>
              <p class="paimonStuff-text">
                As of right now, only three nations are open for touring: Mondstat, Liyue,
                and Inazuma. Paimon really loves the food in these countries, and treasure! 
                But, Paimon is kinda scared of Inazuma's Electro Archon.
              </p>
            </div>

            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Cost</h3>
              </div>
              <p class="paimonStuff-text">
                Paimon will travel with you for free! Of course, the only catch is that
                you have to supply me with lots of food, and also cover our expenses. But, trust me, 
                Paimon is the best traveling companion ever!
              </p>
            </div>

            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Dates</h3>
              </div>
              <p class="paimonStuff-text">
                Tours are year-round! Just register and Paimon will take care of everything else.
                Before we go adventuring, Paimon suggests that you learn how to get stronger. Paimon
                does not like monsters, and wants them gone!
              </p>
            </div>

            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Recommendations</h3>
              </div>
              <p class="paimonStuff-text">
                Paimon's personal favorite is Liyue! Liyue has so much awesome food. Also, a lot of Paimon's
                adventurers seem to enjoy the girls in Liyue. Keqing, Ganyu, Hu Tao, Ningguang, and more! The 
                list is endless!
              </p>
            </div>

            <div class="paimonStuff">
              <div class="paimonStuff-header">
                <h3>Biography</h3>
              </div>
              <p class="paimonStuff-text">
                If you are curious about Paimon, here is some stuff about me! Paimon is short, but at least I can fly.
                Paimon does not know where she came from. Paimon was fished out of a lake by Traveler. Traveler was my first
                adventurer!
              </p>
            </div> 

            <div class="paimonInfo-img-wrapper">
              <img src="../assets/images/help/paimon-help.png" class="ehe"/>
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

.help-page-container {
  margin: auto;
  height: 100vh;
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
    padding-bottom: 15rem;
  }
  
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 5rem 0;
  }
  
  .section-heading {
    font-size: 10rem;
    font-weight: 300;
    color: #4b4b4b;
    margin-bottom: 5rem;
  }
  
  .underline {
    width: 14rem;
    height: 0.4rem;
    background-color: #5c7199;
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
    margin-top: -11rem;
  }

  .ehe{
    transition: all 0.5s ease-in-out;
  } 
  
  .ehe:hover{
      transform: scale(1.1);
  }
  
  .ehe[disabled]:hover{
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

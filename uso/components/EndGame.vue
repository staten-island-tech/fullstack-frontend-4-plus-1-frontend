<template>

<!-- transfer over to components -->

  <div>

      <div class="endgame__page"> 
        <div class="endgame__page--container">

          <div class="endgame__header">

            <div class="header__left">
              <div id="leftSide">
                <div id="leftTitle">song // beatmap title</div>
                <div id="leftTitle"> by... musician // beatmap creator</div>
                <h3></h3>
              </div>
            </div>

            <div class="header__right">
              <div id="rightSide">Ranking</div>
            </div>

          </div>

          <div class="endgame__stats">
            <div id="statsLeft">Content</div>
          </div>

        </div>
      </div>
    
  </div>
</template>

<script>

export default {
};

</script>



<style scoped>

/* declarations */

#leftSide {
  font-weight: 300;
}

#leftTitle {
  font-size: 4rem;
}

#rightSide {
  font-size: 8.5rem;
  font-weight: 500;
}

#statsLeft {
  font-size: 6rem;
}

/* endgame things */

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

.endgame__header {
  padding: 10px 25px 10px 25px;
  opacity: 0.9;

  background: #292a2b;
  color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
}


.header__left {
  padding-top: 5px;
  margin-right: auto;
}

.header__right {
  padding-top: 5px;
  margin-left: auto;
}

.endgame__stats {
  padding: 25px;
}


</style>

<template>
  <div class="team__page">
    <!-- <div class="under-nav"></div> -->
    <!-- <section class="landing">
      <video
        id="landing-video"
        class="video-bg"
        autoplay
        muted
        loop
        playsinline
        disablePictureInPicture
        src="../assets/images/backgrounds/landing-narukami-shrine.mp4"
        type="video/mp4"
      ></video>
    </section> -->
      <div class="team__container">
        <div class="team__header">
          <h1 id="team__title">meet the team~ we are, FourPlusOne!</h1>
          <div class="underline"></div>
        </div>

        <div class="team__subContainer">

          <div class="team__members">
            <img src="~/assets/images/navigation/nav-avatar.png" alt="">
              <div class="name">wiichen</div>
              <div class="college">stony brook university '26</div>
              <div class="role">captain</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="https://github.com/wilsonw13" target="_blank"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          
          </div>

          <div class="team__members">
            <img src="~/assets/images/pfps/ganyu.png" alt="">
              <div class="name">harvue</div>
              <div class="college">staten island tech hs '23</div>
              <div class="role">frontend/backend</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="https://github.com/harveyj123" target="_blank"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

          <div class="team__members">
            <img src="~/assets/images/pfps/ayato.webp" alt="">
              <div class="name">kenneru</div>
              <div class="college">yale university '26</div>
              <div class="role">frontend</div>
              <div class="about">i said, "KEEP MY WAIFUS' NAMES OUT OF YOUR MOUTH!" <br/>*slaps you*</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="https://github.com/kentng01" target="_blank"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

          <div class="team__members">
            <img src="~/assets/images/pfps/raiden.png" alt="">
              <div class="name">edan</div>
              <div class="college">boston university '26</div>
              <div class="role">frontend</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="https://github.com/ethanl66" target="_blank"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

          <div class="team__members">
            <img src="~/assets/images/pfps/akame.png" alt="">
              <div class="name">riian</div>
              <div class="college">quinnipiac university '26</div>
              <div class="role">backend</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="https://github.com/ryan-sliger" target="_blank"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

      </div>

      <!-- <div class="ganyu__corner">
        <img src="~/assets/images/help/ganyu-help.png" alt=""/>
      </div> -->

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
  margin: 0;
  padding: 0;
}

.team__page {
  min-height: 100vh;
  height: 100%;
  background-image: linear-gradient(rgba(4, 22, 54, 0.7), rgba(11, 4, 48, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.landing {
  width: 100%;
  z-index: 1;
  /* height: calc(100vh - 9.5rem); */
}

.video-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  z-index: -1;
}

.under-nav {
  height: 9.5rem;
}

.team__container {
  text-align: center;
  /* background: #f5f5f5; */
}

.team__header {
  padding-top: 18rem;
  color: #444;
  margin: auto;
  /* line-height: 50px; */
}

#team__title {
  font-size: 8.25rem;
  font-weight: 400;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

.underline {
  width: 25rem;
  height: 0.3rem;
  /* background-color: #e194f5; */
  background-color: #cad2ff;
  margin: auto;
  
}

.team__subContainer {
  /* max-width: 1200px; */
  max-width: 100%;
  margin: auto;
  padding: 22.5px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.team__members {
  margin: 35px;
  padding: 30px;
  max-width: 28.5rem;
  cursor: pointer;
  transition: 400ms;
  box-sizing: border-box;
  border-radius: 12px;
  background: #f3f3f5;
  box-shadow: 0 1.25rem 0.8rem rgba(6, 3, 36, 0.9);
}

.team__members:hover {
  background: #eeeeff;
  border-radius: 12px;
  transform: translate(0, -2%);
}

.team__members img {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  transition: all 250ms ease-in;
}

.team__members img:hover {
  transform: scale(1.05);
}

.name {
  padding: 22px 0 0 0;
  font-weight: bold;
  font-size: 45px;
  text-transform: uppercase;
  color: #212121;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: -1.25rem;
}

.college {
  color: #212121;
  font-size: 30px;
}

.role {
  margin-top: 0.5rem;
  font-style: italic;
  color: #888;
  font-size: 36px;
}

.about {
  margin: 12px 0;
  font-weight: lighter;
  color: #4e4e4e;
  font-size: 24px;
  line-height: 0.75;
}

.social__links {
  margin: 15px 0 0 0;
}

.social__links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  transition: 300ms ease-out;
}

.social__links a:hover {
  transform: scale(1.1);
}

.social__links a img {
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.7);
}


@media screen and (max-width: 768px){
  #team__title {
    font-size: 6.5rem;
    padding: 0 2.5rem;
    line-height: 1;
  }
  .team__members {
    max-width: 40rem;
  }
}

/* @media screen and (max-width: 1600px){
  .team__members {
    max-width: 32.5rem;
  }
} */

/* @media screen and (max-width: 600px){
  .team__members {
    max-width: 35rem;
  }
} */

</style>

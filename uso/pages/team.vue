<template>
  <div class="team__page">
    <div class="under-nav"></div>
      <div class="team__container">
        <div class="team__header">
          <h1>meet the team~</h1>
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
              <a href="#"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
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
              <a href="#"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
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
              <a href="#"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

          <div class="team__members">
            <img src="~/assets/images/pfps/ayato.webp" alt="">
              <div class="name">kenki</div>
              <div class="college">yale university '26</div>
              <div class="role">frontend</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="#"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>

          <div class="team__members">
            <img src="~/assets/images/navigation/nav-avatar.png" alt="">
              <div class="name">riian</div>
              <div class="college">quinnipiac university '26</div>
              <div class="role">backend</div>
              <div class="about">idk i speak in code so i dunno,, i am having a for loop error error 404... help pls</div>

            <div class="social__links">
              <!-- <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a> -->
              <a href="#"><img src="~/assets/images/navigation/gitLogo.png" alt=""></a>
            </div>
          </div>


      </div>

      </div>
  </div>
</template>

<script>

export default {
  components: {},
};

</script>

<style scoped>

@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

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

.under-nav {
  height: 9.5rem;
}

.team__container {
  text-align: center;
  /* background: #f5f5f5; */
}

.team__header {
  padding-top: 7.5rem;
  color: #444;
  font-size: 20px;
  margin: auto;
  line-height: 50px;
}

.team__subContainer {
  /* max-width: 1200px; */
  max-width: 100%;
  margin: auto;
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.team__members {
  margin: 15px;
  padding: 30px;
  max-width: 28.5rem;
  cursor: pointer;
  transition: 400ms;
  box-sizing: border-box;
  /* background: #f5f5f5; */
  border-radius: 12px;
  background: #f5f5f5;
  box-shadow: 0 1.3rem 0.7rem rgba(0, 0, 0, 0.8);
}

.team__members:hover {
  background: #ddd;
  border-radius: 12px;
}

.team__members img {
  width: 150px;
  height: 150px;
  border-radius: 100%;
}

.name {
  padding: 22px 0 0 0;
  font-weight: bold;
  font-size: 44px;
  text-transform: uppercase;
  color: #212121;
}

.college {
  color: #212121;
  font-size: 30px;
}

.role {
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
  margin: 12px;
}

.social__links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  transition: 400ms;
}

.social__links a:hover {
  transform: scale(1.2);
}

.social__links a img {
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 600px){
  .team__members {
    max-width: 100%;
  }
}

</style>

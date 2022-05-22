<template>
  <div v-if="showModalTwo" class="change-pfp-modal">
    <div class="close-pfp-modal" @click="showModalTwo = false">Close</div>
    <div class="change-pfp-modal-content">
      <owned-character :all-owned="allOwned" class="modal-owned-character" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allOwned: {
      type: Array,
      default() {
        return [];
      },
    },
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      showModalTwo: this.showModal,
    };
  },
  watch: {
    showModal(value) {
      this.showModalTwo = !this.showModalTwo;
      /* console.log('changed'); */
    },
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.close-pfp-modal {
  font-size: 4rem;
  position: absolute;
  right: 2rem;
  cursor: pointer;
}
.change-pfp-modal {
  /* display: none; */
  position: fixed;
  z-index: 8;
  height: 100%;
  width: 100%;
  top: 9.5rem;
  left: 0;
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  /*  height: 50vh;
  width: 60vw;
  margin: auto; */
}
.change-pfp-modal-content {
  margin: auto;
  --modal-container-width: 55vw;
  width: var(--modal-container-width);
}
.modal-owned-character {
  /* background-image: linear-gradient(
      rgba(13, 4, 66, 0.958),
      rgba(13, 4, 66, 0.938)
    ),
    url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
  background: linear-gradient(rgba(13, 4, 66, 0.958), rgba(13, 4, 66, 0.938));
}
.modal-owned-character > div {
  width: calc(var(--modal-container-width) / 6);
}
</style>

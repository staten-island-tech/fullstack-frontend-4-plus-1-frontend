<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ store, redirect }) {
    // Automatic Redirection
    return redirect('/home');
  },
};
</script>

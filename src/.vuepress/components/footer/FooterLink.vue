<template>
  <div>
    <div align="right" v-show="ShowShareLink">
      <ShareLink />
    </div>
  </div>
</template>

<script>
import ShareLink from './ShareLink';

export default {
  name: 'FooterLink',
  props: ['isShareLink'],
  components: {
    ShareLink,
  },
  data () {
    return {
      ShowShareLink: this.isShareLink,
      ShowDaShang: this.isDaShang,
    };
  },
};
</script>

<style lang="scss" scoped></style>

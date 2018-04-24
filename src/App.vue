<template>
  <div id="app">
  	<transition :name="enterType">
	    <router-view/>
	</transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['forward'],
  components: {},
  computed: {
  	enterType(){
  	  return this.forward ? 'slide-left' : 'slide-right';
  	}
  },
  mounted(){
  	
  }
}
</script>

<style lang="less">
@import url(./assets/css/main.less);
</style>

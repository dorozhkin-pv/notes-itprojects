<template>
	<input type="checkbox" 
				 :value="val"
				 v-model="model"
	/>
</template>

<script>
  import defaultProps from './BaseCheckboxDefaultProps.js';

  const props = defaultProps;

	export default {
		name: "BaseCheckbox",
		
		props,
		
		computed: {
			model: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				},
			},
		}
	}
</script>

<style scoped>

</style>
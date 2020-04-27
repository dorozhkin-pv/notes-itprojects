<template>
	<div class="main-layout">
		<navbar />
		<div class="main">
			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
	name: 'MainLayout',
	
	components: {
		Navbar,
		Footer
	}
}
</script>

<style lang="scss" scoped>
	.main-layout {
		display: flex;
    min-height: 100vh;
    flex-direction: column;
	}
	.main {
		flex: 1 0 auto;
	}
</style>
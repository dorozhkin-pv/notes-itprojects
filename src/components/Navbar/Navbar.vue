<template>
	<div>
		<nav id="nav" class="blue darken-3">
			<div class="container">
				<div class="nav-wrapper">
					<div class="logo-vs-burger">
						<span class="logo">Todos App</span>
						<span @click="openMenu" data-target="mobile-demo" class="sidenav-trigger">
							<font-awesome-icon icon="bars" />
						</span>
					</div>

					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li><router-link :to="{ name: 'Home' }">Home</router-link></li>
					</ul>
				</div>
			</div>
		</nav>

		<ul class="sidenav" ref="sidenav" id="mobile-demo">
			<li><router-link :to="{ name: 'Home' }">Home</router-link></li>
		</ul>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

	export default {
		methods: {
			openMenu() {
				let options = {
					edge: 'left',
					draggable: true
				}
				let elem = this.$refs.sidenav
				let instances = M.Sidenav.init(elem, options)
			}
		}
	}
</script>

<style lang="scss" scoped>
.nav-wrapper {
	display: flex;
	justify-content: space-between;
}

#nav {
	li {
		a {
			font-weight: bold;

			&.router-link-exact-active {
				background-color: #3b8be4;
			}
		}
	}
}

.sidenav {
	padding-top: 2rem;
	li {
		a {
			font-weight: bold;

			&.router-link-exact-active {
				color: #fafafa;
				background-color: #3b8be4;
			}
		}
	}
}

.sidenav-trigger {
	display: none;
}

@media (max-width: 992px) {
	.sidenav-trigger {
		display: block;
	}	
}
</style>
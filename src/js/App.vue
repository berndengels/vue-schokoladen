<template>
    <div class="container col-12 m-0 p-0">
        <TopNavigation />
        <transition mode="out-in" name="fade">
            <router-view />
        </transition>
        <BottomNavigation />
    </div>
</template>
<script>
	import TopNavigation from "./components/top-navigation"
	import BottomNavigation from "./components/bottom-navigation"

	export default {
		name: "App",
		components: { TopNavigation, BottomNavigation },
	}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        _transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        _opacity: 0
    }
</style>

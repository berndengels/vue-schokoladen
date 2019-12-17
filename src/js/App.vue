<template>
    <div>
        <TheTopMenu />
        <div class="container col-12">
            <transition mode="out-in" name="fade">
                <router-view />
            </transition>
            <div class="background_right h-100">
                <img class="h-100 img-responsive" src="/img/the_dark_art.png" width="66px" height="718px" alt="Darkside" title="Darlside">
            </div>
        </div>
        <TheBottomMenu />
    </div>
</template>
<script>
	import TheTopMenu from "./components/menu/top"
	import TheBottomMenu from "./components/menu/bottom"

	export default {
		name: "App",
		components: { TheTopMenu, TheBottomMenu },
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

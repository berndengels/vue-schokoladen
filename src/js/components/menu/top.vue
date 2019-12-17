<template>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>
            <b-link to="/">
                <img src="/img/batcow_yellow.png">
                <img src="/img/schokoladen_schrift_yellow.png">
            </b-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse-top" class="p-0" right />

        <b-collapse id="nav-collapse-top" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown
                    v-for="item in topMenu"
                    :key="item.id"
                    :text="item.name" right
                    variant="danger"
                >
                    <b-dropdown-item
                        v-for="child in item.children"
                        v-if="item.children.length > 0"
                        :key="child.id"
                        :to="child.url"
                    >
                        {{ child.name }}
                    </b-dropdown-item>
                    <b-dropdown-item v-else>
                        {{ item.name }}
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
	import { getMenu } from "../../store/api";

	export default {
		name: "TheTopMenu",
		data() {
			return {
				topMenu: [],
			}
		},
		created() {
			this.getNavMenu('top');
		},
		methods: {
			getNavMenu(type) {
				getMenu(type)
					.then(data => {
						this.topMenu = data
					})
					.catch(err => {
						console.error(err)
					});
			},
		},
	}
</script>

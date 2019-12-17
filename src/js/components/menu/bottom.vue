<template>
    <b-navbar fixed="bottom" toggleable="md" type="dark" variant="dark">
        <b-navbar-brand href="#" />
        <b-navbar-toggle target="nav-collapse-bottom" />
        <b-collapse id="nav-collapse-bottom" is-nav>
            <b-navbar-nav v-if="leftMenu.length > 0">
                <b-nav-item
                    v-for="item in leftMenu"
                    :key="item.id"
                    :text="item.name"
                    :href="item.url"
                    :to="item.url"
                    left
                >
                    {{ item.name }}
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="rightMenu.length > 0" class="ml-auto mr-3">
                <b-nav-item
                        v-for="item in rightMenu"
                        :key="item.id"
                        :text="item.name"
                        :href="item.url"
                        target="_blank"
                        right
                >
                    <img v-if="item.icon.indexOf('.') > -1" :src="'/img/icons/' + item.icon" :alt="item.name" :title="item.name">
                    <i v-if="item.fa_icon" :class="item.fa_icon" :title="item.name" />
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
	import { getMenu } from "../../store/api";

	export default {
		name: "TheBottomMenu",
		data() {
			return {
//				bottomMenu: [],
                leftMenu: [],
                rightMenu: [],
			}
		},
		created() {
			this.getNavMenu('bottom');
		},
		methods: {
			getNavMenu(type) {
				getMenu(type)
					.then(data => {
                        this.adjust(data)
					})
					.catch(err => {
						console.error(err)
					});
			},
            adjust(data) {
				const items = data.forEach(item => {
                    if(item.icon || item.fa_icon) {
                    	this.rightMenu.push(item)
                    } else {
						this.leftMenu.push(item)
                    }
                })
            },
		},
	}
</script>

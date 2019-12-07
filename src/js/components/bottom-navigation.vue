<template>
    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-black p-0 m-0">
        <a class="navbar-brand" href="#" />
        <button aria-controls="bottomNavbar" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
                data-target="#bottomNavbar" data-toggle="collapse" type="button"
        >
            <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse m-0 p-0" id="bottomNavbar">
            <ul class="navbar-nav mr-auto p-0">
                <li :key="item.id" class="nav-item p-0 m-0 dropup" v-for="item in bottomMenu"
                    v-if="item.children.length > 0"
                />
                <li :key="item.id" class="nav-item p-0 m-0" v-else v-for="item in bottomMenu">
					<span v-if="item.children.length">
						<a :href="item.url"
                           :id="'dropup' + item.name"
                           aria-expanded="false"
                           aria-haspopup="true"
                           class="nav-link dropup-toggle"
                           data-toggle="dropup"
                        >{{ item.name }}<span class="ml-2 sr-only">(current)</span></a>

						<div :aria-labelledby="'dropup' + item.name" class="dropup-menu">
							<a :href="child.url" :key="child.id" class="dropup-item" v-for="child in item.children">
								<img :alt="child.icon" :src="'/img/icons/' + child.icon" :title="child.icon"
                                     v-if="'' !== child.icon"
>
								<span v-else>{{ child.name }}</span>
							</a>
						</div>
					</span>
                    <span v-else>
						<a :href="item.url" aria-haspopup="false" class="nav-link p-0 mt-2 mr-3">
							<span v-if="item.icon">
								<ion-icon :name="item.icon" :title="item.icon" v-if="item.icon.indexOfFrom('.') == -1" />
								<img :alt="item.icon" :src="'/img/icons/' + item.icon" :title="item.icon" v-else>
							</span>
							<span v-else>
								{{ item.name }}<span class="ml-2 sr-only">(current)</span>
							</span>
						</a>
					</span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
	import { getMenu } from "../data/api";

	export default {
		name: "BottomNavigation",
		data() {
			return {
				bottomMenu: [],
			}
		},
		created() {
			this.getNavMenu('bottom');
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

<template>
    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-black p-0 m-0">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bottomNavbar" aria-controls="bottomNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse m-0 p-0" id="bottomNavbar">
            <ul class="navbar-nav mr-auto p-0">
                <li v-for="item in bottomMenu" v-if="item.children.length > 0" class="nav-item p-0 m-0 dropup">
                <li v-for="item in bottomMenu" v-else class="nav-item p-0 m-0">
                    <span v-if="item.children.length">
                        <a class="nav-link dropup-toggle"
                           :href="item.url"
                           :id="'dropup' + item.name"
                           data-toggle="dropup"
                           aria-haspopup="true"
                           aria-expanded="false">{{ item.name }}<span class="ml-2 sr-only">(current)</span></a>

                        <div class="dropup-menu" :aria-labelledby="'dropup' + item.name">
                            <a v-for="child in item.children" class="dropup-item" :href="child.url">
                                <img v-if="'' !== child.icon" :src="'/img/icons/' + child.icon" :title="child.icon" :alt="child.icon">
                                <span v-else>{{ child.name }}</span>
                            </a>
                        </div>
                    </span>
                    <span v-else>
                        <a class="nav-link p-0 mt-2 mr-3" :href="item.url" aria-haspopup="false">
                            <span v-if="item.icon">
                                <ion-icon v-if="item.icon.indexOfFrom('.') == -1" :name="item.icon" :title="item.icon"></ion-icon>
                                <img v-else :src="'/img/icons/' + item.icon" :title="item.icon" :alt="item.icon">
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
            }
        }
    }
</script>

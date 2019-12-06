<template>
  <div id="top-navigation">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-nav>
        <b-navbar-brand>
          <router-link to="/">
            <img src="/img/batcow_yellow.png">
            <img src="/img/schokoladen_schrift_yellow.png">
          </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-nav-item-dropdown
            v-for="item in topMenu"
            :key="item.id"
            :text="item.name" right
          >
            <span v-if="item.children.length > 0">
              <b-dropdown-item
                v-for="child in item.children"
                :key="child.id"
                :to="child.url"
              >
                {{ child.name }}
              </b-dropdown-item>
            </span>
            <span v-else>
              <b-dropdown-item>
                {{ item.name }}
              </b-dropdown-item>
            </span>
          </b-nav-item-dropdown>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
    import { getMenu } from "../data/api";

    export default {
        name: "TopNavigation",
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

<style scoped>
    b-navbar-brand img {
        display: inline-block;
        float: left;
        clear: none;
    }
    b-navbar-toggle,
    button.navbar-toggler {
        position: absolute;
        right: 1.0rem;
        max-width: 2.0rem;
        border: none;
    }
</style>

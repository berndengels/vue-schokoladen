<template>
    <div>
        <h3>Movies Page</h3>
        <div class="paginator">
            <jw-pagination
                    :items="movies"
                    :page-size="15"
                    @changePage="onChangePage"
            />
        </div>
        <div class="clearfix p-0 m-0">
            <div class="col-12 m-0 p-0 float-left">
                <MyMovies :page-of-items="pageOfItems" />
            </div>
            <MyMovieModal />
        </div>
    </div>
</template>

<script>
	import MyMovies from "../movies/list"
	import MyMovieModal from "../movies/modal"
	import JwPagination from "jw-vue-pagination"

	export default {
		name: "MoviesPage",
		components: { JwPagination, MyMovies, MyMovieModal },
		data() {
			return {
				movies: [],
				pageOfItems: [],
			}
		},
		created() {
			this.getMovies();
		},
		methods: {
			getMovies() {
				let url = `/api/movie`;
				iAxios
					.get(url)
					.then((response) => {
						console.info('response');
						console.info(response.data);
						this.movies = response.data;
					})
					.catch(err => {
						console.error(err);
						return err;
					});
			},
			onChangePage(pageOfItems) {
				this.pageOfItems = pageOfItems;
			},
		},
	}
</script>

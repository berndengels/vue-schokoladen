<template>
    <ul :style="ulStyles" v-if="pager.pages && pager.pages.length" class="pagination">
        <li :class="{'disabled': pager.currentPage === 1}" :style="liStyles" class="page-item first">
            <a :style="aStyles" @click="setPage(1)" class="page-link" v-html="labels.first" />
        </li>
        <li :class="{'disabled': pager.currentPage === 1}" :style="liStyles" class="page-item previous">
            <a :style="aStyles" @click="setPage(pager.currentPage - 1)" class="page-link" v-html="labels.previous" />
        </li>
        <li :class="{'active': pager.currentPage === page}" :key="page" :style="liStyles" class="page-item page-number" v-for="page in pager.pages">
            <a :style="aStyles" @click="setPage(page)" class="page-link"> {{ page }} </a>
        </li>
        <li :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles" class="page-item next">
            <a :style="aStyles" @click="setPage(pager.currentPage + 1)" class="page-link" v-html="labels.next" />
        </li>
        <li :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles" class="page-item last">
            <a :style="aStyles" @click="setPage(pager.totalPages)" class="page-link" v-html="labels.last" />
        </li>
    </ul>
</template>

<script>
	import paginate from 'jw-paginate';

	const defaultLabels = {
		first: 'First',
		last: 'Last',
		previous: 'Previous',
		next: 'Next',
	};

	const defaultStyles = {
		ul: {
			margin: 0,
			padding: 0,
			display: 'inline-block',
		},
		li: {
			listStyle: 'none',
			display: 'inline',
			textAlign: 'center',
		},
		a: {
			cursor: 'pointer',
			padding: '6px 12px',
			display: 'block',
			float: 'left',
		},
	};

	export default {
		name: "MyPaginator",
		props: {
			items: {
				type: Array,
				required: true,
			},
			initialPage: {
				type: Number,
				default: 1,
			},
			pageSize: {
				type: Number,
				default: 10,
			},
			maxPages: {
				type: Number,
				default: 10,
			},
			labels: {
				type: Object,
				default: () => defaultLabels,
			},
			styles: {
				type: Object,
				default: () => defaultStyles,
			},
			disableDefaultStyles: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				instance: null,
				pager: {},
				ulStyles: {},
				liStyles: {},
				aStyles: {},
			}
		},
		watch: {
			items() {
				this.setPage(this.initialPage);
			},
		},
		created() {
			if (!this.$listeners.changePage) {
				throw 'Missing required event listener: "changePage"';
			}

			// set default styles unless disabled
			if (!this.disableDefaultStyles) {
				this.ulStyles = defaultStyles.ul;
				this.liStyles = defaultStyles.li;
				this.aStyles = defaultStyles.a;
			}

			// merge custom styles with default styles
			if (this.styles) {
				this.ulStyles = { ...this.ulStyles, ...this.styles.ul };
				this.liStyles = { ...this.liStyles, ...this.styles.li };
				this.aStyles = { ...this.aStyles, ...this.styles.a };
			}

			// set to initial page
			this.setPage(this.initialPage);
		},
		methods: {
			setPage(page) {
				const { items, pageSize, maxPages } = this;
				// get new pager object for specified page
				const pager = paginate(items.length, page, pageSize, maxPages);

				// get new page of items from items array
				const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

				// update pager
				this.pager = pager;

				// emit change page event to parent component
				this.$emit('changePage', pageOfItems);
			},
		},
	}
</script>

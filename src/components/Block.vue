<template>
	<div v-if="!node.online">Service Offline</div>
	<div v-else-if="error"><button @click="fethBlockData">Try again</button></div>
	<div v-else-if="loading">Loading...</div>
	<div v-else class="block__container d-flex flex-column">
		<div
			class="block__container-item d-flex flex-column"
			v-for="(item, i) in myBlocks"
			:key="i"
		>
			<span class="block-number">{{ formatNumber(i + 1) }}</span>
			<span class="block-description">{{ item.attributes.data }}</span>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		name: 'block',
		props: {
			node: {
				url: String,
				online: Boolean,
				name: String,
				loading: Boolean,
				blocks: Object,
				// more informations here...
			},
		},
		async created() {
			this.fethBlockData();
		},
		data: () => ({
			loading: false,
			error: false,
		}),
		methods: {
			...mapActions(['getBlocks']),
			formatNumber(num) {
				return new Intl.NumberFormat('en', { minimumIntegerDigits: 3 }).format(
					num
				);
			},
			async fethBlockData() {
				if (this.node.online) {
					try {
						this.error = false;
						this.loading = true;
						await this.getBlocks(this.node);
					} catch (error) {
						this.error = true;
					} finally {
						this.loading = false;
					}
				}
			}
		},
		computed: {
			...mapGetters(['getNodeByUrl']),
			myBlocks() {
				return this.getNodeByUrl(this.node.url)?.blocks;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.block__container {
		grid-gap: 4px;
		&-item {
			padding: 8px;
			background: rgba(0, 0, 0, 0.12);
			border-radius: 2px;
		}

		.block-number {
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 10px;
			line-height: 16px;
			/* identical to box height, or 160% */

			letter-spacing: 1.5px;
			text-transform: uppercase;

			/* Primary Color */

			color: #304ffe;
		}
		.block-description {
			font-family: Roboto;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 20px;
			/* identical to box height, or 143% */

			letter-spacing: 0.25px;

			/* Dark Color */

			color: #263238;
		}
	}
</style>

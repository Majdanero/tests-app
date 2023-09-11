<template>
	<div :class="['TheNavigation', { 'open': mobile }]">
		<div class="navigation-logo">
			<div class="navigation-logo-box">
				<b>Testy</b>
			</div>
		</div>
		<div class="hamburger" @click="() => mobile = !mobile">
		  	<div></div>
			<div></div>
			<div></div>
		</div>

		<client-only>
			<div class="navigation-links">
				<component :is="eLinks" :o="1" @close="CloseMobile" :value="links" :eLink="eLink" :eLinks="eLinks" @toggle="Toggle"></component>
			</div>
		</client-only>
	</div>

</template>

<script setup lang="ts">
	import {compile, h} from "vue";
	import AJHide from "~/components/AJHide.vue";
 
	const config = useRuntimeConfig();
	const mobile = ref(false);
	const CloseMobile = () => {
		mobile.value = false;
	}

	const eLinks: any = h({
		inheritAttrs: false,
		props: ['value', 'eLink', 'eLinks', 'o'],
		emits: ['toggle', 'close'],
		computed: {
			padding() { return `padding-left: calc(${this.o * 15}px);` }
		},
		render: compile(`
			<ul class="links" :style="padding">
				<component :is="eLink" @close="$emit('close')" @toggle="e => $emit('toggle', e)" v-for="link in value" :o="o" :value="link" :eLink="eLink" :eLinks="eLinks"></component>
			</ul>
		`)
	})

	const eLink: any = h({
		inheritAttrs: false,
		props: ['value', 'eLink', 'eLinks', 'o'],
		emits: ['toggle', 'close'],
		components: {AJHide},
		computed: {
			margin() { return `margin-left: calc(-${this.o * 15}px);` },
			padding() { return `padding-left: calc(${this.o * 15}px);` }
		},
		render: compile(`
			<li :style="margin" :class="{link: 1, open: value.open}">
				<a v-if="value.href" @click="$emit('close')" :style="padding" :href="value.href" target="_blank">
					<div v-if="value.icon" class="link-icon" :style="'-webkit-mask-image: url(/img/icons/' + value.icon + '.svg)'"></div>
					{{value.title}} <span v-if="value.num" :class="'menu_num menu_num_'+value.title">{{value.num}}</span>
				</a>
				<router-link v-if="value.to" @click="$emit('close')" :style="padding" :to="value.to">
					<div v-if="value.icon" class="link-icon" :style="'-webkit-mask-image: url(/img/icons/' + value.icon + '.svg)'"></div>
					{{value.title}} <span v-if="value.num" :class="'menu_num menu_num_'+value.title">{{value.num}}</span>
				</router-link>
				<button v-if="value.list" :style="padding" @click="$emit('toggle', value)">
					<div v-if="value.icon" class="link-icon" :style="'-webkit-mask-image: url(/img/icons/' + value.icon + '.svg)'"></div>
					{{value.title}} <span v-if="value.num" :class="'menu_num menu_num_'+value.title">{{value.num}}</span>
				</button>
				<AJHide>
					<component :is="eLinks" @close="$emit('close')" v-if="value.open" @toggle="e => $emit('toggle', e)" :value="value.list" :o="o + 1" :eLink="eLink" :eLinks="eLinks"></component>
				</AJHide>
			</li>

		`)
	})

	const links = reactive([
		{title: 'Lista testów', icon: "dashboard", to: '/'},
	])


	const Open = (e: any) => {
		if(!e.list) return;
		e.open = true;
	}
	const Close = (e: any) => {
		if(!e.list) return;
		e.open = false;
		e.list.forEach(Close);
	}
	const Toggle = (e: any) => {
		if(e.open) Close(e);
		else Open(e);
	}
</script>

<style lang="scss">
	@import "../assets/variable";
	.TheNavigation {
		width: 340px;
		height: 100vh;
		background-color: $c_gray_2;
		position: sticky;
		border-right: 1px solid $c_gray_3;
		top: 0;
		left: 0;
		z-index: 10;

		.hamburger {
			width: 35px;
			height: 30px;
			position: fixed;
			top: 35px;
			right: 35px;
			display: none;
			cursor: pointer;

			div {
				width: 100%;
				height: 1px;
				background-color: white;
				position: absolute;
				transition: 0.3s;
				transform: translateZ(0);
				
			}
			div:nth-child(1) {
				top: 3px;
				left: 0;
			}
			div:nth-child(2) {
				top: calc(50% - 0.5px);
				left: 0;
			}
			div:nth-child(3) {
				bottom: 3px;
				left: 0;
			}
		}
		&.open {
			.hamburger {
				div:nth-child(1) {
					top: calc(50% - 0.5px);
					transform: rotate(-45deg) translateZ(0);
					left: 0;
				}
				div:nth-child(2) {
					opacity: 0;
				}
				div:nth-child(3) {
					top: calc(50% - 0.5px);
					transform: rotate(45deg) translateZ(0);;
					left: 0;
				}
			}
		}
		@media only screen and (max-width: 900px) {
			position: fixed;
			left: -100%;
			top: 0;
			width: 100%;
			transition: 0.3s;
			overscroll-behavior: contain;
			
			.hamburger {
				display: flex;
			}
			
			.navigation-logo {
				justify-content: flex-start !important;
				padding-left: 40px !important;
			}

			.navigation-links > .links {
				margin: 10px 25px 0 25px !important;
			}
			&.open {
				left: 0;
			}
		}
		.navigation-links {
			width: 100%;
			height: calc(100% - 72px - 65px);
			overflow: auto;
		}
		.navigation-logo {
			padding: 15px;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid $c_gray_3;
			position: relative;

			.navigation-logo-box {
				position: relative;
                b {
                    font-size: 24px;
                    font-weight: 700;
                }
				img {
					height: 35px;
				}

				.navigation-logo-box-desc {
					background: #26282d;
					border-radius: 6px;

					position: absolute;
					right: 0;
					bottom: -18px;
		
					padding: 2px 8px;

					font-size: 12px;	
					font-weight: 400;
					color: #61666b;
					line-height: 1.4;
				}
			}
		}
		.navigation-user {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 15px;
			background-color: $col_main_darker;
			.navigation-user-avatar {

				img {
					width: 40px;
					min-width: 40px;
					height: 40px;
					display: flex;
					border-radius: 4px;
					overflow: hidden;
				}
			}
			.navigation-user-info {
				padding-left: 10px;
				.navigation-user-info-username {
					font-weight: 600;
					font-size: 14px;
				}
				.navigation-user-info-rangs {
					font-weight: 700;
					font-size: 12px;
				}
			}

		}
		.navigation-links > .links {
			margin: 30px 45px 0 45px;

		}
		.links {
			.link {
				&>button,
				&>a {
					display: flex;
					align-items: center;
					width: 100%;
					text-align: left;
					height: 50px;
					cursor: pointer;

					@include font-other-1;
					position: relative;
					color: $c_text_2;
					transition: 0.3s;

					.link-icon {
						width: 16px;
						height: 16px;
						background-color: $c_text_2;
						mask-size: contain;
						mask-repeat: no-repeat;
						mask-position: center;
						margin-right: 10px;
						transition: 0.3s;
					}

					.menu_num {
						background: $c_main;
						border-radius: 2px;

						font-size: 13px;
						font-weight: 600;
						color: $c_text_1;
						text-align: center;

						padding: 2px 12px;
						margin: 0 0 0 15px;

						&_Support {
							&:after {
								content: " zgłoszeń";
							}
						}

						&_Przedmioty {
							background: $c_negative;
						}
					}

					&.router-link-exact-active,
					&:hover,
					&:active {
						color: $c_text_1;
						.link-icon {
							background-color: $c_text_1;
						}
					}
				}
				&>button {
					position: relative;
					&::before {
						content: '';
						width: 5px;
						height: 5px;
						border-bottom: 2.5px solid $c_text_2;
						border-left: 2.5px solid $c_text_2;
						position: absolute;
						right: 15px;

						transition: 0.3s;

						top: 55%;
						transform: translateY(-50%) rotate(135deg);
					}
					&:hover {
						&::before {
							border-bottom: 2px solid $c_text_1;
							border-left: 2px solid $c_text_1;
						}
					}
				}
				&.open {
					&>button {
						&::before {
							top: 45%;
							transform: translateY(-50%) rotate(-45deg);
						}
					}
				}
			}
		}
	}
</style>
<template lang="pug">
.TheToast
	article(v-for="(n) in list" :key="n.value.id")
			AJHide
				div(v-show="n.value.status === 1" :class="`type_${n.value.type}`")
					div
						._cls_box(@click="n.remove()")
							._cls
						p
							span(v-html="n.value.message" @click="n.remove(n.value.callback)")

</template>
<script lang="ts" setup>
import {EventBus} from "~/helpers/EventBus";
import {Common} from "~/helpers/Common";
import AJHide from "./AJHide.vue";

const list: any = reactive([]);
const id = ref(0);
EventBus.On('@Client->Toast', async ({message, time, type, callback}: any) => {
	id.value += 1;
	const el : any = ref({ message, callback, type, status: 0, id: id.value})
	list.push(el);
	const remove = async () => {
		el.value.status = 2;
		await Common.Wait(300);
		list.splice(list.indexOf(el), 1);
	}
	el.autoRemove = setTimeout(remove, time)
	el.remove = (c) => {
		if(c) c()
		clearTimeout(el.value.autoRemove);
		remove();
	}
	await Common.Wait(300);
	el.value.status = 1;
});
</script>
<style lang="scss">
@import "../assets/variable";
.TheToast {
	width: 400px + 40px;
	height: 100vh;
	position: fixed;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	z-index: 9999999;
	pointer-events: none;

	article {
		& > div {
			pointer-events: all;
			* {
				pointer-events: all;
			}
			& > div {
				width: calc(100% - 40px);
				margin: 0 20px 20px 20px;
				position: relative;
				display: flex;
				align-items: center;
				overflow: hidden;
				border-radius: 4px;
				._cls_box {
					position: absolute;
					top: 0;
					right: 0;
					width: calc(16px + 12px + 12px);
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
				._cls {
					width: 16px;
					height: 16px;
					cursor: pointer;
					position: relative;
					&::after, &::before {
						pointer-events: none;
						content: '';
						width: calc(100%);
						height: 1px;
						background-color: $col_white;
						position: absolute;
						top: 50%;
						left: 50%;
					}

					&::after {
						transform: translate(-50%, -50%) rotate(45deg);
					}

					&::before {
						transform: translate(-50%, -50%) rotate(-45deg);
					}
				}


				& > p {
					position: relative;
					z-index: 2;
					padding: 20px 32px 20px 14px;
					pointer-events: none;
					display: flex;
					align-items: center;
					flex-direction: column;
					span {
						font-weight: 500;
						font-size: 16px;
						line-height: 20px;
						letter-spacing: 0.25px;
						b {
							font-weight: 600;
							font-size: 16px;
							line-height: 20px;
							letter-spacing: 0.25px;
						}
					}

				}
			}

			$type_list:
				"0" $col_green,
				"1" $col_yellow,
				"2" $col_red;
			@each $type, $color1 in $type_list {
				&.type_#{$type} {
					& > div {
						background: $col_bg linear-gradient(rgba($color1, 0.4),rgba($color1, 0.4));
					}
				}
			}
		}
	}

}
</style>
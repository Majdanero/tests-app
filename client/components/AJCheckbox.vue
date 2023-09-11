<template lang="pug">
label.AJ_Checkbox(:class="{block: props.block !== false}")
	input(v-model="now" type="checkbox" @change="OnChange")
	div
		.ver
	p
		slot
</template>

<script setup lang="ts">
import {ref, watch} from "#imports";

const props = defineProps({
	modelValue: {
		required: true,
	},
	block: {
		default: false,
		required: false,
		type: Boolean
	},
	number: {
		default: false,
		required: false,
		type: Boolean
	}
})
const emit = defineEmits(['emit', 'update:modelValue'])
const now = ref(false);
const OnProp = () => {
	now.value = Boolean(props.modelValue);
}
const OnChange = () => {
	const prev = now.value;
	const n = props.number !== false ? Number(now.value) : now.value;
	emit("update:modelValue", n);
	emit("emit", {now: n, prev});
}


watch(() => props.modelValue, OnProp);
OnProp();

const list = reactive([
	{
		rounds: 3,
	}
])

</script>

<style lang="scss">
@import "/assets/variable";
.AJ_Checkbox {
	display: flex;
	flex-direction: row;
	height: 70px;
	cursor: pointer;
	align-items: flex-end;
	transition: 0.3s;
	input {
		display: none;
	}
	&>div {
		width: 44px;
		min-width: 44px;
		height: 44px;
		min-height: 44px;
		border: 1px solid $c_gray_3;
		border-radius: 4px;
		transition: 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		.ver {
			width: 6px;
			height: 10px;
			margin-left: -2px;
			margin-top: -4px;
			opacity: 0;
			transform: scale(0);
			transition: 0.3s;
			&::after {
				content: '';
				display: flex;
				height: 100%;
				width: 100%;
				border-right: 2px solid $c_gray_3;
				border-bottom: 2px solid $c_gray_3;
				transform: rotate(35deg);
				transition: 0.3s;
			}
		}
	}
	input:hover + div {
		//border-color: $c_positive;
		.ver {
			opacity: 0.25;
			transform: scale(1);
			&::after {
				border-right: 2px solid $c_main;
				border-bottom: 2px solid $c_main;
			}
		}
	}
	input:checked + div {
		.ver {
			opacity: 1;
			transform: scale(1);
			&::after {
				border-right: 2px solid $c_main;
				border-bottom: 2px solid $c_main;
			}
		}
	}
	p {
		height: 44px;
		align-items: center;
		display: flex;
		width: 100%;
		pointer-events: none;
		user-select: none;
        white-space: nowrap;
		color: $c_text_2;
		@include font-normal;
		margin-left: 10px;
	}
	&.block {
		opacity: 0.5;
		pointer-events: none;
	}
}
</style>
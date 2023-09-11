<template lang="pug">
label.G_Input(:class="{small: !$slots.default, block: props.block !== false, lock: props.lock !== false, error: error, focus: focus}" ref="el_input" @click="OnClick")
	.header(v-if="$slots.default" )
		slot
	.content
		input(:name="props.name" autocomplete="on" v-model="now" :disabled="props.block !== false" @change="OnChange" @input="OnInput" :placeholder="placeholder" :type="props.type" @focus="OnFocus" @blur="OnBlur")
		.close(@click="OnRemove")
	.error(v-if="error && props.error" ) {{props.error}}

</template>

<script setup lang="ts">
import {onMounted, watch, ref} from "#imports";
import * as Vue from 'vue';

const now = ref('')
const prev = ref('')

const props = defineProps({
	modelValue: {
		required: false,
		type: [String, Number, Array] as Vue.PropType<Array<string | number> | number | string>
	},
	autocomplete: {
		default: 'off',
		required: false,
		type: String as Vue.PropType<Array<string | number> | number | string>
	},
	value: {
		default: undefined,
		required: false,
		type: String as Vue.PropType<Array<string | number> | number | string>
	},
	validator: {
		required: false,
	},
	error: {
		default: 'Value is invalid',
		required: false,
		type: String as Vue.PropType<string>
	},
	placeholder: {
		default: '',
		required: false,
		type: String as Vue.PropType<string>
	},
	type: {
		default: 'text',
		required: false,
		type: String as Vue.PropType<'text' | 'number'>
	},
	lock: {
		default: false,
		required: false,
		type: Boolean
	},
	block: {
		default: false,
		required: false,
		type: Boolean
	},
	input: {
		default: false,
		required: false,
		type: Boolean
	},
	name: {
		default: '',
		required: false,
		type: String
	}
})
const emit = defineEmits(['emit', 'update:modelValue', 'click'])
const error = ref(false);
const focus = ref(false);
const OnClick = (e: MouseEvent) => {
  emit('click', e);
}
const OnProp = () => {
	now.value = String(props.value || props.modelValue);
	prev.value = JSON.parse(JSON.stringify(now.value))
}
const OnFocus = () => {
	error.value = false
	focus.value = true;
}
const OnBlur = () => {
	focus.value = false;
	OnChange();
}
const OnInput = () => {
	error.value = false;
	if(props.input !== false) {
		const data  = {
			prev: prev.value,
			now: props.type === "number" ? Number(now.value) : String(now.value).trim()
		};
		Update(data);
	}
}
const OnRemove = () => {
	const data  = {
		prev: prev.value,
		now: ''
	};
	Update(data);
}
const OnChange = () => {
	error.value = false;
	const data  = {
		prev: prev.value,
		now: props.type === "number" ? Number(now.value) || '' : String(now.value).trim()
	};
	if(typeof props.validator === 'function' && !props.validator(data.now)) error.value = true;
	else Update(data);
}
const Update = (data: {prev: string | number, now: string | number}) => {
	emit('update:modelValue', data.now);
	emit('emit', data);
}
onMounted(OnProp);
watch(() => props.value, () => OnProp());
watch(() => props.modelValue, () => OnProp());



</script>

<style lang="scss">
@import '../assets/variable';
.G_Input {
	width: 100%;
	height: 70px;
	position: relative;

	display: flex;
	flex-direction: column;
	transition: 0.3s;
	//background-color: green;
	.header {
		width: 100%;
		display: flex;
		align-items: center;
		pointer-events: none;
		user-select: none;
		color: $c_text_2;
		@include font-normal;
		height: calc(100% - 40px);
		margin-bottom: 6px;
	}
	.content {
		border: 1px solid rgba($c_gray_3, 1);
		border-radius: 4px;
		transition: 0.3s;
		position: relative;
		z-index: 2;
		width: calc(100%);
		padding-right: 42px;
		padding-left: 15px;
		height: 44px;
		min-height: 44px;
		display: flex;
		align-items: center;
		&>input {
			display: flex;
			height: 17px;
			width: 100%;
			color: $c_text_1;
			@include font-normal;
			-moz-appearance: textfield;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			&::placeholder {
				color: $c_text_2;
				@include font-normal;
			}
			&:-webkit-autofill {
				-webkit-text-fill-color: $col_white;
				-webkit-background-clip: text;

			}

		}
		.close {
			width: 32px;
			height: 32px;
			cursor: pointer;
			position: absolute;
			top: calc((100% / 2) - 16px);
			right: 0px;
			z-index: 2;
			&::after, &::before {
				content: '';
				display: flex;
				width: 12px;
				height: 2px;
				position: absolute;
				top: 50%;
				left: 50%;
				background-color: $c_text_2;
				transition: 0.3s;
			}
			&::after {
				transform: translate(-50%, -50%) rotate(-45deg);
			}
			&::before {
				transform: translate(-50%, -50%) rotate(45deg);
			}
			&:hover {
				&::after, &::before {
					background-color: $c_main;
				}
			}
		}

	}
	.error {
		position: absolute;
		top: calc(100% + 5px);
		left: 10px;
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 1px;
		color: $col_red;
	}
	&.focus {
	}
	&.dark {
		.content {
			background-color: $c_gray_2;
		}
	}
	&.error {
		.content {
			border: 1px solid rgba($col_red, 0.4);
		}
	}
	&.block {
		opacity: 0.5;
		pointer-events: none;
	}
	&.lock {
		pointer-events: none;
		.close {
			opacity: 0;
		}
	}
	&.click {
		cursor: pointer;
		* {
			pointer-events: none;
		}
		&:hover {}
	}
	&.notRemove {
		.content {
			padding-right: 15px;
			input {
				@include font-normal-bold;
			}
		}
		.close {
			display: none !important;
		}
	}
	&.small {
		height: 44px;
	}
}
</style>

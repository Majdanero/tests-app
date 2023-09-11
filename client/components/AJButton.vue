<template lang="pug">
button.AJButton(:class="{block: block !== false}" :type="type" :disabled="props.block !== false" @click="OnClick")
	slot
</template>

<script setup lang="ts">
const props = defineProps({
	block: {default: false},
	type: {default: ''}
})
const emit = defineEmits(['click'])
const OnClick = (e: MouseEvent) => {
  emit('click', e);
}
</script>

<style lang="scss">
	@import "../assets/variable";
	.AJButton {
		width: 100%;
		height: 52px;
		min-height: 52px;
		border-radius: 2px;
		text-align: center;
		white-space: nowrap;
		cursor: pointer;
		padding: 0 20px;
		transition: 0.3s;

		&.user_rank {
			color: $c_main;
		}

		&.medium {
			height: 44px;
			min-height: 44px;
			border-radius: 4px;
			padding: 0 15px;
		}

		@include font-normal-bold;
		color: $c_text_1;

		&.max {
			width: max-content;
		}
		
		&.full {
			width: 100%;
		}

		&.center {
			margin: 0 auto;
		}

		p {
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 18px;
				margin-right: 10px;
			}

			.icon {
				width: 11px;
				height: 11px;
				margin-right: 10px;
				mask-size: contain;
				mask-position: center;
				mask-repeat: no-repeat;
				display: flex;
				background-color: $col_white;
			}
			span {
				font-style: normal;
				font-weight: 500;
				font-size: 12px;
				line-height: 9px;
				text-align: center;
				letter-spacing: 1px;
				text-transform: uppercase;
				&.red, &.green {
					margin-left: 5px;
					font-weight: 700;
					letter-spacing: 0.5px;
				}
				&.red {
					color: $col_red;

				}
				&.green {
					color: $col_green;
				}
			}
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 10px;
			text-align: center;
			letter-spacing: 1px;
			text-transform: uppercase;
		}

		&.small {
			height: 22px;
			min-height: 22px;
			padding: 0 10px !important;
			@include font-normal;
		}
		&.medium {
			height: 44px;
			min-height: 44px;

		}
		@mixin colorize($color) {
			border: 1px solid $color !important;
			&:not(.empty) {
				background-color: rgba($color, 1) !important;
				&:hover {
					opacity: 0.75;
				}
				&:active {
					opacity: 0.25;
				}
			}
			.empty {
				color: $color;
			}

		}

		@include colorize($c_main);
		&.green {@include colorize($c_positive);}
		&.red {@include colorize($c_negative);}
		&.orange {@include colorize($c_orange_1);}
		&.gray {@include colorize($c_text_2);}
		&.gray2 {@include colorize($c_gray_3);}
		&.block {
			pointer-events: none;
			opacity: 0.5;
		}
		
		&.lock {
			pointer-events: none;
		}

		&.bold {
			@include font-normal-bold;

		}

		&:disabled {
			background-color: #26282d !important;
			border: 1px solid #26282d !important;
			color: #5a5d65;
			pointer-events: none;
		}
	}
</style>
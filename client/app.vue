<template lang="pug">
#app
    NuxtLayout
        NuxtPage

</template>

<script setup lang="ts">
import {API} from "~/helpers/API";

onMounted(async () => {
    const result = await API.Get('/');
    console.log(result)
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import "/assets/variable.scss";

::-webkit-scrollbar {
    width: 6px;
    background-color: $scroll;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: $scroll_bar;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    cursor: pointer;
}

::-webkit-scrollbar-track {
    background-color: $scroll;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    width: 6px;
}
.title {
	@include font-title
}
* {
    margin: 0;
    padding: 0;

    font-family: 'Poppins', sans-serif;
    text-rendering: geometricprecision;
    color: $c_text_1;
    font-style: normal;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.25px;
    background: none;
    box-shadow: none;
    border: none;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}
body {
    background-color: $c_gray_1;
}
.grid {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	align-items: flex-end;
	&.up {
		align-items: flex-start;
	}
	&.center {
		align-items: center;
	}
	&.down {
		align-items: flex-end;
	}
	.slot {
        &.row {
            display: flex;
            align-items: flex-end;
        }
		&.flex {
			display: flex;
			&.down {
				align-items: flex-end;
			}
			&.end {
				justify-content: flex-end;
			}
		}
		&.up {
			align-self: flex-start;
		}
		@for $i from 0 through 12 {
			&.md-#{$i} {
				width: calc((100% / 12) * #{$i});
			}

		}
		&.md-0 {
			display: none;
		}
		@media only screen and (max-width: 1600px) {
			@for $i from 0 through 12 {
				&.mm-#{$i} {
					width: calc((100% / 12) * #{$i});
				}
			}
			&.mm-0 {
				display: none;
			}
		}
		@media only screen and (max-width: 1200px) {
			@for $i from 0 through 12 {
				&.sm-#{$i} {
					width: calc((100% / 12) * #{$i});
				}
			}
			&.sm-0 {
				display: none;
			}
		}
		@media only screen and (max-width: 800px) {
			@for $i from 0 through 12 {
				&.xs-#{$i} {
					width: calc((100% / 12) * #{$i});
				}
			}
			&.xs-0 {
				display: none;
			}
		}
	}
}

.container {
	max-width: 100%;
	margin: 0 auto;
	padding: 20px 20px;
}

.pa-0 {
	padding: 10px;
}

.full {
	width: 100%;
}
.max {
    width: max-content;
}
</style>
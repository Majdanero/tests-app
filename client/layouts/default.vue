<template lang="pug">
.layout-default
    TheNavigation
    TheToast
    .page-content
        .container
            slot
</template>
<script setup lang="ts">
import TheNavigation from "~/components/TheNavigation.vue";
import TheToast from "~/components/TheToast.vue";
useHead({
	meta: [
		{name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'}
	]
})

</script>

<style lang="scss">
@import "../assets/variable";
.layout-default {
	display: flex;
	.page-content {
		width: calc(100% - 340px);
		padding: 65px 0 0 0;
		
		transition: 0.3s;
	}

	@media only screen and (max-width: 900px) {
		.page-content {
			width: 100%;
   
		}
	}
}
</style>
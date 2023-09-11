<template lang="pug">
transition(name="expand" @enter="Enter" @after-enter="AfterEnter" @leave="Leave")
	slot
</template>
<script setup>

const Enter = (element) => {

	element.style.width = getComputedStyle(element).width;
	element.style.position = 'absolute';
	element.style.visibility = 'hidden';
	element.style.height = 'auto';
	const height = getComputedStyle(element).height;
	element.style.width = null;
	element.style.position = null;
	element.style.visibility = null;
	element.style.height = 0;
	element.style.opacity = 0;
	getComputedStyle(element).height;
	setTimeout(() => {
		element.style.height = height;
		element.style.opacity = 1;
	});
}
const AfterEnter = (element) => {
	element.style.height = 'auto';
}
const Leave = (element) => {
	element.style.height = getComputedStyle(element).height;
	getComputedStyle(element).height;
	setTimeout(() => {
		element.style.height = 0;
		element.style.opacity = 0;
	});
}
</script>
<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
	transition: height 0.5s, opacity 0.5s, transform 0.5s;
	overflow: hidden;
}
.expand-enter-active,
.expand-enter,
.expand-leave-to {
	height: 0;
	opacity: 0;
	transition: height 0.5s, opacity 0.5s, transform 0.5s;
}

* {
	will-change: height;
	backface-visibility: hidden;
	transform: translateZ(0);
	perspective: 1000px;
}

</style>
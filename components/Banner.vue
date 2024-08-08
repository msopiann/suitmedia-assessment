<template>
  <div class="mt-[83px] relative overflow-hidden h-[90vh]">
    <img
      :src="imageSrc"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
      alt="Banner Image"
      class="absolute inset-0 w-full h-full object-cover object-center z-0 banner-image"
    />
    <div class="absolute inset-0 z-10 banner-overlay"></div>
    <div class="relative z-20 flex flex-col items-center justify-center h-full">
      <h1 class="text-white text-4xl md:text-6xl lg:text-8xl font-bold">
        Ideas
      </h1>
      <p class="text-white text-lg md:text-xl lg:text-2xl mt-4">
        Where all our great things begin
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const defaultImageSrc = "/img/default-banner.webp";
const imageSrc = ref(defaultImageSrc);
const parallaxOffset = ref(0);

const fetchImageFromCMS = async () => {
  try {
    const response = await fetch("/api/get-banner-image");
    if (response.ok) {
      const data = await response.json();
      if (data.imageUrl) {
        imageSrc.value = data.imageUrl;
      }
    } else {
      console.error("Failed to fetch image from CMS");
    }
  } catch (error) {
    console.error("Error fetching image from CMS:", error);
  }
};

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.5;
};

onMounted(() => {
  fetchImageFromCMS();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.banner-image {
  clip-path: polygon(0 0, 100% 0, 100% 55%, 0 100%);
}
.banner-overlay {
  background: rgba(0, 0, 0, 0.5);
  clip-path: polygon(0 0, 100% 0, 100% 55%, 0 100%);
}
</style>

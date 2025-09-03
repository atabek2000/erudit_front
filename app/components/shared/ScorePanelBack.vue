<template>
  <div class="bg-white fixed w-full lg:hidden z-50 px-4 py-3 flex gap-3">
    <nuxt-link @click="$router.go(-1)">
      <img src="~/assets/svg/arrow_left.svg" alt="img" class="w-7 h-7" />
    </nuxt-link>
    <SharedScorePanel class="justify-around flex-1" />
  </div>
</template>

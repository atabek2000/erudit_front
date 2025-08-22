<template>
  <div>
    <Header />
    <div class="pt-[70px] md:pt-[95px] min-h-[80vh]">
      <slot></slot>
    </div>
    <!-- v-if="
        !$route.path.includes('cabinet/lessons/test') &&
        !$route.path.includes('cabinet/lessons/vide')
      " -->
    <Footer />
  </div>
</template>

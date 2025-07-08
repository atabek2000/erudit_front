<script setup></script>
<template>
  <div class="">
    <Header :hasMenu="true" />
    <div class="bg-wild-sand-300 pt-[70px] md:pt-[95px] h-[95vh]">
      <div class="px-4 py-3 bg-white fixed w-full lg:hidden z-50">
        <SharedScorePanel class="justify-around" />
      </div>
      <div class="mt-[60px] lg:mt-0">
        <div class="lg:main-container flex gap-6 py-0 lg:py-10">
          <WidgetsCabinetMenu class="hidden lg:block lg:fixed" />

          <div class="flex-1 lg:ml-[300px] pb-20">
            <slot></slot>
          </div>

          <div
            class="lg:hidden fixed bottom-0 left-0 right-0 bg-white w-full border-t border-t-wild-sand z-50"
          >
            <WidgetsCabinetMenu />
          </div>
        </div>
      </div>
    </div>
    <!-- <Footer class="mb-16" /> -->
  </div>
</template>

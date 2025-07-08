<script setup></script>
<template>
  <div>
    <Header :hasMenu="true" />
    <div
      class="bg-gradient-to-r from-purple-heart to-dodger-blue pt-[70px] md:pt-[95px] min-h-[80vh]"
    >
      <div class="main-container flex gap-6 py-10">
        <WidgetsCabinetMenu class="hidden lg:block lg:fixed" />

        <div class="flex-1 rounded-xl lg:ml-[300px]">
          <slot></slot>
        </div>

        <div
          class="lg:hidden fixed bottom-0 left-0 right-0 bg-white w-full border-t border-t-wild-sand"
        >
          <WidgetsCabinetMenu />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<template>
  <div>
    <Header :hasMenu="true" />
    <div class="bg-wild-sand-300 pt-[95px] min-h-[80vh]">
      <div class="main-container flex gap-6 py-10">
        <WidgetsCabinetMenu class="hidden md:block md:fixed" />

        <div class="flex-1 bg-white rounded-xl md:ml-[300px]">
          <slot></slot>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

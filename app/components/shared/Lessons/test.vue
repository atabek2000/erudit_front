<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "#58CC02",
  },
  shadow: {
    type: String,
    default: "#58A700",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const open = ref(false);

// Обработчик, который закрывает Popover
function onScroll() {
  open.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="relative w-fit">
    <UPopover v-model:open="open" arrow :ui="{ content: 'rounded-xl ring-0' }">
      <button
        class="rounded-full w-fit p-4 md:p-7 relative transition duration-100 ease-in-out cursor-pointer rotate-x-[30deg]"
        :class="{
          'hover:opacity-80 active:translate-y-[6px] active:!shadow-none':
            !disabled,
        }"
        :style="{
          background: disabled ? '#F2F2F7' : color,
          boxShadow: `0 6px 0 0 ${disabled ? '#949494' : shadow}`,
        }"
        :disabled="disabled"
      >
        <img
          v-if="disabled"
          src="~/assets/svg/lesson/test_gray.svg"
          alt="video"
          class="w-[40px] md:w-[55px]"
        />
        <img
          v-else
          src="~/assets/svg/lesson/test.svg"
          alt="video"
          class="w-[40px] md:w-[55px]"
        />
      </button>
      <template #content>
        <div
          class="px-5 py-3 rounded-xl text-white"
          :style="{ background: color }"
        >
          <p class="text-base font-semibold">Пройдите доступный урок</p>
          <p class="text-sm font-medium mt-1">Урок 1 из 100</p>

          <UButton
            class="mt-4 bg-white hover:bg-white"
            :style="{ color: color }"
            >Начать</UButton
          >
        </div>
      </template>
    </UPopover>
  </div>
</template>

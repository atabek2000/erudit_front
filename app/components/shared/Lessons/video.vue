<script setup>
const route = useRoute();
const { live } = useAttribute();
const { hasPremium } = useCustomAuth();

const emits = defineEmits(["openLiveEnd"]);

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
  lesson: {
    type: Object,
    default: {},
  },
  lesson_amount: {
    type: Number,
    default: 100,
  },
});

const open = ref(false);

// Обработчик, который закрывает Popover
function onScroll() {
  open.value = false;
}

const openVideo = () => {
  if (hasPremium.value || live().value > 0)
    useFetchApi("lesson/store", {
      method: "POST",
      body: { id: props.lesson.id },
    }).then(() => {
      navigateTo(
        `/cabinet/lessons/video/${props.lesson.id}?subject=${route.query.subject_id}`
      );
    });
  else emits("openLiveEnd");
};

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
        :class="'hover:opacity-80 active:translate-y-[6px] active:!shadow-none'"
        :style="{
          background: disabled ? '#F2F2F7' : color,
          boxShadow: `0 6px 0 0 ${disabled ? '#949494' : shadow}`,
        }"
      >
        <img
          v-if="disabled"
          src="~/assets/svg/lesson/video_gray.svg"
          alt="video"
          class="w-10 md:w-[55px]"
        />
        <img
          v-else
          src="~/assets/svg/lesson/video.svg"
          alt="video"
          class="w-10 md:w-[55px]"
        />
      </button>

      <template #content>
        <div
          class="px-5 py-3 rounded-xl"
          :class="disabled ? 'text-cod-gray' : 'text-white'"
          :style="{ background: disabled ? 'white' : color }"
        >
          <p class="text-base font-semibold">
            {{
              disabled ? $t("lesson_unavailable") : $t("take_available_lesson")
            }}
          </p>
          <p class="text-sm font-medium mt-1">
            {{
              $t("lesson_1_of_100", {
                number: lesson.index,
                from: lesson_amount,
              })
            }}
          </p>

          <UButton
            v-if="!disabled"
            @click="openVideo"
            class="mt-4 bg-white hover:bg-white"
            :style="{ color: color }"
            >{{ $t("begin") }}</UButton
          >
        </div>
      </template>
    </UPopover>
  </div>
</template>

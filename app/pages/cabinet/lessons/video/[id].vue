<script setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
const route = useRoute();
const { locale } = useI18n();
const { data } = await useAPI(`lesson?id=${route.params?.id}`, {
  watch: [locale],
});

const videooptions = ref({
  autoplay: false,
  controls: true,
  width: "100%",
  height: "auto",
  aspectRatio: "16:9",
  sources: [
    {
      src: useRuntimeConfig().public.API_STORAGE + data.value?.data?.[0]?.video,
      type: "video/mp4",
    },
  ],
});

const videoPlayer = ref(null);
let player = null;

const finish = () => {
  useFetchApi("lesson/end", {
    method: "POST",
    body: { id: route.params?.id },
  }).then(() => {
    navigateTo(`/cabinet/lessons?subject_id=${route.query.subject}`);
  });
};

// если изменился язык
watch(data, () => {
  if (videoPlayer.value) {
    player.src({
      src: useRuntimeConfig().public.API_STORAGE + data.value?.data?.[0]?.video,
      type: "video/mp4",
    });
    // player.play();
  }
});

onMounted(() => {
  player = videojs(videoPlayer.value, videooptions.value);
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
  }
});
</script>

<template>
  <main class="py-0 lg:py-10 bg-wild-sand-300">
    <SharedScorePanelBack />
    <div class="lg:main-container pt-16 md:pt-0">
      <div class="bg-white py-6 px-4 md:px-8 lg:rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ data?.data?.[0]?.subject_name }}
          </p>
          <SharedScorePanel class="hidden lg:flex" />
        </div>

        <div class="tiny-container mt-6">
          <p class="text-xl font-medium text-cod-gray">
            {{ data?.data?.[0]?.title }}
          </p>
          <video
            ref="videoPlayer"
            class="video-js w-full aspect-video mt-4"
            controls
            preload="auto"
            data-setup="{}"
          >
            <source
              v-for="src in videooptions?.sources"
              :key="src.src"
              :src="src.src"
              :type="src.type"
            />
          </video>

          <div
            class="rounded-2xl p-4 border border-black/5 bg-wild-sand-200 mt-4"
          >
            <p class="text-base font-semibold text-bunting">
              {{ $t("description") }}
            </p>

            <p class="text-sm font-medium text-cod-gray/60 mt-2">
              {{ data?.data?.[0]?.description }}
            </p>
          </div>

          <div
            class="rounded-2xl p-4 border border-black/5 bg-wild-sand-200 mt-4 flex gap-3"
          >
            <div class="flex-1">
              <p class="text-base font-semibold text-bunting">
                {{ $t("lessonSummary_title") }}
              </p>
              <p class="text-sm font-medium text-cod-gray/60 mt-2">
                {{ $t("lessonSummary_description") }}
              </p>
            </div>
            <nuxt-link
              target="_blank"
              :to="useRuntimeConfig().public.API_STORAGE + data?.data?.[0]?.pdf"
            >
              <img src="~/assets/svg/pdf.svg" alt="pdf" />
            </nuxt-link>
          </div>

          <UButton @click="finish" class="mt-4">
            {{ $t("lesson_pass") }}
          </UButton>
        </div>
      </div>
    </div>
  </main>
</template>

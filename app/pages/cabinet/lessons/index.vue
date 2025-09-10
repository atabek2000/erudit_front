<script setup>
const route = useRoute();
const { hasPremium, fetchUser } = useCustomAuth();
const { data } = await useAPI(
  `list/modules?subject_id=${route.query.subject_id}`
);

const isPremiumOpen = ref(false);
const isLiveEndOpen = ref(false);

const getInfo = (m_index, l_index, lesson, lessons) => {
  const info = {
    color: "#F2F2F7",
    shadow: "#949494",
    disabled: true,
  };
  if (lesson?.user_progress?.status === "ended") {
    info.color = "#FBBC05";
    info.shadow = "#A57D0A";
    info.disabled = false;
  } else if (
    lesson?.user_progress?.status === "active" ||
    // первый доступный урок (если еще не начал)
    (m_index == 0 && l_index == 0) ||
    // последний доступный урок
    (l_index > 0 &&
      lessons?.[l_index - 1]?.user_progress?.status == "ended" &&
      !lesson?.user_progress?.status)
  ) {
    info.color = "#58CC02";
    info.shadow = "#58A700";
    info.disabled = false;
  }

  return info;
};

const generateBrainsNumber = (index) => {
  return `/brains/brain${getCycleNumber(index)}.png`;
};

function getCycleNumber(index) {
  // index = 1, 7, 13, ...
  const k = Math.floor((index - 1) / 6) + 1; // порядковый номер
  return ((k - 1) % 4) + 1;
}

onMounted(async () => {
  await fetchUser();
  generateBrains();
  setTimeout(() => {
    if (!hasPremium.value) {
      isPremiumOpen.value = true;
    }
  }, 1000);
});

definePageMeta({
  layout: "menu",
});
</script>

<template>
  <main class="bg-white lg:rounded-xl px-4 md:px-8 relative">
    <div class="flex justify-end absolute right-4 top-4">
      <SharedScorePanel class="hidden md:flex" />
    </div>
    <div class="overflow-y-auto relative">
      <div v-for="(module, m_index) in data?.data" :key="module.id">
        <SharedLessonsName
          background="#FFEBF8"
          :title="module.name"
          :text="module.description"
          class="mt-4 lg:mt-6"
        />

        <div class="max-w-[50%] w[370px] mx-auto mt-8 pb-4">
          <div v-for="(ls, index) in module?.sub_modules" :key="ls">
            <div
              v-if="index % 6 == 1"
              class="absolute w-20 md:w-40 h-20 md:h-40"
              :style="{
                left: getCycleNumber(index) % 2 == 0 ? 'auto' : '10%',
                right: getCycleNumber(index) % 2 == 0 ? '10%' : 'auto',
              }"
            >
              <img
                :src="generateBrainsNumber(index)"
                alt="Brain"
                class="w-full h-full object-contain"
              />
            </div>
            <SharedLessonsVideo
              v-if="ls.type === 'lesson'"
              :class="{
                'mx-auto': index == 0 || index % 4 == 2 || index % 4 === 0,
                'ml-auto': index % 4 == 1,
              }"
              :color="getInfo(m_index, index, ls, module?.sub_modules).color"
              :shadow="getInfo(m_index, index, ls, module?.sub_modules).shadow"
              :disabled="
                getInfo(m_index, index, ls, module?.sub_modules).disabled
              "
              :lesson="ls"
              :lesson_amount="module.sub_modules.length"
              @openLiveEnd="isLiveEndOpen = true"
            />
            <SharedLessonsTest
              v-else
              :class="{
                'mx-auto': index == 0 || index % 4 == 2 || index % 4 === 0,
                'ml-auto': index % 4 == 1,
              }"
              :color="getInfo(m_index, index, ls, module?.sub_modules).color"
              :shadow="getInfo(m_index, index, ls, module?.sub_modules).shadow"
              :disabled="
                getInfo(m_index, index, ls, module?.sub_modules).disabled
              "
              :lesson="ls"
              :lesson_amount="module.sub_modules.length"
              @openLiveEnd="isLiveEndOpen = true"
            />
          </div>
        </div>
      </div>
    </div>
    <ModalsPremium v-model="isPremiumOpen" />
    <ModalsTestLiveEnd v-model="isLiveEndOpen" :hasExitButton="false" />
  </main>
</template>

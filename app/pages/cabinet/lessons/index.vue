<script setup>
definePageMeta({
  layout: "menu",
});

const lessons = [
  "video",
  "test",
  "video",
  "test",
  "video",
  "test",
  "video",
  "test",
  "video",
  "test",
  "video",
  "test",
  "video",
  "test",
];

const isPremiumOpen = ref(true);
</script>

<template>
  <main class="px-4 md:px-8 relative">
    <div class="flex justify-end absolute right-4 top-4">
      <SharedScorePanel score="10" life="6" diamond="8" />
    </div>
    <div class="overflow-y-auto">
      <img
        src="/temp/lesson1.png"
        alt="img"
        class="absolute top-[260px] md:top-[250px] left-1/2 -translate-y-1/2 w-1/2 p-10 md:p-20 max-w-[380px]"
      />
      <img
        src="/temp/lesson2.png"
        alt="img"
        width="167"
        height="167"
        class="absolute top-[940px] md:top-[900px] right-1/2 -translate-y-1/2 w-1/2 p-10 md:p-20 max-w-[380px]"
      />
      <SharedLessonsName
        background="#FFEBF8"
        title="Откройте 1 модуль по Истории!"
        text="Пройдите еще 20 уроков, чтобы вступить в состязание"
        class="mt-12 md:mt-6"
      />
      <div class="max-w-[370px] mx-auto mt-8 relative">
        <div v-for="(ls, index) in lessons" :key="ls">
          <SharedLessonsVideo
            v-if="ls === 'video'"
            :class="{
              'mx-auto': index % 4 == 1 || index % 4 == 3,
              'ml-auto': index % 4 == 2,
            }"
            :disabled="index > 5"
            color="#FBBC05"
            shadow="#A57D0A"
          />
          <SharedLessonsTest
            v-else
            :class="{
              'mx-auto': index % 4 == 1 || index % 4 == 3,
              'ml-auto': index % 4 == 2,
            }"
            :disabled="index > 5"
          />
        </div>
      </div>
    </div>
    <ModalsPremium v-model="isPremiumOpen" />
  </main>
</template>

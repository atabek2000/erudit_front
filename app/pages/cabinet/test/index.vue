<script setup>
definePageMeta({
  layout: "menu",
});
</script>

<template>
  <main class="pb-10">
    <div
      class="flex lg:hidden gap-2 p-3 w-full bg-selective-yellow-600/35 rounded-2xl items-center mb-2"
    >
      <img src="/lamp.png" alt="lamp" />
      <div>
        <p class="text-sm font-medium text-cod-gray">
          {{ $t("free_first_test") }}
        </p>
        <p class="text-sm font-medium text-cod-gray">
          {{ $t("premium_required_after") }}
        </p>
      </div>
    </div>
    <div class="bg-white lg:rounded-xl px-4 py-4 md:px-8 md:py-6">
      <div class="">
        <p class="text-xl font-semibold text-black">{{ $t("subjects") }}</p>
        <p class="text-base font-normal text-scorpion mt-2">
          {{ $t("select_subjects") }}
        </p>
      </div>

      <p class="text-base font-medium text-shark/70 mt-6">
        {{ $t("main_subjects") }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-4 gap-x-8 gap-y-6">
        <SharedSubjectCard v-for="i in 3" :key="i" />
      </div>
      <p class="text-base font-medium text-shark/70 mt-6">
        {{ $t("profile_subjects") }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-4 gap-x-8 gap-y-6">
        <SharedSubjectCard v-for="i in 9" :key="i" />
      </div>

      <div
        class="hidden lg:flex gap-2 p-3 w-full bg-sea-buckthorn/10 rounded-2xl mt-6 items-center"
      >
        <img src="/lamp.png" alt="lamp" />
        <div>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("free_first_test") }}
          </p>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("premium_required_after") }}
          </p>
        </div>
      </div>

      <UButton
        to="/cabinet/test/start"
        class="mt-6 fixed lg:static bottom-20 left-4 right-4 w-auto lg:w-full"
        >{{ $t("confirm_selection") }}</UButton
      >
    </div>
  </main>
</template>

<template>
  <main class="bg-wild-sand-300 py-10">
    <div class="main-container">
      <div class="bg-white rounded-2xl px-4 md:px-8 py-6">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ $t("your_results") }}:
          </p>
          <p class="text-xl font-semibold text-black">126 / 140</p>
        </div>
        <div class="mt-4 flex gap-6">
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("main_subjects") }}
            </p>
            <p class="text-sm font-normal text-cod-gray flex justify-between">
              {{ $t("Грамотность чтения") }}
              <span> 18/20 </span>
            </p>
            <p class="text-sm font-normal text-cod-gray flex justify-between">
              {{ $t("Грамотность чтения") }}
              <span> 18/20 </span>
            </p>
            <p class="text-sm font-normal text-cod-gray flex justify-between">
              {{ $t("Грамотность чтения") }}
              <span> 18/20 </span>
            </p>
          </div>
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("profile_subjects") }}
            </p>
            <p class="text-sm font-normal text-cod-gray flex justify-between">
              {{ $t("Биология") }}
              <span> 18/20 </span>
            </p>
            <p class="text-sm font-normal text-cod-gray flex justify-between">
              {{ $t("Химия") }}
              <span> 18/20 </span>
            </p>
          </div>
        </div>
        <UButton to="/cabinet/lessons" class="mt-6">{{
          $t("back_to_learning")
        }}</UButton>
      </div>
    </div>
  </main>
</template>

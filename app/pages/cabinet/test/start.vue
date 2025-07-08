<template>
  <main class="bg-wild-sand-300 py-0 lg:py-10">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 md:pt-0">
      <div class="bg-white lg:rounded-2xl px-4 md:px-8 py-6">
        <p class="text-xl font-semibold text-black">
          {{ $t("you_selected_items") }}:
        </p>
        <div class="mt-4 flex gap-6 flex-col lg:flex-row">
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("main_subjects") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ $t("Грамотность чтения") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ $t("Грамотность чтения") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ $t("Грамотность чтения") }}
            </p>
          </div>
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("profile_subjects") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ $t("Биология") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ $t("Химия") }}
            </p>
          </div>
        </div>
        <UButton to="/cabinet/test/item/1" class="mt-6">{{
          $t("start_test")
        }}</UButton>
        <UButton to="/cabinet/test" class="mt-2" variant="ghost">{{
          $t("change_subjects")
        }}</UButton>
      </div>
    </div>
  </main>
</template>

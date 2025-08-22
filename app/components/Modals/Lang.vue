<script setup>
const { locale, setLocale } = useI18n();
const isLangOpen = defineModel();
</script>

<template>
  <UModal
    v-model:open="isLangOpen"
    :ui="{
      overlay: 'bg-black/70',
    }"
  >
    <template #content>
      <div class="p-4 md:p-10">
        <p class="text-2xl font-semibold text-mirage">
          {{ $t("select_language") }}
        </p>
        <div class="mt-5">
          <UButton
            @click="setLocale('kk')"
            class="text-black text-sm font-normal w-full justify-between"
            variant="ghost"
          >
            Қазақ тілі
            <template #trailing>
              <UIcon
                v-if="locale === 'kk'"
                name="i-lucide-check"
                class="text-tundora size-5"
              />
            </template>
          </UButton>
          <UButton
            @click="setLocale('ru')"
            class="text-black text-sm font-normal w-full justify-between"
            variant="ghost"
          >
            Русский
            <template #trailing>
              <UIcon
                v-if="locale === 'ru'"
                name="i-lucide-check"
                class="text-tundora size-5"
              />
            </template>
          </UButton>
        </div>

        <UButton
          @click="isLangOpen = false"
          class="text-base font-semibold text-white w-full justify-center py-3 mt-5 rounded-xl"
        >
          {{ $t("select") }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

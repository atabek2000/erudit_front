<template>
  <header class="main-container py-4 flex justify-between items-center">
    <nuxt-link to="/">
      <img src="/logo/white.png" alt="logo" />
    </nuxt-link>
    <UModal
      :ui="{
        overlay: 'bg-black/70',
      }"
    >
      <UButton
        class="text-purple-heart text-sm font-medium w-fit"
        variant="ghost"
      >
        Рус
        <template #trailing>
          <UIcon name="i-lucide-chevron-down" class="text-tundora size-5" />
        </template>
      </UButton>

      <template #content>
        <div class="p-4 md:p-10">
          <p class="text-2xl font-semibold text-mirage">Выберите язык</p>
          <div class="mt-5">
            <UButton
              class="text-black text-sm font-normal w-full justify-between"
              variant="ghost"
            >
              Казахский
              <template #trailing>
                <UIcon name="i-lucide-check" class="text-tundora size-5" />
              </template>
            </UButton>
            <UButton
              class="text-black text-sm font-normal w-full justify-between"
              variant="ghost"
            >
              Русский
              <template #trailing>
                <UIcon name="i-lucide-check" class="text-tundora size-5" />
              </template>
            </UButton>
          </div>

          <UButton
            class="text-base font-semibold text-white w-full justify-center py-3 mt-5 rounded-xl"
          >
            Выбрать
          </UButton>
        </div>
      </template>
    </UModal>
  </header>
</template>

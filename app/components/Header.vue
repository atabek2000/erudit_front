<script setup>
const props = defineProps({
  hasMenu: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);
</script>

<template>
  <header class="fixed w-full py-3 bg-white" :style="{ zIndex: 9999999 }">
    <div class="main-container flex justify-between items-center">
      <nuxt-link to="/">
        <img src="/logo/white.png" alt="logo" />
      </nuxt-link>
      <div class="flex gap-3 items-center">
        <UModal
          :ui="{
            overlay: 'bg-black/70',
          }"
        >
          <UButton
            class="text-purple-heart text-sm font-medium w-fit p-1 md:p-3"
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
        <USlideover v-model:open="isOpen" v-if="hasMenu" class="md:hidden">
          <UButton
            label="Open"
            color="neutral"
            variant="ghost"
            class="w-fit p-1"
          >
            <UIcon name="i-lucide-menu" class="text-tundora size-6" />
          </UButton>
          <template #content>
            <div class="">
              <div class="p-4 flex justify-between items-center">
                <nuxt-link to="/">
                  <img src="/logo/white.png" alt="logo" />
                </nuxt-link>
                <UButton
                  label="Open"
                  color="neutral"
                  variant="ghost"
                  class="w-fit block ml-auto p-1"
                  @click="isOpen = false"
                >
                  <UIcon name="i-lucide-x" class="text-tundora size-6" />
                </UButton>
              </div>

              <div class="bg-wild-sand-300 p-4 h-full">
                <WidgetsCabinetMenu />
              </div>
            </div>
          </template>
        </USlideover>
      </div>
    </div>
  </header>
</template>

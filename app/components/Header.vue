<script setup>
const { locale } = useI18n();
const props = defineProps({
  hasMenu: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);
const isLangOpen = ref(false);
</script>

<template>
  <header class="fixed w-full py-3 bg-white" :style="{ zIndex: 9999999 }">
    <div class="main-container flex justify-between items-center">
      <nuxt-link to="/">
        <img
          src="/logo/white.png"
          alt="logo"
          class="max-w-[130px] md:max-w-[200px]"
        />
      </nuxt-link>
      <div class="flex gap-3 items-center">
        <UButton
          @click="isLangOpen = true"
          class="text-purple-heart text-sm font-medium w-fit p-1 md:p-3"
          variant="ghost"
        >
          {{ locale === "kk" ? "Қаз" : "Рус" }}
          <template #trailing>
            <UIcon name="i-lucide-chevron-down" class="text-tundora size-5" />
          </template>
        </UButton>
        <nuxt-link
          to="/cabinet/profile"
          class="py-2 px-4 rounded-xl bg-wild-sand-400 flex gap-2.5 items-center"
        >
          <p class="text-sm font-medium text-cod-gray">Аружан</p>
          <img
            src="/temp/ava.png"
            alt="avatar"
            class="w-6 h-6 md:w-10 md:h-10"
          />
        </nuxt-link>
        <!-- <USlideover v-model:open="isOpen" v-if="hasMenu" class="md:hidden">
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
        </USlideover> -->
      </div>
      <ModalsLang v-model:open="isLangOpen" />
    </div>
  </header>
</template>

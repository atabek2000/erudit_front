<script setup>
const items = ref([
  "A) f′(x)=1−x2​",
  "B) f′(x)=1−x2​",
  "C) f′(x)=1−x2​",
  "D) f′(x)=1−x2​",
]);

const value = ref("Физика");
</script>

<template>
  <div class="max-w-[900px] mt-6 mx-auto">
    <p class="text-base md:text-xl font-medium text-mirage">
      Функцияның туындысын табыңыз
    </p>

    <div class="mt-6 space-y-4">
      <div v-for="i in 4" :key="i" class="flex gap-5">
        <button
          class="p-4 text-base font-normal text-bunting rounded-xl bg-alabaster border border-catskill-white w-full flex-1 text-start"
        >
          1) f′(x)=1−x2​1​
        </button>
        <div class="flex-1">
          <UPopover class="w-full" :content="{ align: 'start' }">
            <UButton
              label="Бірінші таңдау пән"
              color="neutral"
              variant="soft"
              class="bg-wild-sand p-4 rounded-xl text-base font-normal text-bunting justify-between border border-catskill-white"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="text-tundora size-5"
                />
              </template>
            </UButton>

            <template #content>
              <div class="w-[254px]">
                <URadioGroup
                  v-model="value"
                  :items="items"
                  :ui="{
                    base: 'hidden',
                    fieldset: 'divide-y divide-athens-gray-500',
                    item: 'hover:bg-wild-sand',
                  }"
                >
                  <template #label="{ item }">
                    <div class="flex justify-between py-3 gap-4 px-4">
                      <p class="text-base font-normal text-bunting">
                        {{ item.label }}
                      </p>
                      <div>
                        <img
                          v-if="value === item.value"
                          src="~/assets/svg/radio-select-icon.svg"
                          alt="icon"
                          width="20"
                          height="20"
                        />
                        <img
                          v-else
                          src="~/assets/svg/radio-noselect-icon.svg"
                          alt="icon"
                          width="20"
                          height="20"
                        />
                      </div>
                    </div>
                  </template>
                </URadioGroup>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>

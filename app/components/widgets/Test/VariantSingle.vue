<script setup>
const items = ref([
  "A) f′(x)=1−x2​1​",
  "B) f′(x)=71+x2f′(x)=1+x2​",
  "C) f′(x)=1−x2​",
  "D) f′(x)=1−x2​",
]);
const selectedAnswer = ref(null);
</script>

<template>
  <div class="max-w-[670px] mt-6 mx-auto">
    <p class="text-base md:text-xl font-medium text-mirage text-center">
      Функцияның туындысын табыңыз
    </p>

    <URadioGroup
      v-model="selectedAnswer"
      :items="items"
      :ui="{
        base: 'hidden',
        wrapper: 'ms-0',
      }"
      class="mt-6"
    >
      <template #label="{ item }">
        <div
          class="flex gap-4 p-4 rounded-xl bg-alabaster border border-catskill-white hover:bg-catskill-white w-full my-2.5 cursor-pointer"
          :class="{
            'bg-bright-green/10': selectedAnswer === item.value,
          }"
        >
          <div class="">
            <img
              v-if="selectedAnswer === item.value"
              src="~/assets/svg/radio/select-green.svg"
              alt="icon"
              width="20"
              height="20"
            />
            <img
              v-else
              src="~/assets/svg/radio/noselect.svg"
              alt="icon"
              width="20"
              height="20"
            />
          </div>

          <span class="text-sm font-normal text-black">{{ item.label }}</span>
        </div>
      </template>
    </URadioGroup>
  </div>
</template>

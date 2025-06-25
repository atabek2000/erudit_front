<script setup>
const items = ref([
  "A) f′(x)=1−x2​1​",
  "B) f′(x)=71+x2f′(x)=1+x2​",
  "C) f′(x)=1−x2​",
  "D) f′(x)=1−x2​",
]);
const selectedAnswer = ref(["A) f′(x)=1−x2​1​"]);
</script>

<template>
  <div class="max-w-[900px] mt-6 mx-auto">
    <p class="text-base md:text-lg font-semibold text-mirage text-center">
      Кто считался верховным правителем и богом в Древнем Египте?
    </p>
    <img
      src="https://megabyteclub.co.uk/wp-content/uploads/2020/05/blog-article-6.jpg"
      alt="img"
      class="w-full rounded-xl mb-4 mt-5"
    />

    <UCheckboxGroup
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
        >
          <div class="">
            <img
              v-if="selectedAnswer.includes(item.value)"
              src="~/assets/svg/check/select-black.svg"
              alt="icon"
              width="20"
              height="20"
            />
            <img
              v-else
              src="~/assets/svg/check/noselect.svg"
              alt="icon"
              width="20"
              height="20"
            />
          </div>

          <span class="text-sm font-normal text-black">{{ item.label }}</span>
        </div>
      </template>
    </UCheckboxGroup>
  </div>
</template>

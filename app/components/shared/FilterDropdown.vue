<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: [],
  },
});
const open = ref(false);
const selected = defineModel();

const onSelect = (id) => {
  selected.value = id;
  open.value = false;
};
</script>

<template>
  <UPopover
    v-model:open="open"
    :ui="{
      content: 'ring-0 rounded-xl',
    }"
  >
    <UButton
      size="sm"
      class="bg-wild-sand-400 hover:bg-wild-sand-200 text-cod-gray py-2 h-fit"
      trailing-icon="i-lucide-chevron-down"
    >
      <span
        class="line-clamp-1 min-w-[100px] md:line-clamp-none md:whitespace-nowrap"
      >
        {{ selected ? items.find((i) => i.id === selected).name : label }}
      </span>
    </UButton>

    <template #content>
      <div
        class="rounded-xl overflow-hidden bg-gallery divide-y divide-tuna/20 min-w-[254px]"
      >
        <button
          v-for="i in items"
          @click="onSelect(i.id)"
          :key="i.id"
          class="px-4 py-3 text-sm font-normal text-black flex justify-between w-full hover:bg-black/5 cursor-pointer"
        >
          {{ i.name }}
          <UIcon
            v-if="selected === i.id"
            name="i-lucide-check"
            class="text-black size-5"
          />
        </button>
      </div>
    </template>
  </UPopover>
</template>

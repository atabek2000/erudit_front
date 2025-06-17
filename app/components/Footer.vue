<template>
  <footer class="bg-purple text-white">
    <div class="main-container flex justify-between py-7">
      <nuxt-link to="/">
        <img src="/logo/black.png" alt="logo" />
      </nuxt-link>
      <div class="flex items-center gap-5">
        <nuxt-link to="/">
          <img
            src="~/assets/svg/social/whatsapp.svg"
            alt="whatsapp"
            width="22"
            height="22"
          />
        </nuxt-link>
        <nuxt-link to="/">
          <img
            src="~/assets/svg/social/telegram.svg"
            alt="telegram"
            width="20"
            height="20"
          />
        </nuxt-link>
        <nuxt-link to="/">
          <img
            src="~/assets/svg/social/insta.svg"
            alt="insta"
            width="18"
            height="18"
          />
        </nuxt-link>
      </div>
    </div>
    <USeparator class="opacity-10" />
    <div class="py-6">
      <p class="text-center">
        {{ new Date().getFullYear() }}©{{ $t("app_name_copyright") }}
      </p>
    </div>
  </footer>
</template>

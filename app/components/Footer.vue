<template>
  <footer class="bg-purple text-white">
    <div
      class="main-container flex justify-between py-7 flex-col md:flex-row gap-8"
    >
      <nuxt-link to="/">
        <img src="/logo/black.png" alt="logo" />
      </nuxt-link>
      <div class="flex flex-col gap-3 md:gap-5">
        <p class="font-semibold">{{ $t("contacts") }}</p>
        <nuxt-link to="mailto:info@erudit.kz"> info@erudit.kz </nuxt-link>
        <nuxt-link to="tel:+77066230219"> +77066230219 </nuxt-link>
        <nuxt-link to="https://go.2gis.com/FaBvs" class="md:max-w-[300px]">
          г. Алматы, Медеуский район, Самал-2, д. 70, офис 1</nuxt-link
        >
      </div>

      <div class="flex flex-col gap-3 md:gap-5">
        <p class="font-semibold">{{ $t("documents") }}</p>
        <a href="/pdf/offer_agreement.pdf">
          {{ $t("offer_agreement") }}
        </a>
        <a href="/pdf/online_payment_info.pdf">
          {{ $t("online_payment_info") }}
        </a>
        <a href="/pdf/privacy_policy.pdf">
          {{ $t("privacy_policy") }}
        </a>
        <a href="/pdf/return_policy.pdf">
          {{ $t("return_policy") }}
        </a>
      </div>
      <div class="flex items-start gap-5">
        <nuxt-link to="https://wa.me/77066230218">
          <img
            src="~/assets/svg/social/whatsapp.svg"
            alt="whatsapp"
            width="22"
            height="22"
          />
        </nuxt-link>
        <nuxt-link to="https://t.me/Erudit_kz">
          <img
            src="~/assets/svg/social/telegram.svg"
            alt="telegram"
            width="20"
            height="20"
          />
        </nuxt-link>
        <nuxt-link to="https://www.instagram.com/erudit.kz">
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
    <div class="py-6 main-container">
      <p class="md:text-center">
        {{ new Date().getFullYear() }}©{{ $t("app_name_copyright") }}
      </p>
    </div>

    <SharedLoader />
  </footer>
</template>

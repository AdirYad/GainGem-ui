<template>
  <div class="unsigned-nav tw-bg-primary">
    <div class="tw-m-auto tw-px-4">
      <div class="nav-height tw-flex tw-items-center">
        <div class="tw-flex-1 xl:tw-ml-40">
          <router-link class="tw-inline-block" :to="{ name: 'Home' }">
            <div class="logo tw-duration-300" />
          </router-link>
        </div>

        <nav class="unsigned-nav-right tw-flex tw-items-center tw-bg-primary tw--mr-4">
          <router-link :to="{ name: 'Login' }" class="tw-my-2 tw-text-xs sm:tw-text-base tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-transparent hover:tw-border-white tw-rounded-full tw-px-2 sm:tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-2 md:tw-mr-4">
            <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
            Login
          </router-link>
          <router-link :to="{ name: 'Register' }" class="tw-my-2 tw-text-xs sm:tw-text-base tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 hover:tw-bg-white hover:tw-text-primary tw-rounded-full tw-px-2 sm:tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
            Register
          </router-link>
        </nav>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnsignedNavigation',
}
</script>
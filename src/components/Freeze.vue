<template>
  <div class="tw-px-4 md:tw-px-8 lg:tw-px-10 tw-pt-8 lg:tw-pt-10">
    <div class="tw-font-bold tw-border-2 tw-border-red-500 tw-text-red-500 tw-rounded-lg tw-w-full tw-px-4 md:tw-px-8 tw-py-4 tw-flex tw-justify-between tw-items-center tw-text-sm">
      <div class="tw-flex tw-items-center">
        <fa-icon icon="snowflake" class="fa-w-40 tw-h-10 tw-mr-2" />
        <article>
          <div class="tw-text-xl">
            You're frozen!
          </div>

          <div>
            Your account has been frozen due to suspicious activity. Please contact support about your account.
          </div>
        </article>
      </div>
      <a href="https://ezrewards.reamaze.com/kb/my-account/why-is-my-account-frozen" target="_blank" class="tw-h-full tw-ml-2 md:tw-ml-4">
        Contact Support
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Freeze',
}
</script>

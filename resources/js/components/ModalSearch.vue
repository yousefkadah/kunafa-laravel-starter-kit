<template>
  <div>
    <!-- Modal backdrop -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="modalOpen"
        class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        @click="closeModal"
      ></div>
    </transition>
    <!-- Modal dialog -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-show="modalOpen"
        class="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <div class="py-4 px-2">
            <div class="relative">
              <label for="modal-search" class="sr-only">Search</label>
              <input
                id="modal-search"
                class="w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search"
              />
              <div class="absolute inset-0 flex items-center justify-center right-auto group">
                <svg
                  class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SearchModal',
  props: ['modalOpen'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
}
</script>

<template>
  <Head :title="t('login.title')" />
  
  <div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {{ t('login.title') }}
        </h1>
      </div>

      <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
        {{ status }}
      </div>

      <form @submit.prevent="submit">
        <div>
          <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="email">
            {{ t('login.email') }}
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-primary-500 dark:focus:border-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 rounded-md shadow-sm"
            required
            autofocus
            autocomplete="username"
          />
          <div v-if="form.errors.email" class="text-sm text-red-600 dark:text-red-400 mt-1">
            {{ form.errors.email }}
          </div>
        </div>

        <div class="mt-4">
          <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="password">
            {{ t('login.password') }}
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-primary-500 dark:focus:border-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 rounded-md shadow-sm"
            required
            autocomplete="current-password"
          />
          <div v-if="form.errors.password" class="text-sm text-red-600 dark:text-red-400 mt-1">
            {{ form.errors.password }}
          </div>
        </div>

        <div class="block mt-4">
          <label class="flex items-center">
            <input
              v-model="form.remember"
              type="checkbox"
              class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-primary-600 shadow-sm focus:ring-primary-500 dark:focus:ring-primary-600 dark:focus:ring-offset-gray-800"
            />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ t('login.remember_me') }}</span>
          </label>
        </div>

        <div class="flex items-center justify-end mt-4">
          <Link
            v-if="canResetPassword"
            :href="route('password.request')"
            class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
          >
            {{ t('login.forgot_password') }}
          </Link>

          <button
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            class="ml-4 inline-flex items-center px-4 py-2 bg-primary-600 dark:bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 dark:hover:bg-primary-700 focus:bg-primary-700 dark:focus:bg-primary-700 active:bg-primary-900 dark:active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          >
            {{ t('login.login') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

interface Props {
  canResetPassword: boolean;
  status?: string;
}

const props = withDefaults(defineProps<Props>(), {
  status: undefined
});

const { t } = useI18n();

const form = useForm({
  email: '',
  password: '',
  remember: false,
});

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  });
};
</script>
<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';
import KunafaLogo from '@/components/layouts/components/KunafaLogo.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.post(route('register'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div class="m-auto w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="flex justify-center mb-8">
        <KunafaLogo class="h-12 w-auto" />
      </div>
      
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        {{ $t('register.title') }}
      </h2>
      
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('register.name') }}</label>
          <input 
            id="name" 
            type="text" 
            v-model="form.name" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :class="{'border-red-500': form.errors.name}"
            required
            autofocus
            autocomplete="name"
          />
          <div v-if="form.errors.name" class="text-red-500 mt-1 text-sm">{{ form.errors.name }}</div>
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('register.email') }}</label>
          <input 
            id="email" 
            type="email" 
            v-model="form.email" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :class="{'border-red-500': form.errors.email}"
            required
            autocomplete="username"
          />
          <div v-if="form.errors.email" class="text-red-500 mt-1 text-sm">{{ form.errors.email }}</div>
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('register.password') }}</label>
          <input 
            id="password" 
            type="password" 
            v-model="form.password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :class="{'border-red-500': form.errors.password}"
            required
            autocomplete="new-password"
          />
          <div v-if="form.errors.password" class="text-red-500 mt-1 text-sm">{{ form.errors.password }}</div>
        </div>
        
        <div class="mb-6">
          <label for="password_confirmation" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('register.confirm_password') }}</label>
          <input 
            id="password_confirmation" 
            type="password" 
            v-model="form.password_confirmation"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            autocomplete="new-password"
          />
        </div>
        
        <button 
          type="submit" 
          class="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition-colors duration-200"
          :disabled="form.processing"
        >
          {{ $t('register.register') }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <span class="text-gray-600 dark:text-gray-400">{{ $t('register.have_account') }}</span>
        <Link :href="route('login')" class="ml-1 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
          {{ $t('register.sign_in') }}
        </Link>
      </div>
    </div>
  </div>
</template>
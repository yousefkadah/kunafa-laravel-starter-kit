<script setup lang="ts">
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import KunafaLogo from '@/components/layouts/components/KunafaLogo.vue';
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

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div class="m-auto w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="flex justify-center mb-8">
        <KunafaLogo class="h-12 w-auto" />
      </div>
      
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        {{ $t('login.title') }}
      </h2>

      <div v-if="status" class="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded">
        {{ status }}
      </div>
      
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('login.email') }}</label>
          <input 
            id="email" 
            type="email" 
            v-model="form.email" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :class="{'border-red-500': form.errors.email}"
            required
            autofocus
          />
          <div v-if="form.errors.email" class="text-red-500 mt-1 text-sm">{{ form.errors.email }}</div>
        </div>
        
        <div class="mb-6">
          <label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('login.password') }}</label>
          <input 
            id="password" 
            type="password" 
            v-model="form.password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :class="{'border-red-500': form.errors.password}"
            required
          />
          <div v-if="form.errors.password" class="text-red-500 mt-1 text-sm">{{ form.errors.password }}</div>
        </div>
        
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input 
              id="remember" 
              type="checkbox" 
              v-model="form.remember" 
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="remember" class="ml-2 block text-gray-700 dark:text-gray-300">
              {{ $t('login.remember_me') }}
            </label>
          </div>
          
          <Link v-if="canResetPassword" :href="route('password.request')" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
            {{ $t('login.forgot_password') }}
          </Link>
        </div>
        
        <button 
          type="submit" 
          class="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition-colors duration-200"
          :disabled="form.processing"
        >
          {{ $t('login.login') }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <span class="text-gray-600 dark:text-gray-400">{{ $t('login.no_account') }}</span>
        <Link :href="route('register')" class="ml-1 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
          {{ $t('login.create_account') }}
        </Link>
      </div>
    </div>
  </div>
</template>
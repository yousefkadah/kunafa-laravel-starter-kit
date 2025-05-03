<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">Welcome to Kunafa Dashboard for Laravel</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">Your custom Laravel starter kit is now installed!</p>
      
      <div class="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Features:</h2>
        <ul class="text-left space-y-2">
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Modern Vue 3 dashboard with Tailwind CSS
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> RTL support for Arabic and other right-to-left languages
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Multi-language support
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Charts and data visualization
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Advanced data tables
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Form components
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-green-500">✓</span> Dark/Light mode
          </li>
        </ul>
      </div>
      
      <div class="mt-8">
        <router-link to="/dashboard" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          Explore Your Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaravelWelcome'
}
</script>

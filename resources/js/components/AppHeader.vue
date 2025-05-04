<script setup lang="ts">
// @ts-nocheck
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { getInitials } from '@/composables/useInitials';
import LanguageSwitcher from '@/dashboard/layouts/components/LanguageSwitcher.vue';
import type { BreadcrumbItem } from '@/types';
import type { Page } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/vue3';
import { computed, defineProps, withDefaults } from 'vue';

withDefaults(defineProps<{
    breadcrumbs?: BreadcrumbItem[];
}>(), {
    breadcrumbs: () => [],
});

// Define the type for template refs
interface TemplateRefs {
    breadcrumbs?: BreadcrumbItem[];
}

interface NavItem {
    title: string;
    href: string;
    iconHtml?: string;
}

// First define our SVG icons
const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
const gridIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
const bookIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;

// Define navigation items
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        iconHtml: gridIcon,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        iconHtml: folderIcon,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        iconHtml: bookIcon,
    },
];

// Define custom component properties
interface ComponentContext {
    menuIcon: string;
    searchIcon: string;
    mainNavItems: NavItem[];
    rightNavItems: NavItem[];
    auth: { user: { name: string; avatar?: string } };
    getInitials: typeof getInitials;
    activeItemStyles: (url: string) => string;
    isCurrentRoute: (url: string) => boolean;
    navigationMenuTriggerStyle: () => string;
    route: (name: string) => string;
}

// Initialize page and auth
const page = usePage<Page>();
const auth = computed(() => page.props.auth as { user: { name: string; avatar?: string } });
const route = (name: string) => `/${name}`; // Simplified route function

const isCurrentRoute = computed(() => (url: string) => page.url === url);

const activeItemStyles = computed(
    () => (url: string) => (isCurrentRoute.value(url) ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100' : ''),
);
</script>

<template>
    <div>
        <div class="border-b border-sidebar-border/80">
            <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                <!-- Mobile Menu -->
                <div class="lg:hidden">
                    <Sheet>
                        <SheetTrigger :as-child="true">
                            <Button variant="ghost" size="icon" class="mr-2 h-9 w-9">
                                <span class="h-5 w-5" v-html="menuIcon"></span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" class="w-[300px] p-6">
                            <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
                            <SheetHeader class="flex justify-start text-left">
                                <AppLogoIcon class="size-6 fill-current text-black dark:text-white" />
                            </SheetHeader>
                            <div class="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                                <nav class="-mx-3 space-y-1">
                                    <Link
                                        v-for="item in mainNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                                        :class="activeItemStyles(item.href)"
                                    >
                                        <span v-if="item.iconHtml" class="h-5 w-5" v-html="item.iconHtml"></span>
                                        {{ item.title }}
                                    </Link>
                                </nav>
                                <div class="flex flex-col space-y-4">
                                    <a
                                        v-for="item in rightNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center space-x-2 text-sm font-medium"
                                    >
                                        <span v-if="item.iconHtml" class="h-5 w-5" v-html="item.iconHtml"></span>
                                        <span>{{ item.title }}</span>
                                    </a>
                                    <LanguageSwitcher id="mobile-lang-switcher" class="mt-4" />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link :href="route('dashboard')" class="flex items-center gap-x-2">
                    <AppLogo />
                </Link>

                <!-- Desktop Menu -->
                <div class="hidden h-full lg:flex lg:flex-1">
                    <NavigationMenu class="ml-10 flex h-full items-stretch">
                        <NavigationMenuList class="flex h-full items-stretch space-x-2">
                            <NavigationMenuItem v-for="(item, index) in mainNavItems" :key="index" class="relative flex h-full items-center">
                                <Link :href="item.href">
                                    <NavigationMenuLink
                                        :class="[navigationMenuTriggerStyle(), activeItemStyles(item.href), 'h-9 cursor-pointer px-3']"
                                    >
                                        <span v-if="item.iconHtml" class="mr-2 h-4 w-4" v-html="item.iconHtml"></span>
                                        {{ item.title }}
                                    </NavigationMenuLink>
                                </Link>
                                <div
                                    v-if="isCurrentRoute(item.href)"
                                    class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"
                                ></div>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div class="ml-auto flex items-center space-x-2">
                    <div class="relative flex items-center space-x-1">
                        <Button variant="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
                            <span class="size-5 opacity-80 group-hover:opacity-100" v-html="searchIcon"></span>
                        </Button>

                        <div class="hidden space-x-1 lg:flex">
                            <template v-for="item in rightNavItems" :key="item.title">
                                <TooltipProvider :delay-duration="0">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="ghost" size="icon" as-child class="group h-9 w-9 cursor-pointer">
                                                <a :href="item.href" target="_blank" rel="noopener noreferrer">
                                                    <span class="sr-only">{{ item.title }}</span>
                                                    <span class="size-5 opacity-80 group-hover:opacity-100" v-html="item.iconHtml"></span>
                                                </a>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{{ item.title }}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </template>
                        </div>
                        <LanguageSwitcher id="desktop-lang-switcher" />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger :as-child="true">
                            <Button
                                variant="ghost"
                                size="icon"
                                class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                            >
                                <Avatar class="size-8 overflow-hidden rounded-full">
                                    <AvatarImage v-if="auth.user.avatar" :src="auth.user.avatar" :alt="auth.user.name" />
                                    <AvatarFallback class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white">
                                        {{ getInitials(auth.user?.name) }}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <UserMenuContent :user="auth.user" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

        <div v-if="props.breadcrumbs.length > 1" class="flex w-full border-b border-sidebar-border/70">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                <Breadcrumbs :breadcrumbs="props.breadcrumbs" />
            </div>
        </div>
    </div>
</template>

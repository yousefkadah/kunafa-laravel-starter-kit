<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto rounded-2xl transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 ltr:left-0 rtl:right-0 top-0 lg:static ltr:lg:left-auto rtl:lg:right-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : translateClass"
    >
      <!-- Sidebar header -->
      <div
        class="flex justify-between items-center mb-10 ltr:pr-3 rtl:pl-3 sm:px-2"
      >
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <Icon icon="mdi-light:speedometer" />
        </button>
        <!-- Logo and system name -->
        <Link class="flex items-center" href="/">
          <KunafaLogo />
        </Link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <ul class="mt-3">
          <SidebarLinkGroup
            v-slot="parentLink"
            v-for="route in routes"
            :key="route.meta.label"
            class="rounded-2xl"
          >
            <!-- childrens sidebar menu item -->
            <template v-if="route.children">
              <a
                class="block text-slate-200 truncate px-2 transition duration-150 hover:text-white"
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <Icon :icon="route.meta.icon" />
                    <span
                      class="text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >{{ route.meta.label }}</span
                    >
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ltr:ml-2 rtl:mr-2">
                    <svg
                      class="w-3 h-3 shrink-0 ltr:ml-1 rtl:mr-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <!-- childrens sub menu-->
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul
                  class="ltr:pl-5 rtl:pr-5 mt-1"
                  :class="!parentLink.expanded && 'hidden'"
                >
                  <li v-for="child in route.children" :key="child.name" class="mb-1 last:mb-0">
                    <!-- Handle nested children (Forms and Tables submenus) -->
                    <template v-if="child.children">
                      <a
                        class="flex items-center block transition duration-150 truncate text-slate-400 hover:text-slate-200"
                        href="#0"
                        @click.prevent="child.expanded = !child.expanded"
                      >
                        <Icon :icon="child.meta.icon" class="sm-icon" />
                        <span
                          class="text-sm font-medium ltr:ml-2 rtl:mr-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ child.meta.label }}</span
                        >
                        <svg
                          class="w-3 h-3 shrink-0 ltr:ml-1 rtl:mr-1 fill-current text-slate-400"
                          :class="child.expanded && 'rotate-180'"
                          viewBox="0 0 12 12"
                        >
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </a>
                      <!-- Nested submenu -->
                      <ul
                        class="ltr:pl-4 rtl:pr-4 mt-1"
                        :class="!child.expanded && 'hidden'"
                      >
                        <li v-for="subChild in child.children" :key="subChild.name" class="mb-1 last:mb-0">
                          <Link
                            class="flex items-center block transition duration-150 truncate text-slate-400 hover:text-slate-200"
                            :href="subChild.path"
                          >
                            <Icon :icon="subChild.meta.icon" class="sm-icon" />
                            <span
                              class="text-sm font-medium ltr:ml-2 rtl:mr-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >{{ subChild.meta.label }}</span
                            >
                          </Link>
                        </li>
                      </ul>
                    </template>
                    <!-- Regular submenu item without nested children -->
                    <template v-else>
                      <Link
                        class="flex items-center block transition duration-150 truncate text-slate-400 hover:text-slate-200"
                        :href="child.path"
                      >
                        <Icon :icon="child.meta.icon" class="sm-icon" />
                        <span
                          class="text-sm font-medium ltr:ml-2 rtl:mr-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ child.meta.label }}</span
                        >
                      </Link>
                    </template>
                  </li>
                </ul>
              </div>
            </template>
            <!-- no childrens sidebar menu item -->
            <template v-else>
              <li
                class="py-2 rounded-sm mb-0.5 px-2 last:mb-0"
              >
                <Link
                  class="block text-slate-200 truncate transition duration-150 hover:text-white"
                  :href="route.path"
                >
                  <div class="flex items-center">
                    <Icon :icon="route.meta.icon" />
                    <span
                      class="text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >{{ route.meta.label }}</span
                    >
                  </div>
                </Link>
              </li>
            </template>
          </SidebarLinkGroup>
        </ul>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg
              class="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                class="text-slate-400"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
              <path class="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed, shallowRef } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import SidebarLinkGroup from "./SidebarLinkGroup.vue";
import { useI18n } from "vue-i18n";
import SelectedLanguage from "@services/LanguageService.js";
import KunafaLogo from "@components/dashboard/KunafaLogo.vue";
import { Link } from '@inertiajs/vue3';

export default {
  name: "Sidebar",
  props: ["sidebarOpen"],
  components: {
    SidebarLinkGroup,
    KunafaLogo,
    Link, // Register Link component
  },
  setup(props, { emit }) {
    // Define static menu items since router.options.routes may not be available in Laravel
    const routes = ref([
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          label: "Dashboard",
          icon: "mdi:view-dashboard-outline",
        },
      },
      {
        path: "#",
        name: "components",
        meta: {
          label: "UI Components",
          icon: "mdi:puzzle-outline",
        },
        children: [
          {
            path: "#",
            name: "forms-group",
            expanded: false, // Initialize expanded state
            meta: {
              label: "Forms",
              icon: "mdi:form-select",
            },
            children: [
              {
                path: "/dashboard/forms/object-forms",
                name: "object-forms",
                meta: {
                  label: "Object Forms",
                  icon: "mdi:form-textbox",
                },
              },
              {
                path: "/dashboard/forms/inline-forms",
                name: "inline-forms",
                meta: {
                  label: "Inline Forms",
                  icon: "mdi:form-dropdown",
                },
              },
              {
                path: "/dashboard/forms/tabs-forms",
                name: "tabs-forms",
                meta: {
                  label: "Tabs Forms",
                  icon: "mdi:tab",
                },
              },
              {
                path: "/dashboard/forms/steps-forms",
                name: "steps-forms",
                meta: {
                  label: "Steps Forms",
                  icon: "mdi:step-forward",
                },
              },
            ],
          },
          {
            path: "#",
            name: "datatable-group",
            expanded: false, // Initialize expanded state
            meta: {
              label: "Data Tables",
              icon: "mdi:table",
            },
            children: [
              {
                path: "/dashboard/datatables/basic-datatables",
                name: "basic-datatables",
                meta: {
                  label: "Basic Tables",
                  icon: "mdi:table-large",
                },
              },
              {
                path: "/dashboard/datatables/sortable-datatables",
                name: "sortable-datatables",
                meta: {
                  label: "Sortable Tables",
                  icon: "mdi:sort",
                },
              },
              {
                path: "/dashboard/datatables/searchable-datatables",
                name: "searchable-datatables",
                meta: {
                  label: "Searchable Tables",
                  icon: "mdi:magnify",
                },
              },
              {
                path: "/dashboard/datatables/serverside-datatables",
                name: "serverside-datatables",
                meta: {
                  label: "Server-side Tables",
                  icon: "mdi:server",
                },
              },
            ],
          },
        ],
      },
      {
        path: "#",
        name: "users",
        meta: {
          label: "Users Management",
          icon: "mdi:account-group",
        },
        children: [
          {
            path: "/users",
            name: "user-list",
            meta: {
              label: "All Users",
              icon: "mdi:account-multiple",
            },
          },
          {
            path: "/users/create",
            name: "user-create",
            meta: {
              label: "Add User",
              icon: "mdi:account-plus",
            },
          },
        ],
      },
      {
        path: "#",
        name: "settings",
        meta: {
          label: "Settings",
          icon: "mdi:cog-outline",
        },
        children: [
          {
            path: "/profile",
            name: "profile",
            meta: {
              label: "Profile",
              icon: "mdi:account-edit",
            },
          },
          {
            path: "/settings/system",
            name: "system-settings",
            meta: {
              label: "System",
              icon: "mdi:tune",
            },
          },
        ],
      },
      {
        path: "/reports",
        name: "reports",
        meta: {
          label: "Reports",
          icon: "mdi:chart-box-outline",
        },
      },
    ]);

    // Use a ref instead of trying to access the router directly
    const router = shallowRef(null);
    const currentRoute = ref(null);
    
    try {
      // Safely try to get the router - this might fail in SSR or if router isn't available
      router.value = useRouter();
    } catch (error) {
      console.log('Router not available, using fallback navigation');
    }
    
    const trigger = ref(null);
    const sidebar = ref(null);
    const { locale } = useI18n();
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    // Set default sidebar expanded to true for better visibility
    const sidebarExpanded = ref(
      storedSidebarExpanded === null ? true : storedSidebarExpanded === "true"
    );
    
    const { currentLanguage, langDirection } = SelectedLanguage();
    
    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return;
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      emit("close-sidebar");
    };
    
    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return;
      emit("close-sidebar");
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
      // Set the body class on mount to ensure sidebar is expanded by default
      document.querySelector("body").classList.add("sidebar-expanded");
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    const translateClass = computed(() => {
      return langDirection.value === "rtl"
        ? "translate-x-64"
        : "-translate-x-64";
    });

    watch(sidebarExpanded, () => {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.value);
      if (sidebarExpanded.value) {
        document.querySelector("body").classList.add("sidebar-expanded");
      } else {
        document.querySelector("body").classList.remove("sidebar-expanded");
      }
    });

    return {
      routes,
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
      currentLanguage,
      langDirection,
      translateClass,
    };
  },
};
</script>

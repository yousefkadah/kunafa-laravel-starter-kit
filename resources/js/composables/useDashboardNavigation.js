import { computed } from 'vue';
import { router } from '@inertiajs/vue3';

export function useDashboardNavigation() {
  const routes = [
    {
      name: 'dashboard',
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'ion:home'
    },
    {
      name: 'forms',
      label: 'Forms',
      icon: 'tdesign:form',
      children: [
        {
          name: 'dashboard.forms.object',
          path: '/dashboard/forms/object-forms',
          label: 'Object Forms',
          icon: 'ant-design:form-outlined'
        },
        {
          name: 'dashboard.forms.inline',
          path: '/dashboard/forms/inline-forms',
          label: 'Inline Forms',
          icon: 'fluent:form-20-regular'
        },
        {
          name: 'dashboard.forms.tabs',
          path: '/dashboard/forms/tabs-forms',
          label: 'Tabs Forms',
          icon: 'icon-park-outline:form-one'
        },
        {
          name: 'dashboard.forms.steps',
          path: '/dashboard/forms/steps-forms',
          label: 'Steps Forms',
          icon: 'clarity:form-line'
        }
      ]
    },
    {
      name: 'datatables',
      label: 'Data Tables',
      icon: 'tabler:table',
      children: [
        {
          name: 'dashboard.datatables.basic',
          path: '/dashboard/datatables/basic-datatables',
          label: 'Basic Datatables',
          icon: 'material-symbols-light:table-sharp'
        },
        {
          name: 'dashboard.datatables.sortable',
          path: '/dashboard/datatables/sortable-datatables',
          label: 'Sortable Datatables',
          icon: 'fluent:table-edit-16-regular'
        },
        {
          name: 'dashboard.datatables.searchable',
          path: '/dashboard/datatables/searchable-datatables',
          label: 'Searchable Datatables',
          icon: 'material-symbols:table-rows-outline'
        },
        {
          name: 'dashboard.datatables.serverside',
          path: '/dashboard/datatables/serverside-datatables',
          label: 'Server-side Datatables',
          icon: 'material-symbols-light:data-table-outline'
        }
      ]
    },
    {
      name: 'charts',
      label: 'Charts',
      icon: 'solar:chart-bold',
      children: [
        {
          name: 'dashboard.charts.bar',
          path: '/dashboard/charts/bar-charts',
          label: 'Bar Charts',
          icon: 'solar:chart-bold'
        },
        {
          name: 'dashboard.charts.bubble',
          path: '/dashboard/charts/bubble-charts',
          label: 'Bubble Charts',
          icon: 'ic:outline-bubble-chart'
        },
        {
          name: 'dashboard.charts.doughnut',
          path: '/dashboard/charts/doughnut-charts',
          label: 'Doughnut Charts',
          icon: 'mdi:chart-arc'
        },
        {
          name: 'dashboard.charts.line',
          path: '/dashboard/charts/line-charts',
          label: 'Line Charts',
          icon: 'ph:chart-line'
        },
        {
          name: 'dashboard.charts.pie',
          path: '/dashboard/charts/pie-charts',
          label: 'Pie Charts',
          icon: 'bi:pie-chart'
        },
        {
          name: 'dashboard.charts.polarArea',
          path: '/dashboard/charts/polar-area-charts',
          label: 'Polar Area Charts',
          icon: 'ph:chart-polar-light'
        },
        {
          name: 'dashboard.charts.radar',
          path: '/dashboard/charts/radar-charts',
          label: 'Radar Charts',
          icon: 'tabler:chart-radar'
        },
        {
          name: 'dashboard.charts.scatter',
          path: '/dashboard/charts/scatter-charts',
          label: 'Scatter Charts',
          icon: 'tabler:chart-scatter'
        }
      ]
    }
  ];

  // Function to navigate to a specific route
  const navigateTo = (path) => {
    router.visit(path);
  };

  return {
    routes,
    navigateTo
  };
}
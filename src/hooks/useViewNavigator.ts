import { ref } from 'vue';

export type ViewNavigatorConfig = {
    selectedView: string,
    views: string[]
}
export function useViewNavigator(config: ViewNavigatorConfig) {
    const selectedView = ref(config.selectedView);
    const selectView = (view: string) => {
      selectedView.value = view;
    }
    return {
      selectedView,
      views: config.views,
      selectView
    }
}
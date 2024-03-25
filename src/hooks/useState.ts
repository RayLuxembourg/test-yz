import { ref, type Ref } from 'vue';

export function useState<S>(initialState: S) {
    const state = ref(initialState) as Ref<S>;
    const setState = (newState: S) => {
        state.value = newState;
    };
    return [state, setState] as const;
}
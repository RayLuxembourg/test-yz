import { ref } from 'vue';
import { getRawFile } from '../utils';

export function useGetRawFile(filePath: string) {
    const fileContent = ref(getRawFile(filePath));

    return fileContent;
}
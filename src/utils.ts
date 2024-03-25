export function getRawFile(filePath: string) {
    const snippets = import.meta.glob('/src/components/snippets/*Snippet.*', { eager: true, as: "raw" });
    return snippets[filePath];
}
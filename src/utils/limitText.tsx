export function limitText(text: string, charLimit: number = 20): string {
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + '...';
    }
    return text;
}
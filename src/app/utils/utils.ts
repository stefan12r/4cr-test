export function generateUid(): string {
    return (Math.round((new Date().getMilliseconds() + (Math.random() * 10)))
    .toString() + Math.random().toString(36)).substring(1, 10);
}
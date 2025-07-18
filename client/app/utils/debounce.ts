
export const debounce = (func: (v: string) => void, wait: number) => {
    let timerId: number = 0;

    return (value: string) => {
        clearTimeout(timerId);
        timerId = window.setTimeout(() => {
            func(value);
        }, wait);
    }
}
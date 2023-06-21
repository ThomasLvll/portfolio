export const getDeepValue = (obj: any, path: string) => {
    const pathArray = path.split('.');
    let value = obj;
    for (const key of pathArray) {
        value = value[key];
    }
    return value;
};



export const sortBy = (key: string, order: 'asc' | 'desc' = 'asc') => (a: any, b: any) => {
    const aValue = getDeepValue(a, key);
    const bValue = getDeepValue(b, key);
    if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
    }
    return 0;
};

export const sortByOrder = (order: any[], key?: string) => (a: any, b: any) => {
    if (key) {
        a = getDeepValue(a, key);
        b = getDeepValue(b, key);
    }
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
        return 0;
    }
    if (aIndex === -1) {
        return 1;
    }
    if (bIndex === -1) {
        return -1;
    }
    return aIndex - bIndex;
};

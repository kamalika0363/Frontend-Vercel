export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (dateString: { split: (arg0: string) => [any, any, any]; }) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

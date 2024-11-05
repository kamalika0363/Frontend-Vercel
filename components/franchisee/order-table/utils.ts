export const formatDate = (dateString: { split: (arg0: string) => [any, any, any]; }) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

export const piu = (a: string, b: string): string => {
    const ris = (parseInt(a, 2) + parseInt(b, 2)).toString(2);
    return ris;
};
export const meno = (a: string, b: string): string => {

    const ris = (parseInt(a, 2) >= parseInt(b, 2)?(parseInt(a, 2) - parseInt(b, 2)) : (parseInt(b, 2) - parseInt(a, 2))).toString(2);
    return ris;
};
export const per = (a: string, b: string): string => {
    const ris = (parseInt(a, 2) * parseInt(b, 2)).toString(2);
    return ris;
};
export const diviso = (a: string, b: string): string => {
    const ris = Math.floor(parseInt(a, 2) >= parseInt(b, 2)?(parseInt(a, 2) / parseInt(b, 2)) : (parseInt(b, 2) / parseInt(a, 2))).toString(2);
    return ris+"R"+(parseInt(a, 2) >= parseInt(b, 2)?(parseInt(a, 2) % parseInt(b, 2)) : (parseInt(b, 2) % parseInt(a, 2))).toString(2);
};
export const missionDescriptions: { [key: string]: string } = {
    IT: "IT Origins and History",
    AL: "Algoritmi",
    SI: "Sicurezza Informatica e Privacy",
    HW: "Hardware",
    SW: "Software",
    Reti: "Reti",
    RetiISO: "Reti ISO OSI",
    Rete2PC: "Rete semplice 2 PC",
    RetiLApp: "Reti L7 Applicazioni",
    DNS: "DNS",
    Email: "Posta Elettronica",
    RetiA2: "Reti A2",
    RetiA3: "Reti A3",
    Sistemi1: "Sistemi Operativi 1",
    Sistemi2: "Sistemi Operativi 2",
    Sistemi3: "Sistemi Operativi 3",
    RetiC1: "Reti C1",
    RetiC2: "Reti C2",
    RetiC3: "Reti C3",
    RetiD1: "Reti D1",
    RetiD2: "Reti D2",
    RetiD3: "Reti D3",
    RetiD4: "Reti D4",
    DB: "Database",
    WEB: "WEB",
    AI: "Artificial Intelligence",
    MOBILE: "Mobile",
    // Aggiungi altre descrizioni per altre missioni qui
};

export function missionLearn(mission: string): string {
    // Esempio: converte la stringa in maiuscolo
     return "<a class=\"qlink\" href=\"md.html?file=quiz/"+mission+"/"+mission+".md\" target=\"_blank\">"+ missionDescriptions[mission]+"</a>";
}
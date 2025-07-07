
# 🔧 Analisi di una rete elementare con 2 PC collegati

**🔌 Connessione fisica:**

* I due PC sono collegati direttamente tramite **cavo Ethernet incrociato (cross-cable)**
* Nessun dispositivo intermedio è coinvolto
* Le **luci verdi** sulle porte segnalano il corretto collegamento

**⚙️ Configurazione IP:**

* Ogni PC riceve un indirizzo IP della rete **192.168.1.0/24** (Classe C)

  * PC0 → `192.168.1.101`
  * PC1 → `192.168.1.102`
* Maschera di rete: `255.255.255.0`

**🧪 Test di connettività:**

* Si può eseguire un **ping** da un PC all'altro per verificare la connessione
* Il ping genera traffico visibile tramite il lampeggio delle luci verdi
* Il ping verso se stessi non genera traffico esterno

**🧰 Simulazione in Packet Tracer:**

* Usando **Simulation mode** e il tasto `Add Simple PDU`, si può osservare la comunicazione
* Appare:

  * **1 busta**: ARP già eseguito
  * **2 buste**: viene eseguito prima ARP, poi ICMP

**📜 Protocollo ARP:**

* Serve a mappare IP ↔ MAC address
* La tabella si visualizza con `arp -a`
* Inizialmente è vuota; si riempie dopo l'invio dei pacchetti ARP

---

## 🧠 Cos'è ARP?

**ARP (Address Resolution Protocol)** è un protocollo di rete usato per **trovare l'indirizzo MAC** (fisico) corrispondente a un **indirizzo IP** (logico) in una rete locale (LAN).

> 🔍 Serve perché i dispositivi comunicano a livello fisico tramite **indirizzi MAC**, ma le applicazioni e i protocolli (come IP) usano **indirizzi IP**.

---

## 📦 Come funziona ARP (passaggi base)

Immagina che il PC1 con IP `192.168.1.10` voglia inviare dati a PC2 con IP `192.168.1.20`:

1. **PC1 cerca nella sua cache ARP** se conosce il MAC di `192.168.1.20`.
2. Se **non lo trova**, invia una **ARP Request** (broadcast):

   > "Chi ha IP `192.168.1.20`? Risponda con il suo MAC!"
3. Tutti i dispositivi ricevono il messaggio, **solo PC2 risponde** con una **ARP Reply** (unicast):

   > "Sono `192.168.1.20`, il mio MAC è `AA:BB:CC:DD:EE:FF`"
4. PC1 **salva** questa associazione in una **tabella ARP** (cache) e ora può inviare i pacchetti.

---

## 🔐 ARP è affidabile?

ARP **non è autenticato**, quindi è vulnerabile ad attacchi come:

* **ARP Spoofing**: un host malevolo finge di avere un certo IP e intercetta il traffico
* Questo tipo di attacco è alla base del **Man-in-the-Middle**

---

## 📘 Comandi utili

| Sistema       | Comando       | Cosa fa                            |
| ------------- | ------------- | ---------------------------------- |
| Windows/Linux | `arp -a`      | Mostra la tabella ARP              |
| Cisco IOS     | `show ip arp` | Mostra ARP nei router/switch Cisco |

---

## 📊 Esempio tabella ARP

| IP Address   | MAC Address            |
| ------------ | ---------------------- |
| 192.168.1.20 | AA\:BB\:CC\:DD\:EE\:FF |
| 192.168.1.1  | 00:11:22:33:44:55      |

---

## 📎 Quando ARP è usato?

* All'interno di una rete LAN (IPv4)
* Quando un host vuole inviare un pacchetto e ha solo l’IP del destinatario
* Sempre che non ci sia già una mappatura IP↔MAC nella cache ARP

---

**📡 Protocollo ICMP:**

* Utilizzato per i ping e per testare la connettività di rete
* I pacchetti ICMP viaggiano **incapsulati** dentro pacchetti IP

---

## 📡 Cos'è ICMP?

**ICMP (Internet Control Message Protocol)** è un protocollo di **supporto** usato nei dispositivi di rete (router, host) per:

* Inviare **messaggi di errore**
* Fornire **diagnostica** della rete
* **Segnalare problemi** nella consegna dei pacchetti IP

> 📍 ICMP **non trasporta dati dell’utente**, ma messaggi di controllo e stato.
> Fa parte della **famiglia dei protocolli IP** (layer 3 del modello OSI).

---

## 🔍 A cosa serve?

Ecco alcuni usi comuni di ICMP:

| Funzione                    | Esempio                     | Scopo                                             |
| --------------------------- | --------------------------- | ------------------------------------------------- |
| **Ping**                    | `ping 192.168.1.1`          | Verifica se un host è raggiungibile               |
| **Traceroute**              | `traceroute www.google.com` | Scopre il percorso dei pacchetti                  |
| **Destination Unreachable** | Router → Host               | Segnala che un host o porta non è raggiungibile   |
| **Time Exceeded**           | Router → Host               | TTL del pacchetto scaduto (loop o percorso lungo) |

---

## 🧱 ICMP è come il "segnale stradale" di Internet

Non trasporta dati, ma dice se:

* la "strada è chiusa"
* il "pacchetto ha sbagliato strada"
* il "destinatario non esiste"

---

## 🧪 Il comando `ping`

Quando usi `ping`, il tuo PC invia pacchetti **ICMP Echo Request** al destinatario.
Se è raggiungibile, risponde con **ICMP Echo Reply**.

### Esempio:

```bash
ping 192.168.1.1
```

Risultato:

```
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.345 ms
```

---

## 📂 Tipi di messaggi ICMP

| Tipo | Nome                    | Descrizione                             |
| ---- | ----------------------- | --------------------------------------- |
| 0    | Echo Reply              | Risposta a un ping                      |
| 3    | Destination Unreachable | Destinazione irraggiungibile            |
| 5    | Redirect Message        | Avvisa che esiste un percorso migliore  |
| 8    | Echo Request            | Richiesta di ping                       |
| 11   | Time Exceeded           | TTL esaurito (loop o errore di routing) |

---

## 🔐 Attenzione: ICMP può essere bloccato

* Alcuni firewall o router **bloccano ICMP** per motivi di sicurezza (per evitare ping flood o scansioni).
* Se un ping fallisce, **non sempre significa che la rete è giù** – potrebbe solo essere ICMP filtrato.

---

Il **cavo Ethernet incrociato (cross-cable)** è un tipo di cavo usato per collegare **direttamente due dispositivi simili**, ad esempio:

* PC ↔ PC
* Switch ↔ Switch
* Router ↔ Router (in certe condizioni)

---

### 🔄 Differenza con il cavo diretto (straight-through)

| Tipo di Cavo         | Utilizzo                  | Cablaggio (TX ↔ RX)  |
| -------------------- | ------------------------- | -------------------- |
| **Straight-through** | PC ↔ Switch / PC ↔ Router | identico su entrambi |
| **Cross-cable**      | PC ↔ PC / Switch ↔ Switch | TX ↔ RX incrociati   |

---

### 🧰 Cablaggio del cavo incrociato (T568A ↔ T568B)

| Pin lato A (T568A)   | Collegato a Pin lato B (T568B) |
| -------------------- | ------------------------------ |
| 1 (Bianco/Verde)     | 3 (Bianco/Arancione)           |
| 2 (Verde)            | 6 (Arancione)                  |
| 3 (Bianco/Arancione) | 1 (Bianco/Verde)               |
| 6 (Arancione)        | 2 (Verde)                      |

---

### 📌 Oggi serve ancora?

* ❌ **Non più necessario** con dispositivi moderni che supportano **Auto-MDIX**, che rileva automaticamente il tipo di connessione e adatta i pin.
* ✅ Utile ancora in **ambiente di laboratorio** o con hardware legacy.

---

Il **cavo Ethernet diretto (straight-through)** è il tipo più comune di cavo di rete ed è usato per collegare **dispositivi diversi tra loro**, come:

* PC ↔ Switch
* PC ↔ Router
* Switch ↔ Router

---

### 🧰 Cablaggio standard (T568B ↔ T568B) – **uguale su entrambi i lati**

| Pin | Colore (T568B)   | Funzione                |
| --- | ---------------- | ----------------------- |
| 1   | Bianco/Arancione | TX+                     |
| 2   | Arancione        | TX−                     |
| 3   | Bianco/Verde     | RX+                     |
| 6   | Verde            | RX−                     |
| 4   | Blu              | non usato (10/100 Mbps) |
| 5   | Bianco/Blu       | non usato               |
| 7   | Bianco/Marrone   | non usato               |
| 8   | Marrone          | non usato               |

✅ **Nota**: Solo i pin 1, 2, 3 e 6 sono usati per reti a **10/100 Mbps**. Tutti gli 8 pin sono usati in reti **Gigabit**.

---

### 🧩 Schema di cablaggio (T568B ↔ T568B)

```

Lato A                  Lato B
--------                --------
1  Bianco/Arancione --> 1  Bianco/Arancione  
2  Arancione         --> 2  Arancione  
3  Bianco/Verde      --> 3  Bianco/Verde  
6  Verde             --> 6  Verde  
(Altri fili in ordine identico)
```

---

### 📌 Quando usarlo?

| Collegamento    | Tipo di cavo                         |
| --------------- | ------------------------------------ |
| PC ↔ Switch     | Diretto                              |
| Router ↔ Switch | Diretto                              |
| Switch ↔ Switch | **Incrociato** (a meno di Auto-MDIX) |
| PC ↔ PC         | **Incrociato**                       |

---

## 📦 Modello ISO/OSI – 7 Livelli

| Livello | Nome                  | Esempi di protocolli      |
| ------- | --------------------- | ------------------------- |
| 7   IV  | Applicazione          | HTTP, FTP, DNS            |
| 6   IV  | Presentazione         | SSL, JPEG, ASCII          |
| 5   IV  | Sessione              | NetBIOS, RPC              |
| 4   III | Trasporto             | TCP, UDP                  |
| 3   II  | **Rete**              | **IP, ICMP**              |
| 2   I   | **Collegamento dati** | **Ethernet, ARP**         |
| 1   I   | Fisico                | Cavi, segnali, connettori |


## 📦 Modello TCP/IP – 4 Livelli che è più pratico rispetto al modello ISO/OSI.

| Livello TCP/IP      | Equivalente OSI | Funzione principale                       |
| ------------------- | --------------- | ----------------------------------------- |
| IV. **Applicazione** | OSI 5–7         | App, interfaccia utente, formati dati     |
| III. **Trasporto**    | OSI 4           | Comunicazione host-to-host (TCP, UDP)     |
| II. **Internet**     | OSI 3           | Routing e indirizzamento (IP, ICMP)       |
| I. **Accesso Rete** | OSI 1–2         | Hardware, link locali, MAC, ARP, Ethernet |

---

## 📌 Dove si trovano ARP e ICMP?

| Protocollo | Livello OSI                       | Descrizione breve                                       |
| ---------- | --------------------------------- | ------------------------------------------------------- |
| **ARP**    | **Livello 2 – Collegamento dati** | Traduce indirizzi IP in MAC per invio locale nella rete |
| **ICMP**   | **Livello 3 – Rete**              | Invia messaggi di controllo e diagnostica per IP        |

---

### 🔁 Nota importante:

* **ARP** lavora tra **livello 2 e livello 3**, perché **connette IP (liv. 3) a MAC (liv. 2)**.
* **ICMP** è un'estensione di **IP** ed è incapsulato direttamente dentro i pacchetti IP, quindi **sta al livello 3**.

---

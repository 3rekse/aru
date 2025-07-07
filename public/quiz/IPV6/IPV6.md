
## Indirizzamento IPv6: Il Futuro degli Indirizzi IP 🌐🔢

L'**IPv6 (Internet Protocol versione 6)** è la versione più recente del protocollo Internet, progettata per sostituire IPv4 e risolvere il problema dell'esaurimento degli indirizzi, offrendo anche nuove funzionalità.

### Caratteristiche Principali di IPv6

* **Dimensione dell'indirizzo:** Un indirizzo IPv6 è composto da **128 bit**, rispetto ai 32 bit di IPv4. Questo permette un numero quasi illimitato di indirizzi (circa $3.4 \times 10^{38}$).
* **Rappresentazione:** Gli indirizzi IPv6 sono scritti in **esadecimale** e sono suddivisi in **otto gruppi di 16 bit** (chiamati hextet o blocchi esadecimali), separati da due punti (`:`). Ogni gruppo è rappresentato da quattro cifre esadecimali.
    * **Esempio:** `2001:0DB8:85A3:0000:0000:8A2E:0370:7334`
* **Regole di Compressione (per la leggibilità):**
    * **Omissione degli zeri iniziali:** Gli zeri iniziali all'interno di un gruppo possono essere omessi (es. `0DB8` diventa `DB8`, `0000` diventa `0`).
    * **Doppio due punti (`::`):** Una singola sequenza contigua di blocchi di zeri può essere sostituita da `::`. Questa operazione può essere usata **solo una volta** in un indirizzo.
        * **Esempio di compressione:** `2001:0DB8:0000:0000:0000:8A2E:0370:7334` può essere abbreviato in `2001:DB8::8A2E:370:7334`.
        * **Indirizzo di loopback:** `0000:0000:0000:0000:0000:0000:0000:0001` si abbrevia a `::1`.
* **Struttura (Prefisso di Rete e ID Interfaccia):** Similmente a IPv4, un indirizzo IPv6 si divide in due parti:
    * **Prefisso di Rete:** I bit più a sinistra, che identificano la rete o sottorete. La sua lunghezza è indicata con la notazione CIDR (es. `/64`).
    * **ID Interfaccia:** I bit rimanenti a destra, che identificano un'interfaccia specifica su quel segmento di rete (spesso di 64 bit).
* **Tipi di Indirizzi IPv6:**
    * **Unicast:** Identifica una singola interfaccia (es. **Global Unicast Address** per Internet, **Link-Local Address** per la comunicazione solo sul segmento locale, **Unique Local Address** per reti private).
    * **Multicast:** Identifica un gruppo di interfacce; i pacchetti sono consegnati a tutti i membri del gruppo (sostituisce il broadcast di IPv4).
    * **Anycast:** Identifica un gruppo di interfacce, ma il pacchetto è consegnato solo all'interfaccia "più vicina" al mittente.

---

### Tipi di Indirizzi IPv6: Un Approfondimento 🌐🔢

Gli indirizzi IPv6, sebbene tutti a 128 bit, sono categorizzati in diverse tipologie a seconda del loro scopo e del loro ambito di validità.

#### 1. Global Unicast Address (GUA) 🌍

* **Scopo:** Sono gli indirizzi IPv6 equivalenti agli **indirizzi IP pubblici** di IPv4. Sono progettati per essere **instradabili su Internet** a livello globale.
* **Prefisso:** Iniziano tipicamente con i bit `001` (ovvero, cifre esadecimali che iniziano con `2` o `3`).
    * **Esempio:** `2001:0DB8:85A3:0000:0000:8A2E:0370:7334` o `2001:db8::/32` (per i blocchi di documentazione).
* **Struttura:** Generalmente seguono una struttura che include:
    * **Global Routing Prefix (48 bit):** Assegnato a un'organizzazione o un ISP.
    * **Subnet ID (16 bit):** Utilizzato dall'organizzazione per definire le sottoreti interne.
    * **Interface ID (64 bit):** Identifica un'interfaccia specifica su una sottorete (spesso generato dall'indirizzo MAC via EUI-64 o in modo casuale per privacy).
    * La lunghezza del prefisso di rete per una sottorete è quasi sempre `/64`.
        * `[Prefisso di Routing Globale (48 bit)] : [ID Sottorete (16 bit)] : [ID Interfaccia (64 bit)]`
        * `2001:0DB8:85A3 : 0001 : 0000:0000:8A2E:0370:7334`
* **Utilizzo:** Sono gli indirizzi che vedi quando navighi su siti web con supporto IPv6, quando un server è esposto su Internet via IPv6, o quando un tuo dispositivo ha connettività diretta IPv6.

#### 2. Link-Local Address (LLA) 🔗

* **Scopo:** Questi indirizzi sono utilizzati **solo per la comunicazione all'interno di un singolo link (segmento di rete locale)**. Non sono instradabili attraverso un router.
* **Prefisso:** Iniziano sempre con `FE80::/10`.
    * **Esempio:** `FE80::C2D3:BEEF:FE12:3456`
* **Auto-configurazione (SLAAC):** Tutti i dispositivi abilitati a IPv6 su un link si auto-configurano automaticamente un indirizzo Link-Local quando l'interfaccia viene attivata. Questo avviene senza bisogno di un server DHCPv6.
* **Utilizzo:** Sono fondamentali per molte operazioni di rete locali, come:
    * Comunicazione tra nodi adiacenti (es. un host che parla con il router).
    * Scoperta di vicini (Neighbor Discovery Protocol - NDP).
    * Assegnazione degli indirizzi Global Unicast (quando un router annuncia un prefisso di rete, lo fa con il suo LLA).
* **Caratteristica chiave:** Ogni interfaccia di rete che supporta IPv6 avrà almeno un indirizzo Link-Local.

#### 3. Unique Local Address (ULA) 🔒

* **Scopo:** Sono gli indirizzi IPv6 equivalenti agli **indirizzi IP privati** di IPv4 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`). Sono destinati all'uso all'interno di reti private o siti locali e **non sono instradabili su Internet** a livello globale.
* **Prefisso:** Iniziano sempre con `FC00::/7` (che significa che il primo hextet sarà `FCxx` o `FDxx`).
    * **Esempio:** `FD00:ABCD:EF01:1234::1`
* **Struttura:**
    * I primi 7 bit sono `1111 110`.
    * Il bit `L` (Local bit) è sempre `1` (`FD`). Se fosse `0` (`FC`), sarebbe riservato per un uso futuro.
    * Seguono **40 bit di ID globale pseudo-casuale**: questo ID è generato in modo casuale per ogni sito e dovrebbe essere unico a livello globale per prevenire collisioni tra siti diversi.
    * Poi c'è il **Subnet ID (16 bit)** e l'**Interface ID (64 bit)**, come per i GUA.
* **Vantaggi:**
    * **Stabilità:** Non cambiano quando la rete si connette a un nuovo ISP (a differenza dei GUA).
    * **Indipendenza:** Permettono la connettività all'interno di un sito senza dipendere dagli indirizzi globali.
    * **Privacy:** Simili agli IP privati, non sono visibili su Internet.
* **Utilizzo:** Ideali per reti aziendali complesse, data center, o quando si vuole una segmentazione logica senza connettività Internet diretta per certi segmenti.

#### 4. Anycast Address (Un caso speciale di Unicast) 🗺️

* **Scopo:** Un indirizzo Anycast identifica un **gruppo di interfacce** (spesso server) che offrono lo **stesso servizio**.
* **Consegna:** A differenza del Multicast (che consegna a *tutti* i membri del gruppo) o Unicast (a *uno* specifico), un pacchetto inviato a un indirizzo Anycast viene consegnato **solo all'interfaccia "più vicina"** nel gruppo, secondo il protocollo di routing.
* **Configurazione:** Viene configurato come un indirizzo Unicast normale su più interfacce. Sono i protocolli di routing (come BGP) che si occupano di pubblicizzare queste rotte e dirigere il traffico verso il server più vicino.
* **Utilizzo:**
    * **Servizi globalmente distribuiti:** È ampiamente utilizzato per il **DNS root servers** e altri servizi DNS di alto livello, nonché per le **CDN (Content Delivery Networks)**. Questo permette agli utenti di essere indirizzati automaticamente al server più vicino e quindi ottenere una migliore performance e disponibilità.
    * **Bilanciamento del carico:** Se più server offrono lo stesso contenuto, l'anycast può dirigere il traffico verso il server ottimale.

---

## Router e Gateway: I Nodi di Confine delle Reti 🛣️🚪

### Router: L'Instadatore di Pacchetti 📦➡️📦

Un **Router** è un dispositivo di rete che opera al **Livello 3 (Rete)** del modello OSI e ha la funzione principale di **instradare (route) i pacchetti di dati** tra reti diverse.

* **Funzionamento:** I router esaminano gli indirizzi IP di destinazione dei pacchetti e, utilizzando le loro **tabelle di routing**, determinano il percorso migliore per inoltrare il pacchetto verso la sua destinazione finale.
* **Connessione di Reti Diverse:** Un router ha solitamente più interfacce, ognuna connessa a una rete diversa (es. una interfaccia verso la tua LAN, un'altra verso Internet).
* **Non è un Hub o uno Switch:** A differenza di hub e switch che operano a livelli inferiori e inoltrano il traffico all'interno della stessa rete, un router connette e dirige il traffico *tra* reti diverse.

### Gateway: Il Punto di Accesso 🚪

Un **Gateway** è un nodo di rete che funge da **punto di accesso** tra due reti diverse. È il "cancello" attraverso il quale i dati devono passare per andare da una rete all'altra.

* **Ruolo Principale:** Il ruolo più comune è quello di connettere una **rete locale (LAN)** a una **rete esterna (WAN)**, come Internet.
* **Default Gateway:** Ogni dispositivo in una rete locale è configurato con un "default gateway", che è l'indirizzo IP del router nella propria rete. Se un dispositivo deve inviare dati a un indirizzo IP che non si trova nella sua rete locale, li invia al default gateway.
* **Router come Gateway:** Sebbene "gateway" sia un concetto più ampio (potrebbe essere anche un server che traduce tra protocolli applicativi), nel contesto delle reti IP, il **router** è il tipo più comune e funzionale di gateway che connette LAN e WAN.

---

## NAT (Network Address Translation): Risparmiare IP e Mascherare le Reti Private 🌐🔄

Il **NAT (Network Address Translation)** è una tecnologia di rete che consente di **modificare gli indirizzi IP** dei pacchetti mentre attraversano un dispositivo di routing (generalmente un router o un firewall). È stato sviluppato principalmente per affrontare l'esaurimento degli indirizzi IPv4.

### Come Funziona il NAT

Immagina la tua rete locale (LAN) con indirizzi IP privati (es. `192.168.1.x`). Questi indirizzi **non sono instradabili su Internet**. Il tuo router ha un **unico indirizzo IP pubblico** assegnato dal tuo ISP.

1.  **Traffico in Uscita:**
    * Quando un dispositivo interno (es. `192.168.1.10`) invia un pacchetto a Internet, il pacchetto arriva al router NAT.
    * Il router **sostituisce l'indirizzo IP sorgente privato** (`192.168.1.10`) con il proprio **indirizzo IP pubblico**.
    * Per permettere a più dispositivi di condividere lo stesso IP pubblico e per distinguere le diverse connessioni, il NAT (in particolare il **PAT/NAPT**) modifica anche la **porta sorgente TCP/UDP** del pacchetto, assegnandone una unica e temporanea.
    * Il router mantiene una **tabella di traduzione** che mappa l'IP privato:porta privata originale all'IP pubblico:porta pubblica tradotta.
    * Il pacchetto, ora con l'IP pubblico del router e la porta tradotta, viene inviato su Internet.

2.  **Traffico in Entrata:**
    * Quando una risposta arriva da Internet, è indirizzata all'**IP pubblico del router** e alla **porta pubblica tradotta**.
    * Il router NAT consulta la sua tabella di traduzione, identifica quale dispositivo interno ha originato quella connessione e **sostituisce l'indirizzo IP di destinazione (il suo IP pubblico) con l'indirizzo IP privato del dispositivo originale** (e la porta di destinazione con la porta privata originale).
    * Il pacchetto viene consegnato al dispositivo corretto nella rete privata.

### Tipi di NAT

* **Static NAT (One-to-One):** Mappa un IP privato a un IP pubblico dedicato (es. per un server interno).
* **Dynamic NAT (Pool NAT):** Mappa IP privati a un pool di IP pubblici disponibili.
* **PAT (Port Address Translation) / NAPT / NAT Overload:** Il tipo più comune. Permette a **molti IP privati di condividere un singolo IP pubblico** modificando le porte sorgente.

### Vantaggi del NAT

* **Conservazione degli indirizzi IPv4:** Ha rallentato l'esaurimento degli indirizzi IPv4.
* **Sicurezza base:** Maschera la topologia della rete interna, rendendo più difficile per gli attaccanti esterni "vedere" i dispositivi privati.

### Svantaggi del NAT

* **Complessità per servizi in ingresso:** Per rendere un server interno raggiungibile da Internet, è necessario configurare il **Port Forwarding** (una regola NAT che inoltra traffico da una specifica porta pubblica a un IP privato:porta interna).
* Può creare problemi con alcune applicazioni che si aspettano una mappatura diretta degli indirizzi IP.
  
Assolutamente! La gestione degli indirizzi IPv6 è un po' diversa e più flessibile rispetto a IPv4.

Ecco chi e come assegna gli indirizzi IPv6 nella rete, a diversi livelli:

---

### Chi Assegna gli Indirizzi IPv6 nella Rete 🌐🔢

L'assegnazione degli indirizzi IPv6 avviene a più livelli, seguendo una gerarchia globale e locale.

#### 1. Livello Globale: IANA e RIRs

* **IANA (Internet Assigned Numbers Authority):** È l'organizzazione centrale che gestisce la distribuzione globale degli indirizzi IP e altri parametri di protocollo. L'IANA delega grandi blocchi di indirizzi IPv6 ai RIRs.
* **RIRs (Regional Internet Registries):** Sono cinque organizzazioni regionali che gestiscono gli indirizzi IP all'interno delle loro specifiche aree geografiche. I RIRs ricevono grandi blocchi da IANA e li distribuiscono agli ISP e alle grandi organizzazioni.
    * **Africa:** AfriNIC
    * **Nord America:** ARIN
    * **Asia/Pacifico:** APNIC
    * **America Latina/Caraibi:** LACNIC
    * **Europa/Medio Oriente/Asia Centrale:** RIPE NCC

#### 2. Livello del Provider: ISP (Internet Service Provider)

* Gli **ISP** ricevono blocchi di indirizzi IPv6 dai RIRs.
* Gli ISP a loro volta **assegnano prefissi IPv6** (blocchi di indirizzi) ai loro clienti:
    * **Grandi aziende/organizzazioni:** Spesso ricevono un prefisso più grande, come un `/48`, che consente loro di suddividere la propria rete in numerose sottoreti `/64`.
    * **Clienti domestici/piccole imprese:** Di solito ricevono un prefisso più piccolo, come un `/56` o un `/64`, a seconda dell'ISP e delle loro esigenze. Il `/56` permette comunque di creare molte sottoreti `/64` all'interno della rete domestica/piccola impresa.

#### 3. Livello Locale: All'interno della Rete (Router e Host)

Una volta che l'organizzazione o l'utente domestico ha ricevuto un prefisso IPv6 dal proprio ISP, i dispositivi all'interno della rete locale ottengono i loro indirizzi IPv6 in vari modi. Qui entra in gioco la flessibilità di IPv6 rispetto a IPv4, dove DHCP era quasi l'unica opzione per l'assegnazione dinamica.

* **1. SLAAC (Stateless Address Autoconfiguration):**
    * Questo è il metodo più comune e distintivo di IPv6 per l'auto-configurazione degli indirizzi.
    * Il **router** sulla rete locale annuncia il prefisso della sottorete (es. `2001:DB8:AAAA:0001::/64`) tramite messaggi **Router Advertisement (RA)**.
    * I **dispositivi (host)** ricevono questo annuncio e generano autonomamente la parte di Interface ID (i rimanenti 64 bit dell'indirizzo) utilizzando:
        * **EUI-64 (Extended Unique Identifier):** Combina il prefisso di rete con l'indirizzo MAC dell'interfaccia di rete del dispositivo per creare un ID interfaccia unico. (Esempio: se il MAC è `00:1A:2B:3C:4D:5E`, l'EUI-64 potrebbe diventare `021A:2BFF:FE3C:4D5E`). Questo metodo ha implicazioni sulla privacy poiché rivela il MAC.
        * **Privacy Extensions (RFC 4941):** Per affrontare le preoccupazioni sulla privacy dell'EUI-64, i sistemi operativi moderni generano spesso ID interfaccia casuali e temporanei che cambiano nel tempo.
    * SLAAC non assegna l'indirizzo del server DNS, che deve essere ottenuto separatamente (spesso tramite un altro RA o DHCPv6).
    * **"Stateless"** significa che il router non tiene traccia degli indirizzi specifici assegnati a ogni host.

* **2. DHCPv6 (Dynamic Host Configuration Protocol for IPv6):**
    * Funziona in modo simile al DHCP per IPv4. Un server DHCPv6 viene configurato per assegnare indirizzi IPv6 completi (prefisso + ID interfaccia) e altre informazioni di configurazione (es. indirizzi DNS).
    * **Stateless DHCPv6 (o DHCPv6 per "Other Configuration Information"):** Spesso usato in combinazione con SLAAC. Gli host ottengono l'indirizzo IP via SLAAC, ma usano DHCPv6 per ottenere informazioni aggiuntive come gli indirizzi dei server DNS. Il router, tramite il suo RA, può indicare agli host di cercare queste "altre" informazioni via DHCPv6.
    * **Stateful DHCPv6:** Il server DHCPv6 mantiene un database di tutti gli indirizzi assegnati agli host, garantendo un controllo più granulare, simile a DHCPv4. Questo è più comune in ambienti aziendali dove è necessaria una gestione centralizzata degli indirizzi.

* **3. Assegnazione Statica Manuale:**
    * Gli amministratori di rete possono configurare manualmente indirizzi IPv6 specifici per dispositivi come server o stampanti, per garantire che abbiano sempre lo stesso indirizzo.

---
**In sintesi:**

* **IANA/RIRs:** Assegnano blocchi globali.
* **ISP:** Assegnano prefissi di rete (blocchi) ai clienti.
* **All'interno della rete del cliente:**
    * I **Router** annunciano i prefissi (per SLAAC).
    * I **Dispositivi (Host)** si auto-configurano (SLAAC con EUI-64 o Privacy Extensions) o ottengono l'indirizzo da un server **DHCPv6** (stateless o stateful).
    * Gli amministratori possono assegnare indirizzi **statici**.

Questa combinazione di metodi offre grande flessibilità nell'implementazione di IPv6, adattandosi a diverse esigenze di rete.

---

Vediamo un esempio pratico di come si potrebbe strutturare logicamente una rete utilizzando il **subnetting in IPv6**, con la sua tipica flessibilità e abbondanza di indirizzi.

Immaginiamo di avere una piccola azienda o un'organizzazione che riceve un **prefisso IPv6 /48** dal suo Internet Service Provider (ISP). Questo è un prefisso abbastanza comune per un'organizzazione e significa che i primi 48 bit sono dedicati alla parte di rete assegnata all'azienda.

**Prefisso Globale Assegnato (es. /48):**
`2001:DB8:AAAA::/48`

Questo prefisso `2001:DB8:AAAA` è il nostro "blocco" principale. I restanti $128 - 48 = 80$ bit sono a nostra disposizione per la subnetting e l'assegnazione agli host.

### Struttura Logica delle Sottoreti IPv6 in un'Azienda

L'azienda può ora utilizzare i **16 bit successivi** (dal 49° al 64°) per definire le proprie sottoreti interne. Poiché $2^{16} = 65536$, l'azienda può creare **65.536 sottoreti** distinte, ognuna con un prefisso `/64`. Ogni sottorete `/64` ha poi $2^{64}$ indirizzi disponibili per gli host, un numero astronomico che rende superfluo preoccuparsi dell'esaurimento degli indirizzi all'interno di una singola sottorete.

Ecco una possibile struttura logica:

---

#### 1. Sottoreti Principali (per dipartimenti o sedi)

Possiamo usare il primo hextet dei 16 bit di Subnet ID per identificare i dipartimenti principali o le sedi:

* **Sottorete IT:**
    `2001:DB8:AAAA:0001::/64`
    * *Descrizione:* Per server, workstation IT, dispositivi di rete.

* **Sottorete Uffici (Amministrazione):**
    `2001:DB8:AAAA:0002::/64`
    * *Descrizione:* Per PC e dispositivi del personale amministrativo.

* **Sottorete Uffici (Vendite):**
    `2001:DB8:AAAA:0003::/64`
    * *Descrizione:* Per PC e dispositivi del team di vendita.

* **Sottorete Ricerca & Sviluppo:**
    `2001:DB8:AAAA:0004::/64`
    * *Descrizione:* Per workstation ad alta potenza, server di sviluppo, ecc.

* **Sottorete Wi-Fi Ospiti:**
    `2001:DB8:AAAA:000A::/64`
    * *Descrizione:* Una sottorete isolata per gli ospiti.

---

#### 2. Sottoreti per Infrastruttura e Servizi

Altri blocchi possono essere dedicati a tipi specifici di infrastruttura:

* **Sottorete Server (Generico):**
    `2001:DB8:AAAA:0100::/64`
    * *Descrizione:* Per server applicativi, database, storage.

* **Sottorete DMZ (Demilitarized Zone):**
    `2001:DB8:AAAA:0200::/64`
    * *Descrizione:* Per server pubblici accessibili da Internet (es. web server, email server).

* **Sottorete VPN:**
    `2001:DB8:AAAA:0300::/64`
    * *Descrizione:* Per i client VPN che si connettono alla rete aziendale.

* **Sottorete Stampanti/IoT:**
    `2001:DB8:AAAA:0400::/64`
    * *Descrizione:* Per stampanti di rete, dispositivi IoT (telecamere, sensori).

---

#### 3. Sottoreti per Sedi Remote o Specifiche

Se l'azienda ha più sedi, ogni sede potrebbe ricevere un proprio blocco:

* **Sede di Milano:**
    `2001:DB8:AAAA:1000::/64` (per la rete principale di Milano)
    `2001:DB8:AAAA:1001::/64` (per il Wi-Fi di Milano)
    `2001:DB8:AAAA:1002::/64` (per i server di Milano)

* **Sede di Roma:**
    `2001:DB8:AAAA:2000::/64` (per la rete principale di Roma)
    `2001:DB8:AAAA:2001::/64` (per il Wi-Fi di Roma)

---

#### Vantaggi di questa Struttura Logica in IPv6:

* **Chiarezza e Semplicità:** Gli indirizzi diventano immediatamente comprensibili. Un indirizzo che inizia con `2001:DB8:AAAA:0001` sai che è un dispositivo IT.
* **Facilità di Routing:** I router possono facilmente aggregare le rotte per interi blocchi di sottoreti (es. tutto ciò che inizia con `2001:DB8:AAAA` va verso l'organizzazione).
* **Gestione del Firewall:** Le regole del firewall possono essere scritte in modo più semplice e leggibile, basandosi sui prefissi delle sottoreti (es. "blocca il traffico in ingresso alla sottorete ospiti da tutto tranne HTTP/HTTPS").
* **Scalabilità:** C'è un'enorme capacità di aggiungere nuove sottoreti senza dover ripensare l'intera struttura degli indirizzi, cosa che era un incubo in IPv4.
* **Nessun NAT richiesto:** Dato che si usano indirizzi Global Unicast, non c'è bisogno di NAT per uscire su Internet, semplificando le configurazioni e la risoluzione dei problemi.

Questo esempio mostra come la grandezza degli indirizzi IPv6 e la notazione `/64` per le sottoreti utente incoraggino una pianificazione gerarchica e logica della rete, molto più pulita e scalabile rispetto a IPv4.

---

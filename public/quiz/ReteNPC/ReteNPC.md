
## Ethernet Switch

1.  **ARP (Address Resolution Protocol):**
    * **Scopo:** L'ARP è un protocollo che opera al **Livello 2 (Collegamento Dati)** ma è strettamente legato al **Livello 3 (Rete)**. Il suo scopo è risolvere gli **indirizzi IP (Layer 3) in indirizzi MAC (Layer 2)** all'interno dello stesso segmento di rete.
    * **Come funziona:** Quando un dispositivo (es. PC A) vuole inviare un pacchetto IP a un altro dispositivo (PC B) sulla *stessa rete locale*, e conosce solo l'IP di PC B, PC A invia un messaggio **ARP Request in broadcast**. Questo messaggio dice: "Chi ha l'indirizzo IP X.X.X.X? Dimmi il tuo indirizzo MAC."
    * **Risposta:** Il dispositivo che possiede quell'indirizzo IP risponde con un messaggio **ARP Reply in unicast**, dicendo: "Io ho l'IP X.X.X.X, e il mio MAC è Y.Y.Y.Y."
    * **Cache ARP:** Entrambi i dispositivi (PC A e PC B) memorizzano questa mappatura IP-MAC nella loro **cache ARP** per future comunicazioni.

2.  **Switch (Ethernet Switch):**
    * **Scopo:** Uno switch opera al **Livello 2 (Collegamento Dati)** del modello OSI. Il suo ruolo è inoltrare i frame Ethernet tra le sue porte in modo efficiente, imparando quali indirizzi MAC sono collegati a quali porte.
    * **Come acquisisce i MAC Address (senza ARP):** Uno switch costruisce la sua **MAC Address Table (o Content Addressable Memory - CAM table)** esaminando gli **indirizzi MAC sorgente** dei frame che riceve su ciascuna porta.
        * Quando un frame arriva su una porta dello switch, lo switch legge l'indirizzo MAC sorgente del frame.
        * Associa questo indirizzo MAC alla porta su cui ha ricevuto il frame e lo memorizza nella sua tabella.
        * Questo processo è chiamato **MAC address learning**.
    * **Inoltro dei Frame:**
        * Se lo switch riceve un frame destinato a un MAC address che ha già nella sua tabella, lo inoltra solo sulla porta specifica a cui quel MAC è associato (unicast).
        * Se il MAC address di destinazione non è nella sua tabella, lo switch invia il frame su tutte le porte (tranne quella di origine), in un processo chiamato **flooding** o **unknown unicast flooding**. Quando il dispositivo di destinazione risponde, lo switch impara il suo MAC e lo aggiunge alla tabella per future comunicazioni.

---

### Mettendo insieme i pezzi:

* I **dispositivi finali** (PC, server, ecc.) utilizzano **ARP** per scoprire l'indirizzo MAC di un altro dispositivo IP sulla stessa rete locale. Questa è una funzione del dispositivo finale.
* Lo **switch** acquisisce gli indirizzi MAC **monitorando il traffico** che passa attraverso le sue porte (leggendo il MAC sorgente dei frame). Non gli interessa se quel traffico è un ARP Request, un ARP Reply, o un semplice pacchetto di dati. Per lo switch, è semplicemente un frame Ethernet con un MAC sorgente da imparare.

**Quindi :**

Uno switch acquisisce gli indirizzi MAC dei dispositivi a lui connessi **leggendo l'indirizzo MAC sorgente di ogni frame Ethernet che riceve**. I messaggi ARP sono un tipo di frame Ethernet, e come tali, il loro MAC sorgente viene imparato dallo switch, ma lo switch imparerebbe il MAC sorgente di *qualsiasi* frame, non solo ARP. L'ARP è un protocollo che i dispositivi usano per risolvere IP in MAC, non un meccanismo che lo switch usa per costruire la sua tabella MAC.

---

### Ruolo dello Switch in una Rete IPv6

**Uno switch, operando al Livello 2 (Collegamento Dati) del modello OSI, non è direttamente influenzato dal fatto che la rete utilizzi IPv4 o IPv6.**

Ecco perché:

1.  **Livello di Operazione:** Uno switch Ethernet si occupa di **frame Ethernet**, non di pacchetti IP. Un frame Ethernet è l'unità di dati al Livello 2 e contiene al suo interno, tra le altre cose, l'indirizzo MAC di origine e l'indirizzo MAC di destinazione.
2.  **Indirizzi MAC:** Gli **indirizzi MAC (Media Access Control)** sono indirizzi fisici univoci assegnati alle interfacce di rete (NIC) dei dispositivi. Sono indirizzi a 48 bit e **non cambiano** a seconda che il dispositivo stia usando IPv4, IPv6 o nessun protocollo IP.
3.  **Apprendimento della Tabella MAC:** Lo switch costruisce la sua **tabella CAM (Content Addressable Memory)**, che mappa gli indirizzi MAC alle porte fisiche, **leggendo l'indirizzo MAC sorgente di *qualsiasi* frame Ethernet** che riceve. Non gli importa cosa c'è all'interno del frame (il payload, che potrebbe essere un pacchetto IPv4, un pacchetto IPv6, o altro). L'unica cosa che conta per lo switch è il MAC sorgente e il MAC di destinazione del frame Ethernet.
4.  **Inoltro dei Frame:** Quando lo switch deve inoltrare un frame, cerca l'indirizzo MAC di destinazione nella sua tabella CAM. Se lo trova, inoltra il frame solo sulla porta corrispondente. Se non lo trova, lo inoltra su tutte le porte (flooding). Questo processo è indipendente dal tipo di protocollo di rete (IPv4 o IPv6) contenuto nel frame.

**In sintesi:**

Per uno switch di Livello 2, un frame contenente un pacchetto IPv4 e un frame contenente un pacchetto IPv6 sono sostanzialmente la stessa cosa: entrambi sono frame Ethernet con indirizzi MAC di origine e destinazione. La logica di inoltro e di apprendimento del MAC dello switch rimane invariata.

L'equivalente IPv6 di ARP è il **Neighbor Discovery Protocol (NDP)**, che fa parte di ICMPv6. Sebbene NDP utilizzi meccanismi diversi da ARP per risolvere gli indirizzi IP in MAC, anche i messaggi NDP sono incapsulati in frame Ethernet e, come tali, contribuiscono all'apprendimento della tabella MAC dello switch esattamente come farebbero i messaggi ARP in IPv4.

---

### Loopback e Switch: Un'Analisi

#### 1. Loopback (Interfaccia Loopback)

Il "loopback" si riferisce principalmente a un'**interfaccia logica (virtuale)** e a un meccanismo di test, non a un componente hardware fisico.

* **Definizione:** L'interfaccia loopback è un'interfaccia di rete virtuale presente sulla maggior parte dei sistemi operativi e dei dispositivi di rete (router, server, PC).
* **Indirizzi:** Le viene assegnato un indirizzo IP speciale:
    * **IPv4:** `127.0.0.1` (con il blocco `127.0.0.0/8`)
    * **IPv6:** `::1` (con il blocco `::1/128`)
* **Scopo Principale:**
    1.  **Test di connettività locale:** Permette a un'applicazione o a un servizio di inviare dati a se stesso senza coinvolgere l'hardware di rete fisico (scheda di rete, cavo, switch). Se fai un `ping 127.0.0.1` e funziona, sai che lo stack TCP/IP sul tuo sistema operativo è operativo.
    2.  **Servizi locali:** Molti servizi (es. server web sul tuo PC per sviluppo) si mettono in ascolto su `127.0.0.1` per accettare connessioni solo da processi sullo stesso computer.
    3.  **Indirizzo stabile per router/server:** Sui router, le interfacce loopback sono spesso usate per assegnare un indirizzo IP stabile che può essere usato come sorgente di traffico (es. per sessioni OSPF o BGP) perché non è legato a un'interfaccia fisica che potrebbe andare down. Questo indirizzo è sempre "up" finché il router è acceso.
* **Natura:** È puramente **software** e **logica**. Il traffico inviato a `127.0.0.1` (o `::1`) non esce mai dalla scheda di rete.

#### 2. Switch (Ethernet Switch)

Come abbiamo discusso, uno switch è un dispositivo **hardware fisico** che opera al Livello 2 (Collegamento Dati).

* **Definizione:** Un dispositivo di rete con più porte che inoltra frame Ethernet basandosi sugli indirizzi MAC.
* **Scopo Principale:** Interconnettere dispositivi all'interno di una singola rete locale (LAN).
* **Natura:** È un dispositivo **hardware fisico**. Il suo funzionamento è legato al traffico che passa attraverso le sue porte fisiche.

---

### Punti di Contatto (o Mancanza di Contatto)

La relazione diretta tra un loopback e uno switch è **quasi inesistente** nel senso che **lo switch non "vede" né interagisce** con il traffico generato o destinato a un'interfaccia loopback.

* **Il traffico loopback non passa attraverso lo switch:** Quando un'applicazione su un computer invia dati a `127.0.0.1`, questi dati vengono elaborati direttamente dallo stack TCP/IP del sistema operativo e reindirizzati all'applicazione di destinazione, **senza mai raggiungere la scheda di rete fisica** del computer. Di conseguenza, non c'è alcun frame Ethernet da inviare, e lo switch non riceverà nulla da imparare o da inoltrare.
* **Lo switch inoltra solo traffico fisico:** Uno switch si occupa solo dei frame che arrivano sulle sue porte fisiche.

**Eccezioni/Situazioni indirette (dove possono essere correlati concettualmente):**

1.  **Test di Rete da un Server:** Se un server è connesso a uno switch e tu, come amministratore, fai un `ping 127.0.0.1` dal server per verificare lo stack IP, lo switch non sarà coinvolto. Ma se poi fai un `ping` all'indirizzo IP *di rete* di un altro server connesso allo stesso switch, allora sì, il traffico passerà attraverso lo switch. In questo senso, il test del loopback è un "primo passo" nella diagnostica, prima di testare la connettività di rete fisica che coinvolge lo switch.
2.  **Indirizzi Loopback su Router connessi a Switch:** Su un router, un'interfaccia loopback può avere un indirizzo IP che viene poi pubblicizzato da protocolli di routing attraverso le interfacce fisiche del router. Se quelle interfacce fisiche sono collegate a uno switch, allora i pacchetti che viaggiano verso o dal router (che usano l'indirizzo loopback come sorgente o destinazione IP) passeranno attraverso lo switch. Ma lo switch vede solo i MAC address delle interfacce fisiche del router, non "sa" dell'esistenza dell'interfaccia loopback.

In sintesi, il loopback è un concetto software/logico per test e servizi locali su un singolo host, mentre lo switch è un dispositivo hardware per la connettività fisica di più host. Non si "incrociano" direttamente, ma possono essere parte dello stesso ecosistema di rete.

---

### Il Problema dei "Loop" nelle Reti con Switch 🕸️

Quando parliamo di "loop" (o cicli) in una rete che utilizza switch, ci riferiamo a una situazione indesiderabile in cui ci sono **percorsi fisici multipli** tra due punti della rete. Se non gestiti correttamente, questi percorsi multipli possono portare a gravi problemi e persino bloccare l'intera rete.

Immagina una rete con due switch (Switch A e Switch B) e due cavi che li collegano. Questa configurazione offre ridondanza (se un cavo fallisce, c'è l'altro), ma crea anche un potenziale loop.

#### Perché un Loop è un Problema per uno Switch (Livello 2)?

Gli switch operano al **Livello 2 (Data Link Layer)** e inoltrano i **frame Ethernet** basandosi sugli indirizzi MAC. A questo livello, gli switch non hanno il concetto di "TTL" (Time To Live) dei pacchetti IP, che impedisce ai pacchetti di girare all'infinito in un loop di routing di Livello 3.

Quando si forma un loop a Livello 2, accadono principalmente tre problemi:

1.  **Broadcast Storms (Tempeste di Broadcast):**
    * I messaggi di broadcast (che devono essere inviati a tutti i dispositivi sulla rete, come le richieste ARP o DHCP) vengono **replicati all'infinito** nello stesso loop.
    * Quando uno switch riceve un broadcast, lo inoltra su tutte le porte (tranne quella da cui è arrivato). Se c'è un loop, questo stesso broadcast verrà ricevuto dall'altro switch, che a sua volta lo re-inoltrerà, creando un ciclo continuo.
    * Il numero di broadcast cresce esponenzialmente, saturando la banda e paralizzando i dispositivi che devono elaborare tutti questi messaggi inutili.

2.  **MAC Address Table Instability (Instabilità della Tabella MAC):**
    * Quando un frame viaggia in un loop, lo switch vede lo stesso indirizzo MAC sorgente arrivare da diverse porte in rapida successione.
    * Lo switch aggiorna continuamente la sua tabella MAC per riflettere l'ultima porta da cui ha visto quel MAC. Questo causa un'instabilità continua nella tabella, rendendo impossibile per lo switch sapere quale porta è quella corretta per un determinato MAC.
    * Di conseguenza, lo switch inizia a comportarsi come un hub, inoltrando il traffico a indirizzi noti su tutte le porte (flooding), peggiorando ulteriormente la congestione.

3.  **Duplicate Frames (Frame Duplicati):**
    * Gli stessi frame di dati (non solo i broadcast) viaggiano più volte sulla rete, venendo replicati a ogni giro del loop.
    * Questo significa che i dispositivi di destinazione ricevono più copie dello stesso dato, causando problemi di elaborazione a livello applicativo e un'ulteriore saturazione della rete.

---

### Come si Previene un Loop: Il Protocollo STP/RSTP 🛡️

Per prevenire i loop a Livello 2, i moderni switch utilizzano un protocollo chiamato **STP (Spanning Tree Protocol)** e la sua versione più rapida **RSTP (Rapid Spanning Tree Protocol)**.

* **Funzionamento di STP/RSTP:**
    * STP/RSTP esamina la topologia della rete per identificare eventuali percorsi ridondanti che potrebbero formare un loop.
    * Blocca logicamente una o più porte su questi percorsi ridondanti, mettendole in uno stato di "blocco" o "standby". La porta bloccata non inoltra traffico utente, ma ascolta i messaggi STP/RSTP.
    * In questo modo, STP/RSTP crea un **unico percorso logico privo di loop** attraverso la rete (un "albero" - *spanning tree*).
    * Se il percorso primario fallisce (es. un cavo si rompe o uno switch si spegne), STP/RSTP rileva il cambiamento e abilita una delle porte precedentemente bloccate, ripristinando la connettività (con un certo tempo di convergenza).

Grazie a STP/RSTP, è possibile avere la **ridondanza fisica** (più cavi tra gli switch per tolleranza ai guasti) **senza incorrere nei problemi dei loop di Livello 2**.

---

In sintesi, i loop negli switch sono un grosso problema che può distruggere una rete LAN. Per questo motivo, protocolli come STP/RSTP sono fondamentali per garantire che le reti siano sia robuste (ridondanti) che funzionali (prive di loop).

---

### Scenario: Switch con due Hub e Comunicazione ARP

**La Topologia:**

* **Switch Centrale (L2)**
    * Porta 1 connessa a **Hub A**
    * Porta 2 connessa a **Hub B**
* **Hub A**
    * Connesso al PC A1
    * Connesso al PC A2
* **Hub B**
    * Connesso al PC B1
    * Connesso al PC B2

**L'Evento Concomitante:**

* **PC A1** invia un messaggio ARP Request per scoprire il MAC Address di **PC B1**.
* **PC B2** invia un messaggio ARP Request per scoprire il MAC Address di **PC A2**.

---

### Analisi Passo-Passo di Cosa Avviene:

Ricordiamo le regole fondamentali:

* **Hub:** Un hub è un dispositivo di Livello 1 (fisico). Non ha "intelligenza" e non legge gli indirizzi MAC. Qualsiasi segnale elettrico ricevuto su una porta viene semplicemente **ripetuto su tutte le altre porte** (tranne quella di origine). Non crea una tabella MAC.
* **Switch:** Uno switch è un dispositivo di Livello 2. Legge gli indirizzi MAC sorgente dei frame per costruire una tabella MAC e inoltra i frame in modo intelligente (unicast se conosce la destinazione, broadcast/flooding se no).
* **ARP Request:** È un messaggio di **broadcast** (viene inviato a tutti i dispositivi sul segmento di rete).

---

**Passo 1: PC A1 invia ARP Request per PC B1**

1.  **PC A1** genera un frame Ethernet con:
    * MAC Destinazione: `FF:FF:FF:FF:FF:FF` (indirizzo broadcast)
    * MAC Sorgente: `MAC_A1`
    * Payload: ARP Request (chiede il MAC di `IP_B1`)
2.  Questo frame arriva a **Hub A**.
3.  **Hub A** riceve il frame da PC A1 e, essendo un hub, lo **ripete su tutte le altre sue porte**:
    * Invia il frame a **PC A2**.
    * Invia il frame allo **Switch** (sulla Porta 1).
4.  Il **PC A2** riceve l'ARP Request, ma vede che l'IP richiesto (`IP_B1`) non è il suo, quindi lo scarta.
5.  Lo **Switch** riceve il frame sulla Porta 1.
    * Legge il MAC Sorgente (`MAC_A1`) e lo aggiunge alla sua tabella MAC: `MAC_A1 -> Porta 1`.
    * Vede che il MAC Destinazione è broadcast (`FF:FF:FF:FF:FF:FF`). Pertanto, lo **inoltra su tutte le sue altre porte** (tranne la Porta 1):
        * Invia il frame sulla **Porta 2** (verso Hub B).
6.  **Hub B** riceve il frame dallo Switch. Essendo un hub, lo **ripete su tutte le altre sue porte**:
    * Invia il frame a **PC B1**.
    * Invia il frame a **PC B2**.
7.  Il **PC B1** riceve l'ARP Request, vede che l'IP richiesto (`IP_B1`) è il suo.
    * Genera un frame ARP Reply con:
        * MAC Destinazione: `MAC_A1` (indirizzo unicast, perché conosce il mittente dell'ARP Request)
        * MAC Sorgente: `MAC_B1`
        * Payload: ARP Reply (contiene `IP_B1` e `MAC_B1`)
    * Invia questo ARP Reply a **Hub B**.
8.  **Hub B** riceve l'ARP Reply da PC B1 e lo **ripete su tutte le sue altre porte**:
    * Invia il frame a **PC B2**.
    * Invia il frame allo **Switch** (sulla Porta 2).
9.  Il **PC B2** riceve l'ARP Reply, ma non è il suo, quindi lo scarta.
10. Lo **Switch** riceve l'ARP Reply sulla Porta 2.
    * Legge il MAC Sorgente (`MAC_B1`) e lo aggiunge alla sua tabella MAC: `MAC_B1 -> Porta 2`.
    * Vede che il MAC Destinazione (`MAC_A1`) è già nella sua tabella e associato alla Porta 1. Pertanto, lo **inoltra solo sulla Porta 1** (unicast).
11. **Hub A** riceve l'ARP Reply dallo Switch e lo **ripete su tutte le sue altre porte**:
    * Invia il frame a **PC A1**.
    * Invia il frame a **PC A2**.
12. Il **PC A1** riceve l'ARP Reply, lo elabora e aggiunge `IP_B1 <-> MAC_B1` alla sua cache ARP.
13. Il **PC A2** riceve l'ARP Reply, ma non è il suo, quindi lo scarta.

---

**Passo 2: PC B2 invia ARP Request per PC A2 (Simultaneamente o quasi)**

Questo processo avviene in parallelo (o con un leggerissimo sfasamento temporale). I passaggi sono speculari:

1.  **PC B2** genera un frame ARP Request (destinazione broadcast, sorgente `MAC_B2`, chiede il MAC di `IP_A2`).
2.  Questo frame arriva a **Hub B**.
3.  **Hub B** lo ripete su tutte le sue porte: a **PC B1** e allo **Switch** (sulla Porta 2).
4.  Lo **Switch** riceve il frame sulla Porta 2.
    * Legge il MAC Sorgente (`MAC_B2`) e lo aggiunge alla sua tabella MAC: `MAC_B2 -> Porta 2`.
    * Vede che è broadcast, quindi lo inoltra su tutte le altre porte: sulla **Porta 1** (verso Hub A).
5.  **Hub A** riceve il frame dallo Switch e lo ripete su tutte le sue porte: a **PC A1** e a **PC A2**.
6.  Il **PC A2** riceve l'ARP Request, vede che l'IP richiesto (`IP_A2`) è il suo.
    * Genera un frame ARP Reply con:
        * MAC Destinazione: `MAC_B2` (unicast)
        * MAC Sorgente: `MAC_A2`
        * Payload: ARP Reply (contiene `IP_A2` e `MAC_A2`)
    * Invia questo ARP Reply a **Hub A**.
7.  **Hub A** riceve l'ARP Reply da PC A2 e lo ripete su tutte le sue altre porte: a **PC A1** e allo **Switch** (sulla Porta 1).
8.  Lo **Switch** riceve l'ARP Reply sulla Porta 1.
    * Legge il MAC Sorgente (`MAC_A2`) e lo aggiunge alla sua tabella MAC: `MAC_A2 -> Porta 1`.
    * Vede che il MAC Destinazione (`MAC_B2`) è nella sua tabella e associato alla Porta 2. Pertanto, lo **inoltra solo sulla Porta 2** (unicast).
9.  **Hub B** riceve l'ARP Reply dallo Switch e lo ripete su tutte le sue altre porte: a **PC B1** e a **PC B2**.
10. Il **PC B2** riceve l'ARP Reply, lo elabora e aggiunge `IP_A2 <-> MAC_A2` alla sua cache ARP.

---

### Conclusioni e Osservazioni Importanti:

* **Efficienza:** Questo scenario evidenzia perché gli switch sono preferibili agli hub. Se al posto degli hub ci fossero stati altri switch, la diffusione dei broadcast sarebbe stata contenuta solo alle porte rilevanti (anche se gli ARP Request sono comunque broadcast iniziali). Con gli hub, ogni broadcast si propaga a tutti i dispositivi connessi all'hub, che a sua volta è collegato allo switch.
* **Domini di Collisione e Broadcast:**
    * Ogni porta di uno **switch** crea un **dominio di collisione separato**. In questo scenario, le due porte dello switch creano due domini di collisione separati, uno per ogni hub.
    * Tuttavia, gli **hub** creano un **singolo dominio di collisione** per tutte le porte a loro connesse. Quindi, l'Hub A e i PC A1/A2 condividono un dominio di collisione, e l'Hub B e i PC B1/B2 condividono un altro.
    * L'intero network (Switch + Hub A + PC A1/A2 + Hub B + PC B1/B2) fa parte di un **unico dominio di broadcast**. Questo significa che ogni broadcast generato da un dispositivo (come l'ARP Request) viene ricevuto da *tutti* gli altri dispositivi.
* **Prestazioni:** In una rete reale, avere hub collegati a uno switch (soprattutto con molti dispositivi o traffico elevato) ridurrebbe drasticamente le prestazioni a causa delle collisioni all'interno dei domini degli hub e dell'eccessivo traffico di broadcast.

Questo esercizio mentale aiuta a visualizzare il flusso dei dati e il ruolo di ciascun dispositivo di rete!

--- 

Un **dominio di collisione** è un segmento di rete in cui i pacchetti di dati possono "scontrarsi" o collidere tra loro se più dispositivi tentano di trasmettere dati contemporaneamente sullo stesso mezzo condiviso. Quando si verifica una collisione, i dati diventano corrotti e i dispositivi devono ritrasmettere i pacchetti, riducendo l'efficienza complessiva della rete.

---

### Spiegazione Dettagliata

Immagina un'unica conversazione in una stanza dove tutti parlano nello stesso momento: nessuno capisce niente. Questo è un dominio di collisione.

* **Nel contesto di Ethernet (standard 802.3):**
    * Le collisioni si verificano principalmente nelle reti Ethernet che utilizzano il meccanismo **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**.
    * CSMA/CD permette ai dispositivi di "ascoltare" il mezzo di trasmissione prima di inviare dati (Carrier Sense). Se il mezzo è libero, trasmettono. Se rilevano una collisione durante la trasmissione (Collision Detection), interrompono l'invio, aspettano un periodo di tempo casuale (backoff) e riprovano.

* **Dispositivi e Domini di Collisione:**
    * **Hub:** Un hub è un dispositivo di Livello 1 (fisico) che semplicemente ripete i segnali elettrici su tutte le sue porte. Per questo motivo, **tutte le porte di un hub fanno parte di un unico grande dominio di collisione**. Se più dispositivi collegati allo stesso hub tentano di trasmettere contemporaneamente, si verifica una collisione che impatta tutti.
    * **Switch:** Uno switch è un dispositivo di Livello 2 (Data Link). La sua intelligenza gli permette di inoltrare i frame solo verso la porta di destinazione specifica. Fondamentalmente, **ogni porta di uno switch crea un dominio di collisione separato**. Questo significa che due dispositivi collegati a porte diverse dello switch possono trasmettere contemporaneamente senza causare collisioni tra loro, migliorando drasticamente le prestazioni della rete.
    * **Bridge:** I bridge funzionano in modo simile agli switch (infatti gli switch possono essere considerati bridge multi-porta). Anche loro dividono i domini di collisione.
    * **Router:** I router operano al Livello 3 (Rete) e, per definizione, dividono i **domini di broadcast** (che sono più grandi dei domini di collisione) oltre ai domini di collisione.

---

### Esempio Pratico

* **Rete con Hub:** Se hai un hub con 4 PC collegati, tutti e 4 i PC sono nello stesso dominio di collisione. Se il PC1 e il PC2 inviano dati nello stesso momento, si scontrano.
* **Rete con Switch:** Se hai uno switch con 4 PC collegati, e ogni PC è collegato a una porta diversa, avrai 4 domini di collisione separati. Il PC1 può inviare dati al PC3 mentre il PC2 invia dati al PC4, senza collisioni tra loro.

L'introduzione degli switch ha rappresentato un enorme passo avanti nelle prestazioni delle reti locali proprio perché ha ridotto drasticamente le dimensioni dei domini di collisione, permettendo più trasmissioni simultanee e riducendo le ritrasmissioni dovute a collisioni.
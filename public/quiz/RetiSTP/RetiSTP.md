

## Spanning Tree Protocol (STP) e Varianti

Il **Protocollo Spanning Tree (STP)** è fondamentale per la stabilità delle reti di Livello 2 (Data Link Layer). Il suo scopo primario è prevenire i **loop di switching (loop di Livello 2)**, che si verificano quando in una rete esistono percorsi fisici ridondanti tra gli switch.

---

### La Problematica dei Loop di Livello 2

I loop di Livello 2 sono catastrofici per una rete e causano tre problemi principali:

1.  **Tempeste di Broadcast:** I pacchetti broadcast (es. richieste ARP) vengono replicati e rimbalzano incessantemente tra gli switch lungo i percorsi ridondanti, saturando la larghezza di banda e rendendo la rete inutilizzabile.
2.  **Instabilità delle Tabelle MAC:** A causa dei percorsi multipli, lo switch riceve lo stesso frame unicast da diverse porte, inducendolo ad aggiornare continuamente (e in modo errato) l'associazione tra un indirizzo MAC e una porta. Questo "flapping" impedisce l'inoltro corretto del traffico unicast.
3.  **Duplicazione dei Frame:** I frame unicast possono essere consegnati al destinatario più volte, causando problemi a livello applicativo.

---

### STP (IEEE 802.1D): I Fondamentali

STP risolve questi problemi creando una **topologia logica ad albero senza loop** sulla base di una topologia fisica che li includerebbe. Mantiene attivi solo i percorsi essenziali e blocca (logicamente) i percorsi ridondanti, che però rimangono disponibili come backup.

1.  **Elezione del Root Bridge:**
    * È lo **switch principale** della topologia STP, il punto di riferimento da cui l'albero si sviluppa.
    * Viene eletto lo switch con il **Bridge ID (BID) più basso**.
    * Il BID è composto da due parti: **Priorità del Bridge** (valore configurabile, di default 32768) + **Indirizzo MAC** dello switch.
    * In caso di parità di priorità, vince lo switch con l'**indirizzo MAC più basso**.

2.  **Stati delle Porte (802.1D):**
    * Le porte passano attraverso diversi stati durante la convergenza di STP (lentamente per 802.1D):
        * **Disabled:** Porta amministrativamente spenta.
        * **Blocking:** Non inoltra frame dati, non apprende MAC address, ma riceve BPDU. Previene i loop.
        * **Listening:** Non inoltra frame dati, non apprende MAC address. Prepara la transizione.
        * **Learning:** Non inoltra frame dati, ma **apprende MAC address**.
        * **Forwarding:** Inoltra frame dati e apprende MAC address. Porta pienamente operativa.

3.  **Ruoli delle Porte (802.1D):**
    * **Root Port (RP):** Ogni switch non-Root Bridge ha **una sola RP**. È la porta che offre il **percorso a costo più basso** per raggiungere il Root Bridge.
        * Criteri di selezione: 1) Costo del percorso radice più basso, 2) Bridge ID del mittente più basso, 3) ID della porta del mittente più basso.
        * La RP è sempre in stato **Forwarding**.
    * **Designated Port (DP):** Su ogni **segmento di rete condiviso**, c'è **una e una sola DP**. È la porta sullo switch che ha il **percorso a costo più basso per raggiungere il Root Bridge *da quel segmento***.
        * Tutte le porte del **Root Bridge** sono **sempre DP**.
        * La DP è sempre in stato **Forwarding**.
    * **Non-Designated Port (Bloccata):** Tutte le altre porte che non sono né RP né DP per un segmento vengono messe in stato di **Blocking** per prevenire i loop.

---

### Varianti di STP

Le varianti di STP sono nate per migliorare la velocità e la flessibilità dello standard 802.1D.

1.  **RSTP (Rapid Spanning Tree Protocol - IEEE 802.1w):**
    * **Vantaggio chiave:** Convergenza molto più rapida (pochi secondi o millisecondi).
    * **Stati delle Porte semplificati:** **Discarding** (non inoltra, non apprende), **Learning** (non inoltra, apprende), **Forwarding** (inoltra, apprende).
    * **Ruoli delle Porte aggiuntivi:** **Alternate Port** (percorso alternativo bloccato verso il Root Bridge), **Backup Port** (percorso ridondante bloccato sullo stesso segmento).
    * **Meccanismo Proposal/Agreement:** Permette una transizione quasi istantanea allo stato di Forwarding su link punto-punto.
    * **Edge Ports:** Porte che passano immediatamente allo stato di Forwarding (equivalente a PortFast).
    * Retrocompatibile con STP 802.1D.

2.  **PVST+ (Per-VLAN Spanning Tree Plus):**
    * **Natura:** Implementazione **proprietaria Cisco**, basata su STP 802.1D (o RSTP per Rapid PVST+).
    * **Funzionamento:** Esegue **un'istanza separata di Spanning Tree per ogni VLAN** attiva. Ogni VLAN ha il suo Root Bridge, le sue Root Port e la sua topologia.
    * **Vantaggi:** Permette il **bilanciamento del carico** sui link ridondanti (diversi link attivi per VLAN diverse) e un controllo granulare della topologia per ogni VLAN.
    * **Svantaggi:** Aumenta l'**overhead di CPU e BPDU** all'aumentare del numero di VLAN.

3.  **MSTP (Multiple Spanning Tree Protocol - IEEE 802.1s):**
    * **Natura:** Standard IEEE, combina RSTP con la flessibilità multi-istanza.
    * **Funzionamento:** Raggruppa più VLAN in **Istanze MST (MSTI)**, riducendo il numero di istanze STP da gestire. Gli switch sono organizzati in **Regioni MST**.
    * **Vantaggi:** **Riduce drasticamente l'overhead** (rispetto a PVST+) in reti con molte VLAN, migliorando la scalabilità e consentendo comunque il bilanciamento del carico.
    * **Svantaggi:** Maggiore **complessità di configurazione**.
    * Retrocompatibile con RSTP e STP.

---

### Best Practice e Funzionalità Aggiuntive

Queste configurazioni migliorano la stabilità e la sicurezza della rete STP.

1.  **PortFast:**
    * **Funzione:** Permette a una porta di accedere immediatamente allo stato di Forwarding.
    * **Utilizzo:** Solo su **porte di accesso (access port)** connesse a dispositivi finali (PC, server, stampanti).
    * **Beneficio:** Riduce i tempi di attesa per la connettività.

2.  **BPDU Guard:**
    * **Funzione:** Disabilita una porta se riceve un BPDU (mettendola in stato di **error-disable**).
    * **Utilizzo:** Su **porte di accesso (access port)** per prevenire l'introduzione di switch non autorizzati o mal configurati.
    * **Beneficio:** Protegge la topologia STP da influenze esterne.

3.  **BPDU Filter:**
    * **Funzione:** Impedisce l'invio e la ricezione di BPDU su una porta.
    * **Utilizzo:** Con **estrema cautela**, tipicamente su porte Edge (PortFast enabled) dove si è certi che non ci saranno mai altri switch.
    * **Rischio:** Se usato impropriamente su un link verso un altro switch, può creare loop.

4.  **Root Guard:**
    * **Funzione:** Impedisce a uno switch collegato a una porta di diventare il Root Bridge.
    * **Utilizzo:** Su porte che puntano verso segmenti di rete dove **non si desidera** che risieda il Root Bridge (es. porte verso gli switch di accesso).
    * **Beneficio:** Mantiene il Root Bridge nell'area desiderata della rete.

5.  **Loop Guard:**
    * **Funzione:** Rileva i **guasti unidirezionali dei link** (quando una porta smette di ricevere BPDU).
    * **Utilizzo:** Si abilita su Root Port e Alternate Port.
    * **Azione:** Mette la porta in stato di **Loop-inconsistent (blocco)** per prevenire loop che potrebbero altrimenti formarsi a causa di un guasto parziale del link non rilevato da STP.

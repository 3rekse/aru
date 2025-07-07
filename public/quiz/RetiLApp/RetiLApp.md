## 📘 Lezione Approfondita sulle Reti Informatiche

1. Introduzione alle reti informatiche
   Una rete è un insieme di dispositivi collegati tra loro per condividere informazioni e risorse. L’esempio più grande e noto è Internet. All’interno di una rete, ogni dispositivo (detto nodo) può comunicare con altri nodi utilizzando protocolli standardizzati.

2. URL e HTTP
   Un URL (Uniform Resource Locator) è un indirizzo leggibile dall'uomo che identifica una risorsa su Internet. Include il protocollo (es. http o https), il dominio, e il percorso della risorsa. HTTP (HyperText Transfer Protocol) è il protocollo usato per trasferire dati tra un client (come un browser) e un server web. Le richieste HTTP sono stateless: ogni richiesta è indipendente dalle altre. Per gestire lo stato tra una richiesta e l'altra si usano strumenti come i cookie o le sessioni. I metodi HTTP più comuni sono GET per ottenere dati, POST per inviarli, PUT per aggiornarli, e DELETE per rimuoverli.

Il corpo del messaggio HTTP contiene i dati trasmessi, come file HTML, immagini o JSON. Le intestazioni HTTP forniscono metainformazioni: ad esempio, l'intestazione Content-Type specifica il formato del contenuto restituito dal server.

3. Codici di stato HTTP
   I codici di stato HTTP indicano l'esito di una richiesta. I codici che iniziano con:

* 2xx indicano successo (es. 200: OK)
* 3xx indicano redirezioni (es. 302: trovato temporaneamente)
* 4xx errori del client (es. 404: non trovato)
* 5xx errori del server (es. 500: errore interno)

4. Gestione delle connessioni: Keep-Alive
   HTTP/1.1 ha introdotto la gestione persistente delle connessioni tramite il meccanismo Keep-Alive. Questo consente di riutilizzare la stessa connessione TCP per più richieste, riducendo la latenza e il carico sui server. L’intestazione Connection: keep-alive segnala al server di mantenere aperta la connessione. Se invece contiene close, la connessione viene chiusa dopo la risposta.

Il parametro keep\_alive\_timeout configura per quanto tempo mantenere la connessione attiva. Nei server web come Apache o Nginx, queste impostazioni si configurano rispettivamente nei file httpd.conf e nei blocchi di configurazione server.

5. DNS – Domain Name System
   Il DNS è il sistema che consente di tradurre nomi di dominio (come [www.example.com](http://www.example.com)) in indirizzi IP, necessari per la comunicazione tra dispositivi. I record DNS includono:

* A: collega un dominio a un indirizzo IPv4
* AAAA: collega a un indirizzo IPv6
* MX: indica il server di posta
* CNAME: crea un alias
* NS: specifica i name server autorizzati per il dominio

Il resolver DNS locale è il primo a ricevere la richiesta e può risolvere direttamente il nome (se ha i dati in cache) oppure interpellare altri server. I server autoritativi contengono le risposte ufficiali. Il campo TTL (Time To Live) determina per quanto tempo i record possono essere memorizzati in cache.

I Top-Level Domain (TLD) rappresentano la parte finale di un nome di dominio. Possono essere generici (.com, .org) o legati a codici nazionali (.it, .fr).

6. Indirizzamento IP
   Gli indirizzi IP identificano in modo univoco ogni dispositivo su una rete. L’IPv4 utilizza indirizzi a 32 bit (es. 192.168.1.1), mentre l’IPv6 impiega 128 bit e supporta un numero immensamente maggiore di dispositivi (es. 2001\:db8::1).

Gli indirizzi possono essere statici (assegnati manualmente) o dinamici (assegnati automaticamente da un server DHCP).

7. Protocolli e porte
   I protocolli di comunicazione stabiliscono le regole per il trasferimento dei dati. Ogni protocollo utilizza una o più porte:

* HTTP → porta 80
* HTTPS → porta 443 (connessione sicura via TLS/SSL)
* FTP → porta 21
* SMTP (posta) → porta 25

Queste porte identificano il tipo di servizio al quale una richiesta è diretta.

8. Stato della comunicazione e sessioni
   Poiché HTTP è senza stato, l'applicazione deve usare strumenti come i cookie (file salvati nel browser) o le sessioni (informazioni temporanee sul server) per mantenere informazioni persistenti sugli utenti, come la login o il carrello di un e-commerce.

9. Connessioni TCP e Three-Way Handshake
   La trasmissione affidabile dei dati avviene tramite TCP (Transmission Control Protocol), che inizia con un processo detto three-way handshake. Questo include tre fasi:

* Il client invia un pacchetto SYN.
* Il server risponde con SYN-ACK.
* Il client completa con ACK.

Dopo questa sequenza, la connessione è stabilita e i dati possono essere trasmessi in modo sicuro e ordinato. Una volta stabilita la connessione, può essere mantenuta attiva (keep-alive) o chiusa a seconda della configurazione.

10. Architetture di rete

a) Client/Server
In questa architettura, un client invia richieste a un server, che fornisce risposte. Il Web è un esempio di sistema client/server, dove il browser è il client e i siti web sono ospitati su server.

b) Peer-to-Peer
Tutti i dispositivi (peer) sono uguali e possono fungere sia da client che da server. Non esiste un nodo centrale. È utilizzata ad esempio nei sistemi di file sharing decentralizzati.

c) Multi-Tier (a più livelli)
Un’architettura a tre livelli è composta da:

* Livello di presentazione: interfaccia utente (es. browser)
* Livello applicativo: logica del software (es. elaborazione dati)
* Livello dati: gestione del database

Questa struttura migliora la scalabilità, la sicurezza e la manutenibilità. I livelli possono essere aggiornati o gestiti separatamente.

11. Load Balancing
    Un bilanciatore di carico (load balancer) distribuisce il traffico tra più server per migliorare la disponibilità, ridurre i tempi di risposta e assicurare la continuità del servizio. Può operare a livello 4 (trasporto, TCP) o livello 7 (applicazione, HTTP). Il client si connette all'indirizzo IP virtuale del load balancer, che smista le richieste ai server backend disponibili.

12. Altri concetti di dominio
    Un sottodominio è una parte del dominio principale (es. mail.google.com è un sottodominio di google.com). Sono utili per organizzare sezioni distinte di un sito o servizio, spesso associando funzioni specifiche o applicazioni.

---

## Load Balancer: Il Direttore d'Orchestra per Evitare il Sovraccarico 🚦⚖️

Immagina un'applicazione web o un servizio online molto popolare. Se tutte le richieste degli utenti arrivassero a un singolo server, questo server verrebbe rapidamente **sovraccaricato** 💥 e l'applicazione rallenterebbe o addirittura andrebbe in crash. È qui che entra in gioco il **Load Balancer**, un componente cruciale nelle architetture distribuite.

Il Load Balancer (o **Bilanciatore di Carico**) è un dispositivo (hardware o software) che agisce come un **intermediario intelligente** tra i client (utenti) e un gruppo di server (spesso chiamato "server farm" o "pool di server") che ospitano la stessa applicazione o servizio. Il suo scopo principale è **distribuire il traffico di rete in entrata** su più server backend, in modo da:

1.  **Ottimizzare l'utilizzo delle risorse:** Nessun server è sovraccaricato mentre altri sono inattivi.
2.  **Massimizzare la velocità e la disponibilità:** Le richieste vengono gestite più rapidamente e il servizio rimane sempre disponibile.
3.  **Garantire l'affidabilità:** Se un server fallisce, il traffico viene automaticamente reindirizzato agli altri.

### Come i Load Balancer Prevengono il Sovraccarico (e i Loro Meccanismi) 🛡️📈

Il cuore del funzionamento di un Load Balancer per prevenire il sovraccarico risiede in alcuni meccanismi chiave:

#### 1. Distribuzione Intelligente del Traffico (Algoritmi di Bilanciamento) 🧠🔄

Il Load Balancer non distribuisce il traffico a caso. Utilizza degli **algoritmi di bilanciamento** per decidere a quale server inviare ogni nuova richiesta. Questi algoritmi sono fondamentali per evitare che un server si sovraccarichi:

* **Round Robin:** Semplice distribuzione sequenziale. La prima richiesta va al Server A, la seconda al Server B, la terza al Server C, e poi ricomincia da A. È buono per server con capacità simili, ma non considera il carico effettivo.
* **Least Connection (Minimo Numero di Connessioni):** Questo algoritmo invia la nuova richiesta al server con il **minor numero di connessioni attive**. È più intelligente del Round Robin perché tiene conto del carico attuale, prevenendo il sovraccarico su server già occupati. È molto efficace per sessioni lunghe.
* **Least Response Time (Minimo Tempo di Risposta):** Invia la nuova richiesta al server che ha mostrato il **minor tempo medio di risposta** alle richieste precedenti. Questo tiene conto non solo del numero di connessioni ma anche della rapidità con cui il server le elabora.
* **Weighted Round Robin / Weighted Least Connection:** Permette di assegnare un "peso" o priorità diversa a ciascun server. I server più potenti o con maggiori risorse ricevono un peso maggiore e, di conseguenza, un numero proporzionalmente più alto di richieste. Questo è ottimo per ambienti con server di capacità diverse.
* **IP Hash:** Le richieste dallo stesso indirizzo IP sorgente vengono sempre inviate allo stesso server. Questo è utile per mantenere la **persistenza della sessione** (session affinity) senza bisogno di sessioni appiccicose. Tuttavia, può portare a distribuzioni sbilanciate se un singolo IP genera molto traffico.

#### 2. Health Checks (Controlli di Salute) 🩺💚

Uno dei meccanismi più importanti per prevenire il sovraccarico e garantire l'affidabilità è l'esecuzione costante di **Health Checks**. Il Load Balancer invia regolarmente delle "sonde" (es. richieste HTTP, ping, test TCP) a ciascun server nel pool.

* **Come previene il sovraccarico:** Se un server inizia a rispondere lentamente, a generare errori (es. HTTP 5xx), o smette del tutto di rispondere, il Load Balancer lo rileva. Quando un server non supera gli health checks, il Load Balancer lo considera "malato" o "non disponibile" e **smette immediatamente di inviargli nuove richieste**. Questo previene che un server in difficoltà venga ulteriormente sovraccaricato, isolando il problema.
* Una volta che il server "malato" recupera e inizia a superare nuovamente gli health checks, il Load Balancer lo reintegra nel pool e ricomincia a inviargli traffico.

#### 3. Session Persistence / Session Affinity (Persistenza della Sessione) 🔗👨‍💻

Per molte applicazioni web (es. carrelli della spesa, login utente), è fondamentale che le richieste successive dallo stesso utente (o dalla stessa "sessione") vengano indirizzate allo **stesso server backend**. Questo è chiamato **persistenza della sessione** o **session affinity**.

* **Come previene il sovraccarico (indirettamente):** Se non gestita correttamente, la necessità di persistenza potrebbe far sì che un utente particolarmente attivo "blocchi" un server, ma il Load Balancer con session affinity tenta di gestire questo in modo efficiente.
* **Tecniche:**
    * **Cookie-based:** Il Load Balancer inserisce un cookie nel browser del client che identifica il server backend. Le richieste future con quel cookie vanno sempre allo stesso server.
    * **IP-based (IP Hash):** Come menzionato sopra, le richieste dallo stesso IP sorgente vengono sempre instradate allo stesso server.
    * **SSL Session ID:** Se si usano connessioni SSL/TLS, l'ID di sessione SSL può essere usato per la persistenza.

#### 4. Scalabilità (Scaling Out/In) ⬆️⬇️

I Load Balancer sono intrinsecamente legati al concetto di scalabilità orizzontale (**scaling out**), che consiste nell'aggiungere più server al pool quando il carico aumenta.

* **Prevenzione del sovraccarico:** Quando il traffico cresce, invece di sovraccaricare i server esistenti, si possono aggiungere nuovi server al pool. Il Load Balancer li rileva e inizia a distribuire il traffico anche su di essi, aumentando la capacità complessiva del sistema e diluendo il carico.
* Allo stesso modo, in periodi di basso traffico (**scaling in**), si possono rimuovere server, risparmiando risorse, senza che il Load Balancer tenti di inviare traffico a server non più esistenti.

#### 5. Offloading SSL/TLS (Terminazione SSL) 🔐➡️🔓

I Load Balancer più avanzati possono terminare le connessioni SSL/TLS in entrata. Questo significa che il Load Balancer gestisce la crittografia/decrittografia.

* **Come previene il sovraccarico:** Questo alleggerisce i server backend dal pesante compito computazionale della crittografia, permettendo loro di concentrarsi sull'elaborazione delle richieste dell'applicazione. Ciò riduce il carico sui singoli server e migliora le prestazioni complessive.

---

### In Sintesi: Il Load Balancer come Garante della Performance e Affidabilità

Il Load Balancer non è solo un "distributore di traffico"; è un gestore intelligente del carico che utilizza algoritmi, controlli di salute e meccanismi di persistenza per assicurare che nessun server venga sovraccaricato. Agisce come un punto di coordinamento che permette al sistema di **scalare, essere resiliente e fornire un servizio costante e performante** anche sotto intense pressioni di traffico. Senza i Load Balancer, molte delle applicazioni web e dei servizi online che usiamo quotidianamente non sarebbero in grado di gestire la loro mole di utenti.

In una configurazione con Load Balancer, la connessione TCP si apre tra il **socket del client** e il **socket del server Load Balancer**, non direttamente con il server backend.

## Ecco come funziona la catena di connessioni in dettaglio:

1.  **Client (Browser/App) ➡️ Load Balancer:**
    * Quando un client (es. il tuo browser) vuole connettersi a un servizio (es. `www.miosito.com`), il DNS risolve il nome di dominio nell'indirizzo IP del **Load Balancer**.
    * Il client quindi tenta di stabilire una connessione TCP (il famoso "three-way handshake" SYN, SYN-ACK, ACK) con l'indirizzo IP e la porta del Load Balancer.
    * Il **Load Balancer funge da terminatore di questa connessione TCP**.

2.  **Load Balancer ➡️ Server Backend Selezionato:**
    * Una volta che il Load Balancer ha accettato e terminato la connessione TCP con il client, utilizza i suoi algoritmi di bilanciamento e i risultati degli health check per selezionare il **server backend più appropriato** a cui inoltrare la richiesta.
    * A questo punto, il **Load Balancer apre una NUOVA connessione TCP** con il server backend selezionato.

3.  **Comunicazione Bidirezionale e Proxying:**
    * Il Load Balancer agisce come un **proxy**. Inoltra le richieste del client al server backend e le risposte del server backend al client, gestendo le due connessioni TCP separate.
    * In molti casi, specialmente con Load Balancer avanzati (Layer 7), il Load Balancer può anche ispezionare e modificare il traffico applicativo (HTTP, HTTPS) prima di inoltrarlo, offrendo funzionalità aggiuntive come caching, compressione, riscrittura URL e terminazione SSL/TLS.

### Perché questo è importante per evitare il sovraccarico?

* **Isolamento:** Se un server backend è sovraccarico o fallisce, la connessione del client non cade direttamente. Il Load Balancer rileva il problema e reindirizza le nuove connessioni (e, a volte, quelle esistenti in certi scenari) ad altri server sani. Il client non è consapevole del fallimento del server backend, vede solo che il servizio è ancora disponibile.
* **Gestione del Carico:** Il Load Balancer può orchestrare il traffico tra i server, assicurandosi che nessuno di essi riceva più richieste di quante ne possa gestire in un dato momento. Se una connessione TCP del client è già stabilita con il Load Balancer, questo può ancora decidere come distribuire il lavoro a livello applicativo (se è un Layer 7 Load Balancer) senza che il client debba rinegoziare la connessione.
* **Offloading:** Come menzionato, la terminazione SSL/TLS sul Load Balancer sposta il carico computazionale della crittografia/decrittografia dai server applicativi, che possono così dedicarsi interamente all'elaborazione delle richieste.

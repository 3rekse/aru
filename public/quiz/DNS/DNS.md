# Il DNS (Domain Name System): La 'Guida Telefonica' di Internet

Il **DNS (Domain Name System)** è un sistema distribuito e gerarchico fondamentale per il funzionamento di Internet. Il suo **scopo principale** è quello di **tradurre nomi di dominio leggibili dall'uomo (es. `www.google.com`) in indirizzi IP numerici (es. `142.250.186.132`)** che i computer utilizzano per identificarsi e comunicare.

Senza il DNS, gli utenti dovrebbero ricordare lunghe e complesse sequenze numeriche per accedere ai servizi online, rendendo la navigazione praticamente impraticabile.

## La Natura Gerarchica e Distribuita del DNS

Il DNS non è un singolo server centrale, ma un **sistema gerarchico e distribuito**. Questo significa che le informazioni sui domini sono organizzate a livelli e dislocate su numerosi server in tutto il mondo. Questa architettura garantisce **resilienza e scalabilità**, rendendo il sistema estremamente robusto contro i singoli punti di fallimento e capace di gestire l'enorme volume di richieste di Internet.

La gerarchia si sviluppa su più livelli, partendo dalla radice:

* **Root Name Server (Server Radice):**
    * Sono la **cima della gerarchia DNS**. Non contengono gli indirizzi IP di tutti i siti web del mondo.
    * La loro funzione principale è quella di contenere il **file di zona radice (root zone file)**, che elenca gli **indirizzi IP dei server dei nomi autorevoli per ciascun Top-Level Domain (TLD)** (come `.com`, `.it`, `.org`, `.gov`, ecc.).
    * La gestione e la manutenzione del file di zona radice sono responsabilità di **IANA (Internet Assigned Numbers Authority)**, una funzione di ICANN.
    * Gli aggiornamenti al file di zona radice (es. aggiunta di nuovi TLD) sono pubblicati con alta frequenza (spesso più volte al giorno), garantendo che la base del DNS sia sempre aggiornata.
    * Ci sono 13 cluster di server radice logicamente definiti, distribuiti globalmente per ridondanza.

* **TLD (Top-Level Domain) Name Server:**
    * Questi server gestiscono un'estensione di dominio specifica (es. i server per `.com`, `.org`, `.it`).
    * Contengono gli **indirizzi IP dei server dei nomi autorevoli per tutti i domini registrati sotto quel TLD specifico** (es. i server che gestiscono `google.com`).
    * Ogni TLD è gestito da un'organizzazione specifica chiamata **Registry Operator** (es. VeriSign per `.com` e `.net`, il Registro .it per `.it`).
    * Quando un dominio viene registrato o i suoi nameserver vengono modificati tramite un **registrar**, il registrar comunica queste informazioni al rispettivo Registry Operator.
    * Gli aggiornamenti sui TLD Name Server avvengono molto frequentemente, spesso quasi in tempo reale.

* **Authoritative Name Server (Server dei Nomi Autorevoli):**
    * Sono i server che detengono i **record DNS definitivi** per un dominio specifico (es. `miosito.com`). Sono la "fonte di verità" per la loro zona.
    * Possono essere di due tipi:
        * **Server DNS Master (Primario):** È il server che detiene la **copia originale e primaria** dei record DNS per una zona. Tutte le modifiche ai record vengono effettuate qui.
        * **Server DNS Slave (Secondario):** È una **copia esatta** del server master. Ottiene le sue informazioni dal master tramite **trasferimenti di zona (zone transfer)**, un processo che utilizza il **protocollo TCP** sulla porta **53** per garantire l'affidabilità e la completezza dei dati.
    * Sia i server Master che Slave, una volta sincronizzati e con i dati aggiornati, sono considerati **Autorevoli** per la loro zona. Questa configurazione fornisce **ridondanza** (se il master fallisce, lo slave continua a rispondere) e **bilanciamento del carico** (le query possono essere distribuite tra più server).

## Il Processo di Risoluzione DNS e il Ruolo dei Resolver

Il processo attraverso cui un nome di dominio viene tradotto in un indirizzo IP è chiamato **risoluzione DNS**. I **resolver DNS** sono attori chiave in questo processo.

### **Resolver DNS: Il Mediatore delle Query**

Un **resolver DNS** (spesso chiamato anche "DNS recursor" o "caching DNS server") agisce come un **intermediario** tra il client (es. il tuo browser o un'applicazione) e i server DNS gerarchici.

1.  **Riceve la Query Ricorsiva:** Quando un'applicazione sul tuo dispositivo (client) ha bisogno di un indirizzo IP per un nome di dominio (es. `www.example.com`), invia una **query ricorsiva** al suo resolver DNS configurato. Questa query è una richiesta di "dammi la risposta finale".
    * Esempi di resolver pubblici noti: **8.8.8.8** (Google DNS), 1.1.1.1 (Cloudflare DNS), 9.9.9.9 (Quad9). Spesso il resolver è anche fornito automaticamente dal tuo ISP.

2.  **Verifica della Cache:** La prima cosa che il resolver fa è controllare la sua **cache locale**.
    * Se trova la risposta nella cache e il suo **TTL (Time-To-Live)** non è scaduto, restituisce immediatamente l'indirizzo IP al client. Questo velocizza enormemente il processo di risoluzione per le query successive dello stesso dominio.
    * Il **TTL** di un record DNS definisce per quanto tempo un resolver può memorizzare in cache la risposta. Un **TTL basso** (es. 60 secondi) significa che le modifiche a quel record si propagheranno molto rapidamente. Un **TTL alto** (es. 24 ore) significa che il record rimarrà in cache più a lungo, riducendo il carico sui server autorevoli ma ritardando la propagazione delle modifiche.

3.  **Processo Iterativo (se non in cache):** Se il resolver non trova la risposta in cache o il TTL è scaduto, inizia un processo di **query iterative** con i server DNS gerarchici:
    * Il resolver invia una **query iterativa** a un **Root Server**.
    * Il Root Server risponde con un riferimento al **TLD Server** competente per il dominio (es. il server per `.com`).
    * Il resolver invia una **nuova query iterativa** al TLD Server.
    * Il TLD Server risponde con un riferimento ai **Server Autorevoli** per il dominio specifico (es. i server per `example.com`).
    * Il resolver invia una **nuova query iterativa** al Server Autorevole.
    * Il Server Autorevole risponde con l'indirizzo IP effettivo (un record A o AAAA).

4.  **Cacheing e Risposta Finale:** Il resolver riceve l'indirizzo IP, lo memorizza nella propria cache (rispettando il TTL) e lo restituisce al client originale.

### **Protocolli di Comunicazione DNS**

* La maggior parte delle **query DNS standard** tra client e resolver, e tra resolver e altri server DNS, utilizza il **protocollo UDP (User Datagram Protocol)** sulla **porta 53**. UDP è preferito per la sua velocità e il basso overhead, essendo un protocollo senza connessione.
* Il **protocollo TCP (Transmission Control Protocol)** sulla stessa **porta 53** viene utilizzato per situazioni che richiedono maggiore affidabilità, come i **trasferimenti di zona** tra server Master e Slave, o per risposte DNS di grandi dimensioni (es. quelle legate a DNSSEC).

## Tipi di Record DNS Fondamentali

I server DNS memorizzano le informazioni sui domini sotto forma di **record di risorsa (Resource Records - RR)**. Ogni record ha un tipo specifico:

* **A Record (Address Record):** Mappa un **nome di dominio** a un **indirizzo IPv4** (es. `www.google.com` punta a `142.250.186.132`). Un singolo nome di dominio può avere più record A (per **DNS Round Robin**, utile per bilanciare il carico o fornire ridondanza).
* **AAAA Record (Quad-A Record):** Mappa un **nome di dominio** a un **indirizzo IPv6** (es. `www.google.com` punta a `2a00:1450:4001:806::2004`). I client moderni e le reti abilitate IPv6 preferiscono questi record.
* **CNAME Record (Canonical Name Record):** Crea un **alias** (o "nickname") per un altro nome di dominio (es. `blog.miosito.com` punta a `miosito.wordpress.com`). È una limitazione fondamentale del CNAME che **non può coesistere con nessun altro tipo di record (A, MX, TXT, ecc.) per lo stesso nome**. Questo significa che un CNAME non è tipicamente utilizzato per il dominio radice (es. `miosito.com`) perché un dominio radice necessita di altri record (come MX per la posta).
* **MX Record (Mail Exchange Record):** Specifica i **server di posta elettronica** responsabili per accettare e-mail per un dominio (essenziale per il funzionamento della posta elettronica). Include anche un valore di priorità.
* **NS Record (Name Server Record):** Indica quali **server DNS sono autorevoli** per un determinato dominio o sottodominio.
* **TXT Record (Text Record):** Contiene testo arbitrario. È ampiamente utilizzato per **verifiche di dominio** (es. per servizi cloud come Google Workspace) e per record di sicurezza e-mail come **SPF (Sender Policy Framework)** e **DKIM (DomainKeys Identified Mail)**, che aiutano a prevenire lo spoofing delle e-mail.
* **PTR Record (Pointer Record):** Utilizzato per la **Reverse DNS Lookup**, ovvero per risolvere un **indirizzo IP** a un **nome di dominio**.

## Concetti Correlati e Termini Utili

* **CIDR (Classless Inter-Domain Routing):** Il sistema moderno di indirizzamento IP che ha sostituito le obsolete "Classi" (A, B, C). Permette di definire in modo flessibile la **lunghezza del prefisso di rete** (es. `/24` in `8.8.8.0/24`, dove 24 bit indicano la rete, e 8 bit gli host). Ciò consente un uso più efficiente degli indirizzi IP; una rete `/24` ha **254 host utilizzabili**.
* **Dynamic DNS (DDNS):** Un meccanismo che permette agli indirizzi IP di un dominio di essere aggiornati dinamicamente e automaticamente, utile per dispositivi con IP che cambiano frequentemente.
* **WHOIS:** Uno strumento e un protocollo per interrogare database pubblici che contengono informazioni di registrazione su nomi di dominio e blocchi IP, inclusi i dati del **registrant** (l'organizzazione o l'individuo che registra il dominio).
* **FQDN (Fully Qualified Domain Name):** Un nome di dominio completo che include tutti i segmenti, fino alla radice del DNS (es. `www.example.com.`, dove il punto finale rappresenta la root).
* **DNSSEC (DNS Security Extensions):** Estensioni che aggiungono sicurezza alle risposte DNS tramite firme crittografiche, aiutando a prevenire attacchi come il **DNS Poisoning** (l'inserimento di dati falsi nella cache di un resolver).
* **Propagazione DNS:** Si riferisce al tempo necessario affinché le modifiche ai record DNS siano visibili a livello globale su tutti i resolver e server DNS.
* **Localhost:** Il nome di dominio speciale (`127.0.0.1` per IPv4) usato per riferirsi al proprio computer.
* **Indirizzi IP Privati:** Indirizzi come `192.168.x.x` o `10.x.x.x` sono usati all'interno delle reti private e non sono instradabili su Internet.
* **DNS Forwarder:** Un tipo di server DNS che inoltra le query DNS a un altro server DNS configurato prima di tentare la risoluzione diretta.

Il sistema DNS, con la sua architettura distribuita e i vari tipi di record, è cruciale per la navigazione e il funzionamento di tutti i servizi basati su nomi di dominio su Internet.
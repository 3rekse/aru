#   Sicurezza Informatica

La sicurezza informatica è l'insieme delle pratiche e delle tecnologie volte a proteggere i sistemi informatici, le reti e i dati da accessi non autorizzati, danni, furti o interruzioni. È un campo cruciale nell'era digitale, dove le informazioni sono una risorsa preziosa e le minacce informatiche sono in costante evoluzione.

##   Minacce Informatiche Comuni

1.  **Malware:** Software dannoso progettato per infiltrarsi in un sistema informatico e causare danni. Ne esistono diverse tipologie:

    * **Virus:** Si replica e si diffonde infettando altri file. Si attaccano a file eseguibili o documenti. Si diffondono quando il file infetto viene eseguito o aperto. Possono danneggiare o cancellare file, formattare l'hard disk, rallentare il sistema.
    * **Worm:** Si replica autonomamente senza bisogno di infettare altri file. Si replicano autonomamente e si diffondono attraverso reti (LAN, Internet). Possono sfruttare vulnerabilità del sistema operativo o delle applicazioni. Possono consumare banda di rete, rallentare i sistemi, creare backdoor.
    * **Trojan:** Si presenta come software legittimo per ingannare l'utente. Si mascherano da software utile (es., aggiornamenti, utility).vUna volta eseguiti, possono aprire backdoor, rubare dati, installare altro malware. I "Trojan horse" non si replicano da soli.
    * **Ransomware:** Cripta i dati della vittima e richiede un riscatto per la loro decriptazione. Criptano i file della vittima, rendendoli inaccessibili. Richiedono un riscatto (spesso in criptovalute) per la chiave di decriptazione. Alcune varianti minacciano di pubblicare i dati se il riscatto non viene pagato.
    * **Keylogger:** Registra le sequenze di tasti digitate dall'utente. Possono catturare password, numeri di carta di credito, messaggi. Possono essere software o hardware.
    * **Spyware:** Software che spia le attività dell'utente. Raccolgono informazioni sulle attività dell'utente (es., cronologia di navigazione, password). Possono rallentare il sistema, violare la privacy, rubare dati finanziari.


2. Attacchi Informatici

Phishing:
Utilizza email, messaggi, siti web falsi che imitano quelli legittimi.
Obiettivo: rubare credenziali, dati finanziari, informazioni personali.
Varianti: spear phishing (mirato a specifiche persone), whaling (mirato a dirigenti).
DoS/DDoS:
DoS (Denial of Service): un singolo attaccante sovraccarica un sistema.
DDoS (Distributed Denial of Service): più attaccanti (botnet) sovraccaricano un sistema.
Rendono il servizio indisponibile agli utenti legittimi.
MITM:
L'attaccante si inserisce tra due parti comunicanti.
Può intercettare, spiare o modificare i dati scambiati.
Esempi: intercettare una connessione Wi-Fi non protetta.
Ingegneria Sociale:
Manipola la psicologia umana per ottenere informazioni o accesso.
Tecniche: pretexting (inventare una scusa), baiting (offrire un'esca), quid pro quo (offrire un favore).
Attacchi Brute-Force:
Prova tutte le possibili combinazioni di password finché non indovina quella corretta.
Contromisure: limitare i tentativi di accesso, usare password complesse, blocco account.
Vulnerabilità:
Debolezza in un sistema che può essere sfruttata da un attaccante.
Zero-day: vulnerabilità sconosciuta al produttore, quindi senza patch.
Buffer overflow, SQL injection: esempi di vulnerabilità comuni.
3. Crittografia

Scopo: Proteggere la riservatezza dei dati, rendendoli illeggibili senza la chiave di decrittazione.
Tipi:
Simmetrica: stessa chiave per cifrare e decifrare (es., AES). Veloce, ma problema della distribuzione della chiave.
Asimmetrica: coppia di chiavi (pubblica e privata). La chiave pubblica cifra, la privata decifra (es., RSA). Più sicura, ma più lenta.
Protocolli:
SSL/TLS: proteggono la comunicazione tra browser e server web (HTTPS).
VPN: creano una connessione sicura e privata su una rete pubblica (Internet).
Firma Digitale:
Autentica l'identità del mittente e garantisce l'integrità del messaggio.
Utilizza la crittografia asimmetrica.
4. Misure di Sicurezza

Firewall:
Hardware o software che filtra il traffico di rete in base a regole predefinite.
Può bloccare accessi non autorizzati, malware, attacchi.
Tipi: firewall di pacchetto, stateful, application-level.
Antivirus:
Software che rileva e rimuove malware.
Utilizza firme, euristica, analisi comportamentale.
Importante tenerlo aggiornato.
Autenticazione:
Verifica l'identità dell'utente.
Fattori: qualcosa che si sa (password), qualcosa che si ha (token), qualcosa che si è (biometria).
2FA/MFA: combinazione di più fattori per maggiore sicurezza.
Password:
Lunghe (almeno 12 caratteri), complesse (maiuscole, minuscole, numeri, simboli), casuali, uniche.
Gestori di password: software per generare e memorizzare password in modo sicuro.
Aggiornamenti:
Correggono vulnerabilità, bug, migliorano la sicurezza e le prestazioni.
Importante aggiornare SO, applicazioni, firmware.
Backup:
Copie di sicurezza dei dati per il ripristino in caso di incidenti.
Tipi: completo, incrementale, differenziale.
Strategie: 3-2-1 (3 copie, 2 supporti diversi, 1 offsite).
IDS/IPS:
IDS (Intrusion Detection System): rileva attività sospette.
IPS (Intrusion Prevention System): blocca attivamente le intrusioni.
Sicurezza delle Reti:
Wi-Fi: crittografia (WPA2/3), password complesse, nascondere l'SSID.
Segmentazione della rete: dividere la rete in zone per limitare i danni in caso di attacco.
5. Aspetti Legali e Normativi

GDPR:
Regolamento Generale sulla Protezione dei Dati (UE).
Protegge i dati personali dei cittadini UE.
Principi: liceità, correttezza, trasparenza, limitazione della finalità, minimizzazione dei dati, esattezza, limitazione della conservazione, integrità e riservatezza.   
Garante della Privacy:
Autorità italiana per la protezione dei dati personali.
Vigila sull'applicazione del GDPR e delle altre normative sulla privacy.

1.  **Phishing:** Tecnica di ingegneria sociale in cui l'attaccante si spaccia per un'entità affidabile (es. banca, social network) per ingannare la vittima e indurla a rivelare informazioni personali (credenziali di accesso, dati finanziari). Spesso avviene tramite email fraudolente.

2.  **Attacchi DoS/DDoS (Denial of Service/Distributed Denial of Service):** Attacchi che mirano a rendere un servizio online (es. sito web) non disponibile, sovraccaricandolo di traffico.

3.  **Attacchi Man-in-the-Middle (MITM):** L'attaccante intercetta la comunicazione tra due parti, potendo così spiare o manipolare i dati scambiati.

4.  **Ingegneria Sociale:** L'insieme delle tecniche per manipolare le persone al fine di ottenere informazioni riservate.

5.  **Attacchi Brute-Force:** Tentativi ripetuti di indovinare le credenziali di accesso (es. password) di un utente.

6.  **Vulnerabilità Zero-Day:** Vulnerabilità di un software sconosciuta ai produttori e quindi non ancora corretta.

##   Misure di Sicurezza

1.  **Firewall:** Sistema che filtra il traffico di rete, bloccando gli accessi non autorizzati.

2.  **Antivirus:** Software che rileva e rimuove il malware da un sistema.

3.  **Crittografia:** Tecnica per rendere i dati illeggibili a chi non possiede la chiave di decriptazione, proteggendo la riservatezza delle informazioni. Le VPN (Virtual Private Network) utilizzano la crittografia per proteggere la connessione Internet. I certificati SSL/TLS proteggono la comunicazione tra browser e siti web (HTTPS).

4.  **Autenticazione a Due Fattori (2FA):** Livello di sicurezza aggiuntivo che richiede due forme di identificazione per accedere a un account (es. password + codice inviato via SMS). L'autenticazione biometrica è una forma di autenticazione a due fattori che utilizza le caratteristiche fisiche dell'utente.

5.  **Password Forti e Uniche:** Utilizzare password complesse (combinazione di lettere, numeri e simboli) e diverse per ogni account.

6.  **Aggiornamenti Software:** Installare regolarmente gli aggiornamenti per correggere le vulnerabilità di sicurezza.

7.  **Backup dei Dati:** Creare copie di sicurezza dei dati per poterli ripristinare in caso di perdita o danneggiamento.

8.  **Monitoraggio del Traffico di Rete:** Analizzare il traffico di rete per identificare attività sospette. Gli Intrusion Detection Systems (IDS) sono sistemi che rilevano accessi non autorizzati.

9.  **Honeypot:** Sistema "trappola" progettato per attirare gli attaccanti e studiarne le tecniche.

10. **Politiche di Sicurezza IT:** Insieme di regole e procedure che definiscono come proteggere i dati e i sistemi aziendali.

11. **Analisi delle Vulnerabilità:** Processo per identificare i punti deboli nei sistemi informatici.

12. **Educazione degli Utenti:** Formare gli utenti sulle minacce informatiche e sulle buone pratiche di sicurezza.

##   Sicurezza delle Reti Wi-Fi

Proteggere le reti Wi-Fi con la crittografia e l'accesso protetto da password.

##   Gestione degli Incidenti di Sicurezza

In caso di violazione dei dati, è fondamentale informare tempestivamente l'amministratore di sistema o il responsabile della sicurezza.

##   Protezione dei Dati Personali

Il Garante della Privacy e il GDPR (Regolamento Generale sulla Protezione dei Dati) sono autorità e normative che si occupano della protezione dei dati personali.

È importante approfondire le singole tematiche per una comprensione più completa e per implementare misure di sicurezza efficaci.

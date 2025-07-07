
# 🔥 **1. FIREWALL (Stateless Firewall)**

Un **firewall stateless** filtra i pacchetti **singolarmente**, **senza tenere traccia dello stato della connessione**.  
Ogni pacchetto è esaminato **isolatamente** in base a **regole statiche**.

## ✅ Caratteristiche:

- Controlla solo **IP sorgente/destinazione**, **porta**, e **protocollo**
- Non tiene conto del **contesto** della connessione
- **Più veloce**, ma **meno sicuro**
- Adatto a **sistemi semplici** o a basso carico

## ❌ Limiti:

- Non rileva attacchi che sfruttano sessioni già aperte
- **Non distingue** tra traffico legittimo e pacchetti imprevisti

---

### 🔒 **2. FIREWALL STATEFUL**

Un **firewall stateful** tiene traccia dello **stato delle connessioni attive** (es. TCP handshakes).  
Capisce se un pacchetto fa parte di una sessione esistente o se è sospetto.

#### ✅ Caratteristiche :

- Tiene traccia di **sessioni attive** tra client e server
- Controlla pacchetti **in base al contesto** (es. solo risposte a richieste legittime)
- **Più sicuro** contro spoofing e attacchi basati su connessioni false
- Supporta **NAT** e **connessioni dinamiche**

#### ❌ Limiti:

- **Più complesso** e richiede **più risorse hardware**
- Leggermente **più lento** in ambienti ad alto traffico rispetto a firewall stateless

---

### 📊 **Tabella di Confronto**

| Caratteristica            | Firewall Stateless      | Firewall Stateful           |
|---------------------------|--------------------------|------------------------------|
| 🔄 Stato connessioni      | Non gestito              | Tracciato (sessione completa) |
| 🛡️ Sicurezza              | Bassa                    | Alta                         |
| ⚙️ Complessità             | Semplice                 | Complesso                    |
| 🚀 Prestazioni            | Alta velocità            | Richiede più risorse         |
| 🎯 Decisione su pacchetti | Basata su regole statiche| Basata su stato e regole     |
| 🧠 Intelligenza            | Nessuna memoria           | Tiene memoria delle connessioni |

---

### 📌 In sintesi:

- Il **firewall stateless** è **più veloce**, ma **più semplice e meno sicuro**

- Il **firewall stateful** è **più sicuro** perché analizza il **contesto delle connessioni**, ma usa più risorse.

👉 Oggi quasi tutti i firewall moderni (inclusi quelli dei router aziendali e personali) sono **stateful**.

---
Perfetto! Ecco il confronto completo tra:

- 🔥 **Firewall Stateless**
- 🔒 **Firewall Stateful**
- 🧠 **Firewall Applicativo (Application Layer Firewall / Layer 7 Firewall)**

---

### 📊 **Tabella di Confronto Generale**

| **Caratteristica**             | 🔥 Stateless Firewall           | 🔒 Stateful Firewall             | 🧠 Firewall Applicativo (Layer 7)              |
|--------------------------------|---------------------------------|----------------------------------|------------------------------------------------|
| **Livello OSI**                | Layer 3 (Rete) / Layer 4 (Trasporto) | Layer 3–4                        | Layer 7 (Applicazione)                         |
| **Analisi delle connessioni**  | Nessuna                         | Sì (mantiene lo stato)           | Sì, **più profonda** (ispezione contenuti)     |
| **Contesto**                   | Nessuno                         | Conoscenza delle sessioni        | Conoscenza **dell’applicazione e dei dati**    |
| **Sicurezza**                  | Bassa                           | Media–Alta                       | Molto alta                                     |
| **Prestazioni**                | Alta (molto veloce)             | Buona (più risorse)              | Più lenta (uso intensivo di CPU e RAM)         |
| **Regole**                     | Statistiche (IP/porta)          | Dinamiche + stato connessione    | Complesse (fino al contenuto HTTP, FTP, ecc.)  |
| **Capacità**                   | Controllo base di IP e porte    | Protezione da spoofing/DoS base | Blocco malware, phishing, accessi app specifici |
| **Usi tipici**                 | Sistemi semplici, ambienti isolati | Reti aziendali, router avanzati | Protezione Web, app cloud, sicurezza avanzata  |
| **Esempio di controllo**       | "Blocca porta 80 per IP X"      | "Consenti solo se la connessione è attiva" | "Blocca Facebook o file .exe negli allegati"   |

---

### 🔍 **Approfondimento: Firewall Applicativo (Layer 7)**

Un **firewall applicativo** lavora sul **livello più alto del modello OSI**, cioè l'applicazione. Non solo controlla le porte e gli IP, ma **analizza il contenuto stesso** del traffico (payload), come ad esempio:

- Il contenuto di **pagine web (HTTP/HTTPS)**
- **Richieste a server specifici** (es. login a un'app)
- **Download di file dannosi**
- **Accesso a social media**, streaming, ecc.

#### ✳️ Esempi di capacità:
- Bloccare l’accesso a **YouTube/Facebook**
- Impedire l’**upload di file .exe o .zip**
- Analizzare richieste API
- Rilevare **comportamenti anomali** (es. accessi automatizzati)

---

### ✅ In sintesi:

| Situazione                           | Tipo di Firewall consigliato     |
|-------------------------------------|----------------------------------|
| Rete semplice, senza accesso a Internet | 🔥 Stateless                     |
| Rete interna aziendale o domestica con sicurezza base | 🔒 Stateful                    |
| Protezione di applicazioni Web, accesso remoto, controllo contenuti | 🧠 Firewall Applicativo        |

---

[![pfSense - Wikipedia](https://images.openai.com/thumbnails/3cd3be73ab7fc4862a0778acdf84da64.jpeg)](https://en.wikipedia.org/wiki/PfSense)

# Confronto tra due soluzioni firewall avanzate: **pfSense** e **FortiGate**, entrambe con funzionalità **stateful** e **applicative**.

---

## 🔐 **pfSense: Firewall Open Source Avanzato**

**pfSense** è una distribuzione basata su FreeBSD, progettata per fungere da firewall/router. È ampiamente utilizzata in ambienti aziendali e domestici grazie alla sua flessibilità e alle sue funzionalità avanzate.

### 🔧 **Caratteristiche principali:**

- **Firewall Stateful**: pfSense mantiene una **tabella di stato** delle connessioni attive, permettendo di gestire il traffico in modo efficiente e sicuro .
- **Supporto per VLAN**: Consente la segmentazione della rete tramite VLAN, migliorando l'organizzazione e la sicurezza.
- **VPN**: Supporta vari protocolli VPN come **IPsec**, **OpenVPN** e **L2TP/IPsec**.
- **Captive Portal**: Utile per reti Wi-Fi pubbliche o guest, permette l'autenticazione degli utenti prima dell'accesso alla rete.
- **Estendibilità**: Grazie a pacchetti aggiuntivi, è possibile integrare funzionalità come **proxy web**, **filtraggio URL**, **IDS/IPS** e altro ancora.

### 🖥️ **Interfaccia utente:**

L'interfaccia web di pfSense è intuitiva e consente una gestione completa del sistema, dalla configurazione delle regole firewall alla gestione delle VPN.

---

## 🛡️ **FortiGate: Soluzione Firewall Enterprise**

**FortiGate** è una linea di firewall prodotti da Fortinet, progettata per offrire sicurezza di livello enterprise con funzionalità avanzate.

### 🔧 **Caratteristiche principali:**

- **Firewall Stateful**: FortiGate monitora lo stato delle connessioni attive, analizzando il traffico in entrata e uscita per rilevare potenziali minacce .
- **Next-Generation Firewall (NGFW)**: Combina ispezione approfondita dei pacchetti con funzionalità di prevenzione delle intrusioni, filtraggio web e controllo delle applicazioni.
- **FortiGuard Security Services**: Offre aggiornamenti in tempo reale su minacce, filtraggio URL, antivirus e altro, grazie a un servizio cloud integrato.
- **Gestione centralizzata**: Tramite FortiManager, è possibile gestire più dispositivi FortiGate da un'unica console.

### 🖥️ **Interfaccia utente:**

L'interfaccia di FortiGate è progettata per ambienti enterprise, offrendo una panoramica dettagliata della rete e strumenti avanzati per la gestione della sicurezza.

---

## 📊 **Confronto tra pfSense e FortiGate**

| Caratteristica             | **pfSense**                          | **FortiGate**                             |
|----------------------------|--------------------------------------|-------------------------------------------|
| **Tipo**                   | Open Source                          | Commerciale                               |
| **Firewall Stateful**      | ✅                                    | ✅                                         |
| **Supporto VPN**           | ✅ (IPsec, OpenVPN, L2TP/IPsec)       | ✅ (IPsec, SSL VPN)                        |
| **Filtraggio applicativo** | ✅ (con pacchetti aggiuntivi)         | ✅ (integrato)                             |
| **Aggiornamenti sicurezza**| Manuali o tramite pacchetti aggiuntivi| ✅ (FortiGuard Security Services)          |
| **Gestione centralizzata** | Limitata                             | ✅ (tramite FortiManager)                  |
| **Costo**                  | Gratuito (con possibili costi hardware)| Licenza commerciale                       |
| **Facilità d'uso**         | Media (richiede conoscenze tecniche) | Alta (interfaccia user-friendly)          |

---

## 🧩 **Conclusione**

- **pfSense** è ideale per chi cerca una soluzione **flessibile e personalizzabile**, con un buon livello di sicurezza, adatta sia per ambienti domestici avanzati che per piccole e medie imprese.
- **FortiGate** è più adatto a **grandi aziende** o organizzazioni che necessitano di una **soluzione integrata**, con aggiornamenti di sicurezza in tempo reale e gestione centralizzata.

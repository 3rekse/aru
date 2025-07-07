Il **routing a vettore di distanza** è un metodo usato da alcuni protocolli di routing dinamico (come **RIP**) per determinare il **percorso migliore** per inviare pacchetti in una rete.

---

### 📦 **Cos’è il routing a vettore distanza?**

In questo tipo di routing:

- Ogni **router conosce solo la distanza (numero di salti)** verso una rete di destinazione e **qual è il router vicino da usare** per arrivarci.
- I router si **scambiano periodicamente informazioni** di routing con i loro **vicini diretti**.

---

### 🔁 **Funzionamento base (es. RIP – Routing Information Protocol)**

1. Ogni router mantiene una **tabella di routing**.
2. Invia questa tabella ai suoi **vicini** ogni 30 secondi.
3. Ogni voce nella tabella include:
   - Indirizzo di destinazione
   - Distanza (in **hop**, cioè numero di router attraversati)
   - Next-hop (il vicino da usare per raggiungere la rete)

4. Se un router riceve una nuova informazione con una distanza **più breve**, **aggiorna la propria tabella**.

---

### 📏 **Esempio pratico**

Se il router A può raggiungere la rete 192.168.1.0 attraverso il router B in **2 salti**, lo memorizzerà così:

```
Destinazione: 192.168.1.0
Distanza: 2
Next-hop: Router B
```

---

### 🔍 **Caratteristiche principali di RIP (Routing Information Protocol)**

| Caratteristica              | Valore                          |
|----------------------------|---------------------------------|
| Tipo di protocollo         | Vettore distanza                |
| Massimo numero di hop      | 15 (16 = rete irraggiungibile) |
| Aggiornamento tabella      | Ogni 30 secondi                 |
| Algoritmo                  | Bellman-Ford                    |
| Metriche usate             | Numero di hop                  |

---

### ⚠️ **Svantaggi del routing a vettore distanza**

- 🐌 **Convergenza lenta** (serve tempo per aggiornarsi dopo un guasto)
- 🔁 **Possibili loop di routing**
- 🔄 **Aggiornamenti periodici**, anche se la rete non cambia
- 📏 **Metrica limitata**: solo il numero di hop, non considera latenza o larghezza di banda

---

### ✅ **Vantaggi**

- 🤓 **Semplice da configurare**
- 🧠 Bassa complessità di calcolo
- 💼 Ancora utile in **reti piccole o didattiche**

---

### 📌 Confronto veloce

| Aspetto                  | Routing a vettore distanza (es. RIP) | Routing link-state (es. OSPF)       |
|--------------------------|--------------------------------------|-------------------------------------|
| Conoscenza rete          | Solo vicini                         | Topologia completa della rete       |
| Velocità di convergenza  | Lenta                               | Rapida                              |
| Metriche usate           | Hop count                           | Banda, ritardo, costo               |
| Complessità              | Bassa                               | Alta                                |

---

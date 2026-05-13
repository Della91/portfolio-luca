export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  methodology?: string;
  highlights?: { label: string; description: string }[];
}

export const experiences: Experience[] = [
  {
    company: "Icaro World",
    role: "Front-end Developer",
    period: "Giu 2024 – Presente",
    location: "Milano, MI",
    description:
      "Sviluppo frontend di un gestionale web per la gestione di richieste, clienti e documentazione tecnica, occupandomi della progettazione della UI in Figma, della realizzazione di interfacce scalabili, della gestione dei flussi dati e dell'implementazione di funzionalità orientate all'efficienza operativa.",
    responsibilities: [
      "Sviluppo interfacce con React e TypeScript",
      "Progettazione del layout e delle interfacce del gestionale in Figma, con definizione della struttura UI prima dello sviluppo frontend",
      "Implementazione di componenti riutilizzabili e architettura component-based",
      "Integrazione con API REST (Axios) e gestione dei dati asincroni",
      "Gestione di tabelle avanzate con filtri, paginazione e stati asincroni",
      "Implementazione di upload e download documenti",
      "Sviluppo di dashboard con grafici e mappe interattive",
      "Gestione dello stato applicativo tramite React Context API",
      "Routing client-side con React Router",
      "Collaborazione con il backend per definizione API e flussi dati",
      "Validazione runtime con io-ts",
    ],
    technologies: ["React", "TypeScript", "Material UI", "Axios", "REST API", "React Router", "Context API", "io-ts", "Styled Components"],
  },
  {
    company: "GREENEXT Technologies S.p.A",
    role: "Mobile Developer",
    period: "Ago 2023 – Giu 2024",
    location: "Aprilia, LT",
    description:
      "Sviluppo di un'app mobile cross-platform per la gestione dei rifiuti, occupandomi dell'avvio del progetto, della costruzione delle interfacce utente e dell'integrazione delle principali funzionalità applicative.",
    responsibilities: [
      "Inizializzazione del progetto con React Native ed Expo",
      "Sviluppo delle funzionalità principali dell'applicazione",
      "Implementazione della UI mobile e gestione della navigazione con React Navigation",
      "Implementazione dei flussi di autenticazione e della navigazione tra schermate protette",
      "Integrazione con API REST tramite Axios",
      "Gestione dello stato applicativo e delle chiamate asincrone",
      "Gestione di loading state ed error handling",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Axios", "REST API", "React Navigation", "Styled Components"],
  },
  {
    company: "2hire",
    role: "Frontend Developer",
    period: "Ago 2021 – Sett 2023",
    location: "Roma, RM",
    description:
      "2hire rende possibile lanciare, gestire e ampliare servizi di mobilità digitale, sia condivisi che su richiesta, su tutti i tipi di veicoli. 2hire offre soluzioni B2B per tutti gli operatori di mobilità, dai fornitori di condivisione di veicoli alle compagnie di noleggio auto e ai fornitori di servizi su richiesta.",
    responsibilities: [
      "Frontend developer utilizzando TypeScript e React/React Native",
      "Sviluppo nativo con Xcode (Swift) e Android Studio (Kotlin)",
      "Rendere il codice riutilizzabile il più possibile per una maggiore chiarezza",
      "Utilizzo di Cypress per i test",
      "Creazione e configurazione di certificati e profili necessari per la distribuzione dell'applicazione sulle piattaforme iOS",
      "Generazione di keystore per Android, essenziali per la firma e la pubblicazione delle app su Google Play Store",
    ],
    methodology:
      "Per la gestione del progetto, utilizziamo Jira, uno strumento basato sul framework agile. Ogni funzionalità è suddivisa in compiti, che vengono collocati nel backlog e prioritizzati in base all'importanza e alla necessità. Monitoriamo attentamente il tempo impiegato per completare ogni compito. Prima di effettuare il rilascio in produzione, seguiamo un processo di revisione delle funzionalità implementate attraverso pull requests, consentendo discussioni su eventuali modifiche necessarie e garantendo la piena funzionalità. Questo approccio favorisce la collaborazione e svolge un ruolo cruciale nel mantenere la qualità del codice all'interno del progetto.\n\nOgni mattina, il team partecipa a una breve riunione stand-up per un rapido aggiornamento sullo stato del lavoro e per affrontare eventuali ostacoli. Una volta ogni due settimane, si tiene una riunione demo con l'obiettivo di presentare le funzionalità del progetto e le migliorie in modo pratico e visivo, facilitando una migliore comprensione del lavoro svolto e consentendo feedback immediati. Inoltre, periodicamente, si tiene un'altra riunione chiamata retrospettiva, che rappresenta un momento importante per il team di sviluppo per analizzare le attività svolte, i risultati raggiunti e le opportunità di miglioramento. Queste riunioni favoriscono l'apprendimento continuo, il progresso del team e l'innovazione all'interno dell'azienda.",
    highlights: [
      {
        label: "Intercom",
        description:
          "È una piattaforma di messaggistica utilizzata dalle aziende per comunicare con i clienti. Ho utilizzato l'SDK di Intercom, che consente di integrare direttamente Intercom Messenger nell'app. Una volta effettuato l'accesso all'app, l'utente viene automaticamente registrato su Intercom (se non è già registrato), dove può inviare messaggi in tempo reale al cliente. Se l'utente modifica i propri dati personali, essi vengono aggiornati anche nell'account di Intercom.",
      },
      {
        label: "Apple Pay",
        description:
          "Ho implementato le funzionalità lato nativo per l'aggiunta del metodo di pagamento Apple Pay, permettendo agli utenti di aggiungerlo direttamente dall'interno dell'app. Ho realizzato un bridge da nativo a React Native per utilizzare le diverse funzionalità.",
      },
    ],
    technologies: ["TypeScript", "React", "React Native", "i18next", "io-ts", "Cypress", "Xcode (Swift)", "Android Studio (Kotlin)", "Jira"],
  },
  {
    company: "YouMangi",
    role: "Frontend Developer",
    period: "Nov 2019 – Feb 2020",
    location: "Roma, RM",
    description:
      "Collaborazione iniziale su una piattaforma web dedicata alla ricerca e gestione di servizi di catering per eventi.",
    responsibilities: [
      "Sviluppo frontend della piattaforma web",
      "Implementazione di interfacce utente per la ricerca e prenotazione di servizi catering",
    ],
    technologies: ["React", "TypeScript", "CSS3"],
  },
];

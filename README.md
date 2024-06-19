Codice per il progetto del corso "Ingegneria del Software" offerto dall'Università degli Studi di Trento.

Membri del gruppo:
* Marius Sebastian Cochior


Istruzione per eseguire l'applicazione:
1. Scaricare il zip del progetto e decomprimerlo.
2. Installare Node JS e npm sulla propria macchina
3. Eseguire il seguente comando per installare http-server globalmente “*npm install -g http-server*”
4. Andare nella cartella api ed eseguire “*npm install*”
5. Entrare nella cartella api ed eseguire “*npm run swagger*” per generare la documentazione (ignorare l'errore "UNKNOWN_FILE_EXTENSION", lo swagger viene correttamente generato comunque)
6. (E' ora possibile eseguire i test andando nella cartella api ed eseguendo il comando "npm test". Questo da una risposta a terminale e genera una cartella chiamata “coverage”, dove aprendo coverage/lcov-report/index.html si possono vedere i dati sulla coverage)
7. Far partire il server con le API andando nella cartella “api” e facendo: “*npx tsx src/index.ts*”
8. Far partire il server http andando nella cartella “web-app” ed eseguendo il comando: “*http-server*” (se non è possibile eseguire script sul vostro sistema, usare “*http-server.cmd*”)
9. Adesso è possibile navigare sul sito usando il link: http://localhost:8080/ (loggarsi con name: “e”, surname: “e”, password: “a” per essere amministratore e avere accesso a tutte le funzionalità)

*NOTA*: usare sempre localhost al posto di 127.0.0.1, per qualche motivo questi due non sono identici e mettere 127.0.0.1 al posto di localhost crea tanti problemi.


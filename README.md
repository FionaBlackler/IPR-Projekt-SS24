# Triple F Music Webplayer

Hochschule: HFT Stuttgart;<br>
Modul: Internetprogrammierung;<br>
Dozent: Mathias Maciossek;<br>
Semester: Sommersemester 2024;<br>
Gruppenmitglieder: Funda Şebnem Yeşiltaş, Fatima Alaa-Elleh Smati, Fiona Blackler<br>
<br>
Bei diesem Projekt handelt es sich um eine Full-Stack-Webanwendung mit dem Schwerpunkt auf der Verwaltung von MP3-Dateien und der Bereitstellung von Funktionen zum Hinzufügen, Organisieren und Abspielen der MP3-Dateien. Das Gesamtbild der Webanwendung basiert auf dem alten Windows 95-Design.<br>
<br>
## Nach dem clonen des Repos
Im Frontend (cd TripdleFMusic/Frontend) UND Backend (cd TripleFMusic/Backend):<br>
~~~
npm install
~~~

Im Frontend:
~~~
npm install vite
~~~

Im Backend:
~~~
npm install -g nodemon
npm install bcrypt@5.0.1 // Für Windows
npm install bcrypt // Für Mac
~~~

Anwendung starten:

1. Backend starten:
~~~
cd TripleFMusic/Backend
nodemon server.js
~~~
3. Frontend starten:
~~~
cd TripleFMusic/Frontend
npm run dev
~~~

## Projekt Informationen
Verwendete Sprachen:

- JavaScript
- HTML
- CSS

Verwendete Bibliotheken:

- React JS
- React95 component library

## User-Stories

Login:<br>
<br>
✔ An-/Abmelden <br>
✔ Konto registrieren<br>
✔ Passwort vergessen<br>
✔ Remember me (Für 7 Tage)<br>
✔ "Welcome <username>"-Anzeige<br>
✔ User löschen<br>
<br>
Music Gallery:<br>
<br>
✔ Vorhandene Playlists anzeigen<br>
✔ Songs innerhalb einer Playlist anzeigen<br>
✔ Song löschen<br>
✔ Neue Playlist hinzufügen<br>
✔ Playlist löschen<br>
✔ Mehrere Playlists gleichzeitig löschen<br>
✔ Mehrere Songs gleichzeitig löschen<br>
✔ Songdetails anzeigen<br>

- Songdetails bearbeiten
- Song abspielen/pausieren
- Song vor-/zurückspulen
- Song erneut abspielen/überspringen
- Playlist abspielen/zufällig wiedergeben
- Songs in Playlist sortieren (?)
- Nach Playlist suchen
- Nach einzelnen Songs suchen
- Nach Song im Mixtape suchen<br>

Add Song:<br>
<br>
✔ Vorhandene Playlists anzeigen<br>
✔ mp3/jpg file vom File Explorer auswählen<br>
✔ Song speichern<br>

Sonstiges:<br>
<br>
✔ Easter Egg -> Snake im „Browser“ abspielen, da kein Internet

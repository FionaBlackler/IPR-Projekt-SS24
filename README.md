# Triple F Music Webplayer

Hochschule: HFT Stuttgart;<br>
Modul: Internetprogrammierung;<br>
Dozent: Mathias Maciossek;<br>
Semester: Sommersemester 2024;<br>
Gruppenmitglieder: Funda Şebnem Yeşiltaş, Fatima Alaa-Elleh Smati, Fiona Blackler<br>
<br>
Bei diesem Projekt handelt es sich um eine Full-Stack-Webanwendung mit dem Schwerpunkt auf der Verwaltung von MP3-Dateien und der Bereitstellung von Funktionen zum Hinzufügen, Organisieren und Abspielen der MP3-Dateien. Das Gesamtbild der Webanwendung basiert auf dem alten Windows 95-Design.<br>
<br>
NACH DEM CLONEN DES REPOS:<br>
Im Frontend (cd TripdleFMusic/Frontend) und Backend (cd TripleFMusic/Backend) bitte erstmal einen npm install machen.<br>
Im Frontend muss vite separat mit npm install vite installiert werden.<br>
Im Backend muss nodemon extra installiert werden mit npm install nodemon und npm install nodemon --save-dev.<br>
<br>
Anwendung starten:<br>

1. Backend starten --> cd TripleFMusic/Backend --> nodemon server.js<br>
2. Frontend starten --> cd TripleFMusic/Frontend --> npm run dev<br>

Verwendete Sprachen:<br>

- JavaScript
- HTML
- CSS

Verwendete Bibliotheken:<br>

- React JS
- React95 component library

User-Stories:<br>

Login:

✔ An-/Abmelden <br>
✔ Konto registrieren<br>
✔ Passwort vergessen<br>
✔ Remember me (Für 7 Tage)<br>

- "Welcome <username>"
- User löschen

Music Gallery:
✔ Vorhandene Playlists anzeigen <br>
✔ Songs innerhalb einer Playlist anzeigen <br>

- Song löschen
- Mehrere Songs gleichzeitig löschen
- Song abspielen/pausieren
- Song vor-/zurückspulen
- Songdetails anzeigen
- Songdetails bearbeiten
- Song erneut abspielen/überspringen<br>
  ✔ Neue Playlist hinzufügen<br>
  ✔ Playlist löschen <br>
  ✔ Mehrere Playlists gleichzeitig löschen
- Playlist abspielen/zufällig wiedergeben
- Songs in Playlist sortieren (?)
- Nach Playlist suchen
- Nach einzelnen Songs suchen
- Nach Song im Mixtape suchen<br>

Add Song:
✔ Vorhandene Playlists anzeigen <br>
✔ mp3/jpg file vom File Explorer auswählen <br>

- Song speichern

Sonstiges:
✔ Easter Egg -> Snake im „Browser“ abspielen, da kein Internet

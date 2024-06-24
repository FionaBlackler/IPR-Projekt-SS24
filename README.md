# Triple F Music Webplayer

Hochschule: HFT Stuttgart;<br>
Modul: Internetprogrammierung;<br>
Dozent: Mathias Maciossek;<br>
Semester: Sommersemester 2024;<br>
Gruppenmitglieder: Funda Şebnem Yeşiltaş, Fatima Alaa-Elleh Smati, Fiona Blackler<br>
<br>
Bei diesem Projekt handelt es sich um eine Full-Stack-Webanwendung mit dem Schwerpunkt auf der Verwaltung von MP3-Dateien und der Bereitstellung von Funktionen zum Hinzufügen, Organisieren und Abspielen der MP3-Dateien. Das Gesamtbild der Webanwendung basiert auf dem alten Windows 95-Design.<br>
<br>

## Projekt Informationen
Verwendete Sprachen:

- JavaScript
- HTML
- CSS

Verwendete Bibliotheken:

- React JS
- React95 component library

## Vor dem Clonen des Repos

Falls MySQL noch nicht installiert ist, lade den MySQL Installer von der offiziellen [MySQL-Website](https://dev.mysql.com/downloads/installer/) herunter und folge den Installationsanweisungen.<br>

1. **Mit MySQL-Server verbinden**
   Öffne die MySQL-Kommandozeile. Dies kann man durch Suchen nach "MySQL Command Line Client" im Startmenü tun.<br>
   <br>
   ~~~
   mysql -u root -p
   ~~~
   *-u root gibt den Benutzer an (in diesem Fall root), und -p fordert zur Eingabe des Passworts auf.*<br>

2. **Datenbank erstellen**
   Gebe den folgenden Befehl ein, um eine neue Datenbank namens **musicdb** zu erstellen.<br>
   <br>
   ~~~
   CREATE DATABASE musicdb;
   ~~~
*Annmerkung: Das root-Passwort für die Datenbank ist in **TripleFMusic/Backend/config/config.json** festgelegt und muss durch das **eigene** root-Passwort ersetzt werden.*



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



## User-Stories

Login:<br>
<br>
✔ An-/Abmelden <br>
✔ Konto registrieren<br>
✔ Passwort zurücksetzen wenn vergessen<br>
✔ Remember me (Für 7 Tage)<br>
<br>
Home Screen "Start Button":<br>
<br>
✔ "Welcome <username>"-Anzeige<br>
✔ Passwort über Settings während man eingeloggt ist<br>
✔ User löschen<br>
✔ Support kontaktieren<br>
<br>
Music Gallery:<br>
<br>
✔ Liste an vorhandener Playlists anzeigen<br>
✔ Playlist anklicken und Songs innerhalb ihrer zugeordneten Playlist anzeigen<br>
✔ Neue Playlist über ein Modal hinzufügen<br>
✔ Playlist/-s löschen (single --> right-click auf Playlist)<br>
✔ Song/-s löschen (single --> right-click auf Song)<br>
✔ Mehrere Playlists gleichzeitig löschen (multiple --> mit strg+click auswählen und löschen über right-click)<br>
✔ Mehrere Songs gleichzeitig löschen (multiple --> mit strg+click auswählen und löschen über right-click)<br>
✔ Songdetails anzeigen<br>
✔ Songdetails bearbeiten<br>
✔ Songdetails anzeigen und bearbeiten ist das selbe Fenster mit eigenem toggle-handling<br>

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

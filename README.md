# Triple F Music Webplayer

**Hochschule:** HFT Stuttgart;<br>
**Modul:** Internetprogrammierung;<br>
**Dozent:** Mathias Maciossek;<br>
**Semester:** Sommersemester 2024;<br>
**Gruppenmitglieder:** Funda Şebnem Yeşiltaş, Fatima Alaa-Elleh Smati, Fiona Blackler<br>
<br>
Bei diesem Projekt handelt es sich um eine Full-Stack-React-Webanwendung mit dem Schwerpunkt auf der Verwaltung von MP3-Dateien und der Bereitstellung von Funktionen zum Hinzufügen, Organisieren und Abspielen der MP3-Dateien. Das Gesamtbild der Webanwendung basiert auf dem Windows 95-Design und wurde mit Komponenten aus [React95.io](https://react95.io/#) umgesetzt.<br>
<br>

## Projekt Informationen
**Verwendete Sprachen:**

- HTML
- JavaScript
- CSS

## Vor dem Clonen des Repos
### Node.js
Falls **Node.js** noch nicht installiert ist, lade Node.js von der offiziellen [Node.js-Webseite](https://nodejs.org/en) herunter und folge den Installationsanweisungen.<br>
### MySQL
Falls **MySQL** noch nicht installiert ist, lade den MySQL Installer von der offiziellen [MySQL-Website](https://dev.mysql.com/downloads/installer/) herunter und folge den Installationsanweisungen.<br>

1. **Mit MySQL-Server verbinden**
   Öffne die MySQL-Kommandozeile. Dies kann man durch Suchen nach "MySQL Command Line Client" im Startmenü tun.<br>
   ~~~
   mysql -u root -p
   ~~~
   *-u root gibt den Benutzer an (in diesem Fall root), und -p fordert zur Eingabe des Passworts auf.*<br>

2. **Datenbank erstellen**
   Gebe den folgenden Befehl ein, um eine neue Datenbank namens **musicdb** zu erstellen.<br>
   ~~~
   CREATE DATABASE musicdb;
   ~~~
*Annmerkung: Das root-Passwort für die Datenbank ist in **TripleFMusic/Backend/config/config.json** festgelegt und muss durch das **eigene** root-Passwort ersetzt werden.*

## Nach dem Clonen des Repos
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
✔ Nach Playlist suchen<br>
✔ Nach Song im Mixtape suchen<br>
✔ Nach einzelnen Songs innerhalb einer Playlist suchen<br>
✔ Song abspielen/pausieren<br>
✔ Song vor-/zurückspulen<br>
✔ Song erneut abspielen/Song skippen<br>
✔ Playlist von oben der Reihe nach abspielen<br>
✔ Playlist geshuffelt abspielen <br>

Add Song:<br>
<br>
✔ Vorhandene Playlists anzeigen<br>
✔ mp3/jpg file vom File Explorer auswählen<br>
✔ Song speichern<br>

Sonstiges:<br>
<br>
✔ Easter Egg -> Snake im „Browser“ abspielen, da simuliert "keine Internet-Connetion" besteht.<br>

## Testing

Es wird mit jest im Frontend und Backend getestet mit --coverage flag, damit man die coverage direkt im Terminal einsehen kann.<br>
*Frontend und Server im Backend müssen laufen (siehe oben zum starten), damit die Tests durchlaufen!!*

#### Frontend
~~~
cd TripleFMusic/Frontend
npm test 
~~~

#### Backend
~~~
cd TripleFMusic/Backend
npm run test:backend
~~~

#### Test-Datenbank im Backend erstellen
Im Backend-Ordner Pfad <rootDir>/TripleFMusic/Backend folgende Befehle laufen lassen.<br>
*Die Migration-Files zum erstellen der Test-Datenbank musicdb_test existieren bereits im Projekt!!*
<br>
<br>
Windows
~~~
npx sequelize-cli db:create --env testv
npx sequelize-cli db:migrate --env test
~~~

Linus/Mac
~~~
sudo npx sequelize-cli db:create --env testv
sudo npx sequelize-cli db:migrate --env test
~~~

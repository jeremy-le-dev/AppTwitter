# AppTwitter
Web Project - LP SIL IDSE

-

### Installer NodeJS (npm)
+ Allez sur <https://nodejs.org/en/> pour t√©l√©charger et installer NodeJS

### Installer Ionic Framework
+ Executez la commande suivante : `sudo npm install -g cordova ionic`
+ Pour voir la doc : <http://ionicframework.com/docs/>

### Installer Bower
+ Executez la commande suivante : `sudo npm install -g bower`
+ Pour voir la doc : <http://bower.io>

### Installer Gulp
+ Executez la commande suivante : `sudo npm install -g gulp`
+ Pour voir la doc : <http://gulpjs.com>

-

### Pr√©paration du projet

Tout d'abord, clonez le projet:
+ Dans le dossier de votre choix : `git clone https://github.com/Wainbot/AppTwitter.git`

Puis, installez les outils :
+ Entrez en ligne de commande √† la racine du projet AppTwitter/
+ Executez la commande : `npm install`


Ensuite, toujours √† la racine du projet, installez les librairies :
+ Executez la commande : `bower install`


Une fois termin√©, il faut lancer le serveur pour voir le projet.
Dans un premier temps, on pourra utiliser le serveur par defaut de Ionic Framework.
+ Il suffit d'executer la commande suivante : `ionic serve`

### PrÈparation de la base de donnÈes

apt-get install postgres
apt-get install php5-pgsql //pdo adapter

AprËs mettez vous en root :
su postgres
psql //racine postgres 
psql twitter //direct dans la base une fois crÈer

Maintenant vous Ítes dans la console de postgres :
ouvrez le ficher postgres.sql et faites des copier-coller Ètape par Ètape.

Commande utile :
/q quitter
/d description de tout les tables ou \d nom_table description une table
/l ‡ la racine de postgres pour lister les BDD

PS : Pour voir l'aper√ßu avec IOS et Android executez avec -l : `ionic serve -l`


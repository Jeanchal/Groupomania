README

*/Pour faire fonctionner l'application
---------------------------------------
- Créer une base de données Mysql, nommée "groupomania", ajouter un utilisateur nommé "test" et un mot de passe nommé "test" également.
- Dans le dossier backend/config, renommer le fichier "test-config.json" en "config.json".
- Dans le dossier backend/config, rennomer le fichier ".env-dist" en ".env.

*/Dans le fichier .env
-----------------------
compléter le fichier en remplacant les  informations entre guillemets:
-PORT=4000
-HOST=localhost
-SECURITY_TOKEN= (ajouter une clé de sécurité pour token jwt)
ATTENTION: sur chaque ligne, il ne doit y avoir aucun espace

*/Pour lancer le serveur backend, depuis le repertoire de travail
-----------------------------------------------------------------
Ouvrir un nouveau terminal, entrer la commande "cd backend", puis "npm install" (pour installer les fichiers nécessaires), 
puis entrer la commande "npm start".

*/Pour lancer l'appli frontend, depuis le reprtoire de travail
--------------------------------------------------------------
Ouvrir un nouveau terminal, entrer la commande "cd frontend", puis "npm install" (pour installer les fichiers nécessaires), 
puis entrer la commande "npm start".

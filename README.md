Avant de lancer le projet, assurez-vous d'avoir téléchargé MongoDB.
Pour téléharger MongoDB (Windows): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
Pour téléharger MongoDB (Linux): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/

Afin d'installer tous les modules présents dans le fichier package.json, executez la commande `npm install`

Lancez ensuite MongoDB avec la commande `sudo systemctl start mongod`.

Vous pouvez ensuite lancer le serveur avec la commande `npm run dev`.

Pour accéder à l'interface créée par nos soins permettant de discuter avec le bot, vous devez vous rendre à l'adresse http://localhost:5000/chat/botID où botID est l'identifiant du bot avec lequel vous voulez discuter. N'oubliez pas de recharger la page après avoir activé un bot pour vous répondre.

Vous pouvez également vous connecter sur Discord sur le serveur de Delphine (lien d'invitation : https://discord.gg/J6DDebg) pour pouvoir discuter avec nos bots.

Pour accéder à l'interface d'administration des bots, vous devez vous rendre à l'adresse http://localhost:5000.

Par défaut, les bots créés sont tous inactifs au démarrage du serveur. N'oubliez pas de les activer avant d'essayer de leur parler.

Avant de lancer le projet, assurez-vous d'avoir téléchargé MongoDB.
Pour téléharger MongoDB (Windows): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
Pour téléharger MongoDB (Linux): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/

Afin d'installer tous les modules présents dans le fichier package.json, executez la commande `npm install`

Si vous êtes sous Linux,
    Lancez ensuite MongoDB avec la commande `sudo systemctl start mongod`.
    Vous pouvez ensuite lancer le serveur avec la commande `npm run dev`.


Si vous êtes sous Windows,
    Lancez simplement MongoDB via l'interface "Services" de Windows.
    Vous pouvez ensuite lancer le serveur avec la commande `node app.js`.




Pour utiliser l'application, vous pouvez :

    Vous rendre à l'adresse http://localhost:5000.
Il s'agit de la page d'administration des bots. Vous pourrez ajouter un nouveau bot en donnant son nom et en cliquant sur le bouton "Créer le bot". Vous pourrez aussi afficher les bots déjà existants dans la base de données (bouton "Afficher les bots"). Enfin, vous pourrez modifier un bot existant en utilisant son identifiant (visible lors de l'affichage des bots).
Vous avez la possibilité de : supprimer le bot, l'activer (pour qu'il puisse communiquer via une interface), le désactiver, le passer sur le chat, le passer sur Discord ou encore changer son cerveau.
ATTENTION : Un bot est par défaut désactivé au démarrage du serveur. Pour qu'il puisse communiquer, il faut l'activer avant de passer sur une interface.
Un bot ne peut être que sur une interface à la fois (Discord ou Chat). Il ne peut avoir qu'un seul cerveau mais celui-ci peut changer en cours de conversation sans avoir besoin de recharger la page.

    Vous rendre à l'adresse http://localhost:5000/chat/botID.
Il s'agit de l'interface de chat (botID étant l'identifiant du bot avec lequel vous voulez discuter).
N'oubliez pas d'activer le bot avant de charger la page de l'interface de chat afin qu'il puisse vous répondre.
Vous pouvez changer le cerveau du bot en cours de conversation sans avoir besoin de recharger la page.

    Vous rendre sur le serveur Discord de Delphine.
Vous pourrez discuter avec le bot sur Discord de la même manière que sur le chat. 
Attention à bien passer le bot sur l'interface Discord, PUIS à l'activer avant de commencer la conversation.
Vous pouvez également changer de cerveau en cours de conversation.

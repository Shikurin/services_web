## Actions nécessaires pour compiler le projet via un terminal

	npm install


Vous pouvez ensuite facilement vous faire une idée des fonctionnalités proposées en tapant, dans le dossier de travail :

	node server.js
	
ou bien :

	node .

Vous accédez en ensuite à notre travail en tapant, dans l'URL de recherche de votre navigateur préféré :

	http://localhost:8080/

	

	
## Liste des packages importés

 - Création d'un nouveau projet :
 
 	npm init
 	
 - Installer RiveScript :
 
 	npm install rivescript
 
 - Installer ejs :
 
 	npm install ejs
 
 - Installer express :
 
 	npm install express
 
 - Installer body-parser :
 
 	npm install body-parser
 	
 - Installer discord.js :
 
 	npm install discord.js
 	
 	
 
## Description des fonctionnalités

Gardez non loin de vous la console : elle confirme toujours les actions que vous effectuez pendant la découverte de notre projet.


 - La page Gestion des amis permet de gérer les chatbots. Il y est tout d'abord possible de créer un chatbot, en entrant son nom. Automatiquement, un numéro d'identifiant, un comportement par défaut et un port lui sont associés. La liste des bots créés apparaissent en bas, indiquant les identifiants du bot, son nom et sa personnalité actuelle. À droite de cette page, on trouve les personnalités qui sont actuellement disponibles pour chaque bot. Par défaut, tous les bots se voient assigner la personnalité "hello.rive".
   Trois boutons sont associés à chaque bot : select, activate et delete.
   Select permet, comme son nom l'indique, de sélectionner un bot. Ceci permet une multitude de choses, parmi lesquelles lui assigner une nouvelle personnalité, via la liste que vous trouverez sur le côté droit de l'écran.
   Lorsque vous appuyez sur activate, vous activez le port lié au chatbot, et correspondant à 3000 + son identifiant. Nous y reviendrons un peu après.
   Delete supprime le bot, et ferme le port associé au bot, s'il a été activé.
   
   Fichiers liés : server.js, form.ejs


 - La page Envie de parler ? est une manière possible de parler avec un bot sélectionné. La droite de l'écran vous indique quels sont tous les bots avec lesquels vous pourriez discuter, et celui avec lequel vous discutez actuellement. Lorsque vous entrez un message et que vous l'envoyez, la réponse du bot s'affiche juste en-dessous.
 
   Fichiers liés : server.js, talk.ejs


 - La page Parlons personnalités permet d'ajouter une personnalité que vous auriez en votre possession à la liste des personnalités disponibles. Prenez simplement garde à placer ce fichier dans le dossier brains du projet.
   
   Fichiers liés : server.js, personalities.ejs
   
   
 - La page Parlons un peu est un peu particulière. Il s'agit de la deuxième façon de communiquer avec un chatbot, et n'est accessible que lorsque vous activez un bot, via la page de gestion des bots. Lorsque vous faites ceci, vous activez le port du bot sélectionné. Dans ce cas, direction votre navigateur préféré, entrez http://localhost:{id du bot + 3000}/ (jetez un oeil à la console) et vous accédez à la page mentionnée. Vous ne pouvez alors parler qu'à ce bot en particulier.
   
   Fichiers liés : server.js, chatServer.js, privateTalk.ejs

# store
Para correr:

-Si es local, se asume se instaló node (https://nodejs.org/es/download/current/) y 
y el server de mongodb (https://docs.mongodb.com/manual/administration/install-community/) 

-Mirar el archivo config.json

-Allí deberíamos indicar un string como JWT, por ejemplo 'sdfsfdsanasv23akf'. Esto se va a usar para encriptar los passwords.
Además verificar que MONGODB_URI contenga el valor de puerto para el servidor mongo local. Por defecto en windows es 27017.

-una vez que esté eso configurado correctamente, simplemente alcanza con un npm run deploy (hace un npm install y luego start)

-como está en el config.json debería quedar corriendo en el puerto 3000
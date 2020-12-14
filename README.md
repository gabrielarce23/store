# store
Para correr:

-Si es local, se asume se instaló node (https://nodejs.org/es/download/current/) y 
y el server de mongodb (https://docs.mongodb.com/manual/administration/install-community/) 

-Mirar el archivo config.json

-Allí deberíamos indicar un string como JWT, por ejemplo 'sdfsfdsanasv23akf'. Esto se va a usar para generar tokens.
Además verificar que MONGODB_URI contenga el valor de puerto para el servidor mongo local. Por defecto en windows es 27017.

-Sustituir en el config.json el valor del logkey (por defecto logkey), esta es la clave para poder usar el endpoint del switch log

-una vez que esté eso configurado correctamente, simplemente alcanza con un npm run deploy (hace un npm install y luego start)

-como está en el config.json debería quedar corriendo en el puerto 3000
    /api estarían todos los endpoints de la api
    / estaría el sitio estático con los QR code

-al conectarse a la base verifica que existan productos y sucursales, sino hay los crea con lo que está en data.json
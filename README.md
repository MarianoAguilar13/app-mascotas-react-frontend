# App-macotas-perdidas-con-react

Link app: https://app-mascotas-perdidas-9170f.web.app

Utilicé el mismo backend que la app anterior, solamente lo subi a otro repo por separado.

Link Repo backend: https://github.com/MarianoAguilar13/app-mascotas-backend

Link api backend: https://app-mascotas-backend.onrender.com

Link de la documentación de la API con Postman: https://documenter.getpostman.com/view/21301641/2s8YYFs4eP

# Algunas consideraciones:

Hola como estan? Cuando utilicen la app por favor esperen 1 o 3 segundos cuando quieran cargar una mascotas o cuando busquen las mascotas cercanas, porque hay un poco de ping y tarda, probablemente sea por tener tanto el front back y db en distintos servicios y debe haber mucha latencias, por las dudas no clickeen tantas veces el boton porque capaz se me buggea, quise poner en hidden los botones de envia pero se me complico el reestablecerso en visible cuando terminaba de ejecutar todo.
Otra cuestion es que me costo un poco crear customs hook para los componentes y por lo tanto algunos componentes tiene algunas funciones dentro, este hook fue el que mejor quedo useCheckTokenCompleto; esta en api-hooks.tsx, voy a intentar crear mas hooks de ese estilo, supongo que con la práctica lo mejoraré, gracias por leerme, saludos...

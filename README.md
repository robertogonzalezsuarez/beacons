This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


conceptos:
RSSI
MEASURE POWER
https://community.estimote.com/hc/en-us/articles/201636913-What-are-Broadcasting-Power-RSSI-and-other-characteristics-of-a-beacon-s-signal-?page=2
https://stackoverflow.com/questions/36514389/how-to-calculate-the-distance-to-a-beacon-based-on-tx-rssi-and-accuracy



lanzar
ionic serve <-- local navegador
ionic cordova run android -lc <-- modo depuracion en android (por usb)

el plugin "cordova-plugin-app-event"
parece no poder instalarse por cordova add o npm, por que genera en el js on un:
 "file:node_modules/cordova-plugin-app-event",
 
 pero se puede copiar desde dentro de LocalNotifications al node_modules
 
 https://ionicframework.com/docs/native/local-notifications/
 

- Localizar entrada y salida de una region
- Guardar tiempo dentro de la region de cada usuario, si se producen multiples entradas/salidas en un beacon, sumar tiempos (unificar estancia en el beacon)
- Puntos parametrizables en backend por cada beacon y tiempo necesario dentro del beacon
- vista administracion para visualizar usuario, parametrizar puntos y areas (tiempo en region)
- Revisar la opcion de stock de premios, que se pueden ir agotando y asignando a puntos <-- parametrizable desde admin
- Login/ registro de usuarios
- ID de beacon cifrada, y mandar a servidor descifrada desde la app. <-- ojear
- App - vistas:
  - Ranking
  - Listado de premios (y sus puntos y las unidades)
  - Vista perfil 
- 


librerias:

https://github.com/angular/angularfire2

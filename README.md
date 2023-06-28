# back_prueba_tecnica



## El proyecto consiste en una web en la cual podremos, como usuario, registrarnos, conectarnos y modificar nuestros datos de usuario; pudiendo el administrador eliminar los distintos usuarios registrados.
***

***


## Uso de la API
<br>

## Endpoints

   
    * **REGISTRO**: POST- Registra un nuevo usuario.
    * **LOGIN**: POST- Loggin de un usuario.
    * **LISTADO DE TODOS LOS USUARIOS**: GET- Muestra  todos los usuarios( solo si tienes rol "admin" )
    * **MODIFICAR DATOS DE USUARIO**: PUT- Modifica los datos del propio usuario
    * **BORRAR UN USUARIO**: DELETE- Elimina un usuario ( solo si tienes rol "admin" )



    





## Explicación de la estructura del proyecto


 **Creamos un CRUD básico**. En el proyecto existirá la siguiente estructura:

* **init.js**: Este es el archivo principal. En este archivo nos traemos todo lo necesario para que nuestra API funcione y se arranca el servidor.

* **config**
    * **mongoose.config.js**: En este archivo se gestiona la configuración para conectar con la base de datos. 
    Paralelamente, tendremos un archivo .env(con las variables de entorno) el cual meteremos en el .gitignore, con lo cual no se podrá ver desde Github.
   
* **middlewares**
    * **authMiddleware.js**: En este archivo se gestiona el Middleware de autenticacion del token.

* **routers**
    * **userRouter.js**: En este archivo se gestionan los diferentes endpoints de nuestra API    
    

* **controllers**

    * **userController.js**: En este archivo creamos las funciones de cada endpoint.
     * **handleError.js**: En este archivo controlamos los posibles errores de cada endpoint en nuestra API
         

* **models**
    * **userModel.js**: Definimos el esquema, y creamos el modelo "User". 

* **services**
    * **securityProvider.js**: Archivo en el cual se gestiona la encriptación del password del usuario.
 

* **.gitignore**: Archivo en el que se indica que archivos no se subirán a nuestro repositorio. Está editado de la siguiente manera:

.env
/node_modules




## Explicación de la securización de la API:
- En primer lugar, un usuario se registrará(entre otras cosas, con su email y password).
- La contraseña se encriptará y se guardará en base de datos.
- Al logearse, gestionamos la comparación entre la contraseña introducida en el login(también encriptada) y la contraseña que habíamos guardado previamente en nuestra base de datos.
- Una vez hagamos el login, obtendremos un Token, el cual usaremos para tener acceso a los distintos endpoints privados.

## Tecnologías utilizadas en el proyecto:


* **mongoose**: ODM para MongoDB.

* **express**: Framework de node js.


* **jsonwebtoken**: Instalamos jsonwebtoken en nuestro proyecto para gestionar uso de tokens:


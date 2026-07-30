\# Sistema de gestión de productos con SOAP, WSDL y Node.js



Aplicación distribuida para la gestión básica de productos mediante un servicio web SOAP desarrollado con Node.js.



El sistema utiliza un documento WSDL para definir formalmente las operaciones disponibles, los parámetros de entrada, los tipos de datos y las respuestas generadas por el servicio.



\## Objetivo general



Desarrollar una aplicación distribuida cliente-servidor que implemente un servicio web SOAP en Node.js y utilice un documento WSDL para gestionar productos mediante mensajes XML.



\## Objetivos específicos



\- Comprender el funcionamiento del protocolo SOAP.

\- Identificar la estructura y finalidad de un archivo WSDL.

\- Implementar un servidor SOAP utilizando Node.js.

\- Desarrollar clientes que consuman las operaciones del servicio.

\- Intercambiar información estructurada mediante mensajes XML.

\- Probar las operaciones del servicio utilizando SoapUI.

\- Validar correctamente los datos enviados al servidor.



\## Tecnologías utilizadas



\- Node.js

\- Express

\- Librería `soap` para Node.js

\- Python 3

\- Librería `zeep` para Python

\- XML

\- WSDL

\- SOAP

\- SoapUI Open Source

\- Visual Studio Code

\- Git

\- GitHub



\## Arquitectura de la aplicación



La aplicación utiliza una arquitectura cliente-servidor.



```text

Cliente Node.js ────────┐

&#x20;                       │

Cliente Python ─────────┼── Solicitud SOAP/XML ──> Servidor SOAP Node.js

&#x20;                       │                               │

SoapUI ─────────────────┘                               │

&#x20;                                                       v

&#x20;                                             Lista de productos

&#x20;                                               almacenada en

&#x20;                                                  memoria

```



Los clientes se conectan al servidor utilizando la dirección del archivo WSDL.



El servidor recibe las solicitudes SOAP, procesa las operaciones y devuelve respuestas estructuradas en XML.



\## Estructura del proyecto



```text

proyecto-soap-productos/

│

├── servidor/

│   ├── server.js

│   └── productos.wsdl

│

├── cliente-node/

│   └── client.js

│

├── cliente-python/

│   └── cliente.py

│

├── evidencias/

│   ├── cliente-node-inicio.png

│   ├── cliente-node-final.png

│   ├── cliente-python-final.png

│   ├── wsdl-navegador.png

│   ├── soapui-registro-correcto.png

│   ├── soapui-registro-duplicado.png

│   ├── soapui-consulta-correcta.png

│   ├── soapui-consulta-incorrecta.png

│   ├── soapui-listado-productos.png

│   ├── soapui-actualizar-stock.png

│   ├── soapui-calculo-inventario.png

│   ├── soapui-eliminar-correcto.png

│   └── soapui-eliminar-inexistente.png

│

├── soapui/

│   └── SistemaProductosSOAP-soapui-project.xml

│

├── informe/

│

├── .gitignore

├── package.json

├── package-lock.json

└── README.md

```



Los nombres de las capturas pueden variar dependiendo de cómo se hayan guardado las evidencias.



\## Datos de los productos



Cada producto contiene los siguientes datos:



\- Código

\- Nombre

\- Categoría

\- Precio

\- Cantidad disponible



Los productos se almacenan temporalmente en un arreglo dentro del servidor.



\## Operaciones del servicio SOAP



El servidor implementa seis operaciones.



\### 1. RegistrarProducto



Permite registrar un nuevo producto en el sistema.



Datos de entrada:



\- Código

\- Nombre

\- Categoría

\- Precio

\- Cantidad



Respuesta:



\- Estado de la operación

\- Mensaje de confirmación o error



\### 2. ConsultarProducto



Permite buscar un producto mediante su código.



Dato de entrada:



\- Código del producto



Respuesta:



\- Estado

\- Mensaje

\- Código

\- Nombre

\- Categoría

\- Precio

\- Cantidad



Cuando el producto no existe, el servicio devuelve un mensaje indicando que no fue encontrado.



\### 3. ListarProductos



Permite obtener todos los productos registrados.



No requiere parámetros de entrada.



Respuesta:



\- Estado

\- Mensaje

\- Lista de productos registrados



\### 4. ActualizarStock



Permite modificar la cantidad disponible de un producto.



Datos de entrada:



\- Código del producto

\- Nueva cantidad



Respuesta:



\- Estado de la operación

\- Mensaje de confirmación

\- Cantidad actualizada



\### 5. CalcularValorInventario



Permite calcular el valor total almacenado de un producto.



El cálculo utilizado es:



```text

Valor del inventario = precio × cantidad disponible

```



Dato de entrada:



\- Código del producto



Respuesta:



\- Estado

\- Mensaje

\- Nombre del producto

\- Precio

\- Cantidad

\- Valor total del inventario



\### 6. EliminarProducto



Permite eliminar un producto mediante su código.



Dato de entrada:



\- Código del producto



Respuesta:



\- Estado de la operación

\- Mensaje de confirmación o error



\## Validaciones implementadas



El servicio valida que:



\- El código del producto no esté vacío.

\- El código del producto no se encuentre repetido.

\- El nombre del producto no esté vacío.

\- La categoría no esté vacía.

\- El precio sea un número mayor que cero.

\- La cantidad sea un número entero igual o mayor que cero.

\- La nueva cantidad de stock sea un número entero igual o mayor que cero.

\- El producto exista antes de consultarlo.

\- El producto exista antes de actualizar su stock.

\- El producto exista antes de calcular el valor de su inventario.

\- El producto exista antes de eliminarlo.



Cuando ocurre un error, el servidor devuelve un mensaje comprensible.



Ejemplo:



```xml

<estado>false</estado>

<mensaje>El producto con el código P001 no existe</mensaje>

```



\## Requisitos de instalación



Para ejecutar el proyecto se necesita:



\- Node.js

\- npm

\- Python 3

\- pip

\- SoapUI Open Source



\## Instalación del proyecto



Clonar el repositorio desde GitHub:



```bash

git clone https://github.com/AlejandroCoral/sistema-productos-soap-nodejs.git

```



Ingresar en la carpeta del proyecto:



```bash

cd sistema-productos-soap-nodejs

```



También se puede descargar el repositorio como archivo ZIP desde GitHub y extraerlo en la computadora.



\## Instalación de dependencias de Node.js



Desde la carpeta principal del proyecto, ejecutar:



```bash

npm install

```



En PowerShell, si la ejecución de `npm.ps1` se encuentra bloqueada, se puede utilizar:



```powershell

npm.cmd install

```



Las principales dependencias utilizadas son:



\- `express`

\- `soap`



\## Instalación de dependencias de Python



Ejecutar:



```bash

python -m pip install zeep

```



En algunos equipos puede utilizarse:



```bash

py -m pip install zeep

```



\## Ejecución del servidor SOAP



Desde la carpeta principal del proyecto, ejecutar:



```bash

node servidor/server.js

```



La consola mostrará información similar a:



```text

==========================================

Servidor SOAP iniciado correctamente

Servicio: http://localhost:8000/productos

WSDL: http://localhost:8000/productos?wsdl

==========================================

```



El servidor debe permanecer ejecutándose mientras se utilizan los clientes o SoapUI.



\## Dirección del servicio



El endpoint del servicio SOAP es:



```text

http://localhost:8000/productos

```



El documento WSDL está disponible en:



```text

http://localhost:8000/productos?wsdl

```



Al abrir la dirección del WSDL en el navegador, se mostrará el documento XML con la definición del servicio.



\## Ejecución del cliente Node.js



Con el servidor encendido, abrir otra terminal y ejecutar:



```bash

node cliente-node/client.js

```



El cliente Node.js realiza automáticamente las siguientes pruebas:



1\. Registro del producto `P001`.

2\. Registro del producto `P002`.

3\. Consulta de un producto existente.

4\. Consulta de un producto inexistente.

5\. Listado de productos.

6\. Actualización del stock.

7\. Cálculo del valor del inventario.

8\. Eliminación de un producto.

9\. Listado final de productos.



Al finalizar correctamente, la consola muestra:



```text

Todas las pruebas finalizaron correctamente.

```



\## Ejecución del cliente Python



Con el servidor encendido, abrir otra terminal y ejecutar:



```bash

python cliente-python/cliente.py

```



También puede utilizarse:



```bash

py cliente-python/cliente.py

```



El cliente Python realiza pruebas de:



1\. Registro de dos productos.

2\. Consulta de un producto existente.

3\. Consulta de un producto inexistente.

4\. Listado de productos.

5\. Actualización de stock.

6\. Cálculo del valor del inventario.

7\. Eliminación de un producto.

8\. Listado final.



Al finalizar correctamente, muestra:



```text

Todas las pruebas del cliente Python finalizaron correctamente.

```



\## Pruebas mediante SoapUI



Para importar el servicio en SoapUI:



1\. Ejecutar el servidor Node.js.

2\. Abrir SoapUI Open Source.

3\. Seleccionar la opción `SOAP`.

4\. Crear un nuevo proyecto SOAP.

5\. Escribir como nombre del proyecto:



```text

SistemaProductosSOAP

```



6\. Utilizar como dirección WSDL:



```text

http://localhost:8000/productos?wsdl

```



7\. Mantener activada la opción para crear solicitudes de ejemplo.

8\. Presionar `OK`.

9\. Ejecutar las solicitudes correspondientes a cada operación.



SoapUI debe mostrar las siguientes operaciones:



```text

RegistrarProducto

ConsultarProducto

ListarProductos

ActualizarStock

CalcularValorInventario

EliminarProducto

```



\## Casos correctos probados en SoapUI



\- Registro de un producto nuevo.

\- Consulta de un producto existente.

\- Listado de productos.

\- Actualización del stock.

\- Cálculo del valor del inventario.

\- Eliminación de un producto existente.



\## Casos incorrectos probados en SoapUI



\- Registro de un producto con un código duplicado.

\- Consulta de un producto inexistente.

\- Eliminación de un producto inexistente.



El servidor también incluye validaciones para:



\- Precio negativo o igual a cero.

\- Cantidad negativa.

\- Cantidad decimal.

\- Campos vacíos.



\## Ejemplo de solicitud SOAP



Ejemplo para registrar un producto:



```xml

<soapenv:Envelope

&#x20;   xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"

&#x20;   xmlns:pro="http://example.com/productos">



&#x20;   <soapenv:Header/>



&#x20;   <soapenv:Body>

&#x20;       <pro:RegistrarProductoRequest>

&#x20;           <pro:codigo>P201</pro:codigo>

&#x20;           <pro:nombre>Audífonos Bluetooth</pro:nombre>

&#x20;           <pro:categoria>Tecnología</pro:categoria>

&#x20;           <pro:precio>35.50</pro:precio>

&#x20;           <pro:cantidad>10</pro:cantidad>

&#x20;       </pro:RegistrarProductoRequest>

&#x20;   </soapenv:Body>



</soapenv:Envelope>

```



\## Ejemplo de respuesta correcta



```xml

<RegistrarProductoResponse

&#x20;   xmlns="http://example.com/productos">

&#x20;   <estado>true</estado>

&#x20;   <mensaje>

&#x20;       Producto Audífonos Bluetooth registrado correctamente

&#x20;   </mensaje>

</RegistrarProductoResponse>

```



\## Ejemplo de respuesta incorrecta



```xml

<RegistrarProductoResponse

&#x20;   xmlns="http://example.com/productos">

&#x20;   <estado>false</estado>

&#x20;   <mensaje>

&#x20;       El producto con el código P201 ya existe

&#x20;   </mensaje>

</RegistrarProductoResponse>

```



\## Almacenamiento de los productos



Los productos se almacenan en memoria dentro de un arreglo de JavaScript.



No se utiliza una base de datos.



Cuando se detiene o reinicia el servidor:



\- Los productos registrados se eliminan.

\- La lista vuelve a estar vacía.

\- Las pruebas pueden ejecutarse nuevamente desde el inicio.



\## Detener el servidor



Para detener el servidor, seleccionar la terminal donde se encuentra ejecutándose y presionar:



```text

Ctrl + C

```



\## Repositorio



El código fuente se encuentra almacenado en GitHub:



```text

https://github.com/AlejandroCoral/sistema-productos-soap-nodejs

```



\## Autor



\*\*Alejandro Coral\*\*



\## Asignatura



Aplicaciones Distribuidas



\## Tema



Servicios web SOAP y contratos WSDL



\## Estado del proyecto



El proyecto incluye:



\- Servidor SOAP funcional en Node.js.

\- Contrato WSDL completo.

\- Seis operaciones de gestión de productos.

\- Validaciones de datos.

\- Cliente SOAP desarrollado en Node.js.

\- Cliente SOAP desarrollado en Python.

\- Pruebas realizadas mediante SoapUI.

\- Evidencias de funcionamiento.

\- Documentación de instalación y ejecución.


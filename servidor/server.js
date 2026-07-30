const express = require("express");
const soap = require("soap");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

// Aquí se almacenarán los productos temporalmente.
const productos = [];

// Operaciones disponibles en el servicio SOAP.
const servicioProductos = {
  ProductosService: {
    ProductosPort: {
      RegistrarProducto(args) {
        console.log("Operación ejecutada: RegistrarProducto");
        console.log("Datos recibidos:", args);

        return {
          estado: true,
          mensaje: "El servicio SOAP está funcionando correctamente",
        };
      },
    },
  },
};

// Ubicación del archivo productos.wsdl.
const rutaWsdl = path.join(__dirname, "productos.wsdl");

// Verificar que el archivo WSDL exista.
if (!fs.existsSync(rutaWsdl)) {
  console.error("No se encontró el archivo productos.wsdl");
  process.exit(1);
}

// Leer el contenido del archivo WSDL.
const xmlWsdl = fs.readFileSync(rutaWsdl, "utf8");

// Iniciar el servidor.
const servidor = app.listen(PORT, () => {
  console.log("==========================================");
  console.log("Servidor SOAP iniciado correctamente");
  console.log(`Servicio: http://localhost:${PORT}/productos`);
  console.log(`WSDL: http://localhost:${PORT}/productos?wsdl`);
  console.log("==========================================");
});

// Publicar el servicio SOAP.
soap.listen(servidor, "/productos", servicioProductos, xmlWsdl);
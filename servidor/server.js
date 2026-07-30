const express = require("express");
const soap = require("soap");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

// Los productos se guardarán temporalmente en memoria.
const productos = [];

/**
 * Convierte cualquier dato recibido en texto limpio.
 */
function convertirTexto(valor) {
  return String(valor ?? "").trim();
}

/**
 * Busca un producto mediante su código.
 */
function buscarProducto(codigo) {
  const codigoLimpio = convertirTexto(codigo).toUpperCase();

  return productos.find(
    (producto) => producto.codigo.toUpperCase() === codigoLimpio
  );
}

/**
 * Valida los datos recibidos para registrar un producto.
 */
function validarProducto(args) {
  const codigo = convertirTexto(args.codigo).toUpperCase();
  const nombre = convertirTexto(args.nombre);
  const categoria = convertirTexto(args.categoria);
  const precio = Number(args.precio);
  const cantidad = Number(args.cantidad);

  if (codigo === "") {
    return {
      valido: false,
      mensaje: "El código del producto no puede estar vacío",
    };
  }

  if (nombre === "") {
    return {
      valido: false,
      mensaje: "El nombre del producto no puede estar vacío",
    };
  }

  if (categoria === "") {
    return {
      valido: false,
      mensaje: "La categoría del producto no puede estar vacía",
    };
  }

  if (!Number.isFinite(precio) || precio <= 0) {
    return {
      valido: false,
      mensaje: "El precio debe ser un número mayor que cero",
    };
  }

  if (!Number.isInteger(cantidad) || cantidad < 0) {
    return {
      valido: false,
      mensaje: "La cantidad debe ser un número entero igual o mayor que cero",
    };
  }

  return {
    valido: true,
    producto: {
      codigo,
      nombre,
      categoria,
      precio,
      cantidad,
    },
  };
}

// Implementación de las operaciones SOAP.
const servicioProductos = {
  ProductosService: {
    ProductosPort: {
      /**
       * Registra un nuevo producto.
       */
      RegistrarProducto(args) {
        console.log("\n==========================================");
        console.log("Operación ejecutada: RegistrarProducto");
        console.log("Datos recibidos:", args);

        const validacion = validarProducto(args);

        if (!validacion.valido) {
          console.log("Resultado:", validacion.mensaje);

          return {
            estado: false,
            mensaje: validacion.mensaje,
          };
        }

        const productoExistente = buscarProducto(
          validacion.producto.codigo
        );

        if (productoExistente) {
          const mensaje =
            `El producto con el código ${validacion.producto.codigo} ya existe`;

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        productos.push(validacion.producto);

        const mensaje =
          `Producto ${validacion.producto.nombre} registrado correctamente`;

        console.log("Resultado:", mensaje);
        console.log("Productos registrados:", productos.length);

        return {
          estado: true,
          mensaje,
        };
      },

      /**
       * Consulta un producto mediante su código.
       */
      ConsultarProducto(args) {
        console.log("\n==========================================");
        console.log("Operación ejecutada: ConsultarProducto");
        console.log("Datos recibidos:", args);

        const codigo = convertirTexto(args.codigo).toUpperCase();

        if (codigo === "") {
          const mensaje =
            "El código del producto no puede estar vacío";

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const producto = buscarProducto(codigo);

        if (!producto) {
          const mensaje =
            `El producto con el código ${codigo} no existe`;

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        console.log("Resultado: Producto encontrado");
        console.log("Producto:", producto);

        return {
          estado: true,
          mensaje: "Producto encontrado correctamente",
          codigo: producto.codigo,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          cantidad: producto.cantidad,
        };
      },

      /**
       * Devuelve todos los productos registrados.
       */
      ListarProductos() {
        console.log("\n==========================================");
        console.log("Operación ejecutada: ListarProductos");
        console.log("Cantidad de productos:", productos.length);

        if (productos.length === 0) {
          return {
            estado: true,
            mensaje: "No existen productos registrados",
            productos: [],
          };
        }

        return {
          estado: true,
          mensaje: `Se encontraron ${productos.length} productos`,
          productos,
        };
      },

      /**
       * Actualiza la cantidad disponible de un producto.
       */
      ActualizarStock(args) {
        console.log("\n==========================================");
        console.log("Operación ejecutada: ActualizarStock");
        console.log("Datos recibidos:", args);

        const codigo = convertirTexto(args.codigo).toUpperCase();
        const nuevaCantidad = Number(args.nuevaCantidad);

        if (codigo === "") {
          const mensaje =
            "El código del producto no puede estar vacío";

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 0) {
          const mensaje =
            "La nueva cantidad debe ser un número entero igual o mayor que cero";

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const producto = buscarProducto(codigo);

        if (!producto) {
          const mensaje =
            `El producto con el código ${codigo} no existe`;

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        producto.cantidad = nuevaCantidad;

        const mensaje =
          `Stock del producto ${producto.nombre} actualizado correctamente`;

        console.log("Resultado:", mensaje);
        console.log("Nueva cantidad:", producto.cantidad);

        return {
          estado: true,
          mensaje,
          cantidadActualizada: producto.cantidad,
        };
      },

      /**
       * Calcula el valor total del inventario de un producto.
       */
      CalcularValorInventario(args) {
        console.log("\n==========================================");
        console.log("Operación ejecutada: CalcularValorInventario");
        console.log("Datos recibidos:", args);

        const codigo = convertirTexto(args.codigo).toUpperCase();

        if (codigo === "") {
          const mensaje =
            "El código del producto no puede estar vacío";

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const producto = buscarProducto(codigo);

        if (!producto) {
          const mensaje =
            `El producto con el código ${codigo} no existe`;

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const valorTotal = producto.precio * producto.cantidad;

        console.log("Producto:", producto.nombre);
        console.log("Precio:", producto.precio);
        console.log("Cantidad:", producto.cantidad);
        console.log("Valor total:", valorTotal);

        return {
          estado: true,
          mensaje: "Valor del inventario calculado correctamente",
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: producto.cantidad,
          valorTotal,
        };
      },

      /**
       * Elimina un producto mediante su código.
       */
      EliminarProducto(args) {
        console.log("\n==========================================");
        console.log("Operación ejecutada: EliminarProducto");
        console.log("Datos recibidos:", args);

        const codigo = convertirTexto(args.codigo).toUpperCase();

        if (codigo === "") {
          const mensaje =
            "El código del producto no puede estar vacío";

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const indice = productos.findIndex(
          (producto) =>
            producto.codigo.toUpperCase() === codigo
        );

        if (indice === -1) {
          const mensaje =
            `El producto con el código ${codigo} no existe`;

          console.log("Resultado:", mensaje);

          return {
            estado: false,
            mensaje,
          };
        }

        const productoEliminado = productos.splice(indice, 1)[0];

        const mensaje =
          `Producto ${productoEliminado.nombre} eliminado correctamente`;

        console.log("Resultado:", mensaje);
        console.log("Productos restantes:", productos.length);

        return {
          estado: true,
          mensaje,
        };
      },
    },
  },
};

// Ruta del documento WSDL.
const rutaWsdl = path.join(__dirname, "productos.wsdl");

// Comprobar que el archivo WSDL exista.
if (!fs.existsSync(rutaWsdl)) {
  console.error("No se encontró el archivo productos.wsdl");
  process.exit(1);
}

// Leer el documento WSDL.
const xmlWsdl = fs.readFileSync(rutaWsdl, "utf8");

// Iniciar el servidor HTTP.
const servidor = app.listen(PORT, () => {
  console.log("==========================================");
  console.log("Servidor SOAP iniciado correctamente");
  console.log(`Servicio: http://localhost:${PORT}/productos`);
  console.log(`WSDL: http://localhost:${PORT}/productos?wsdl`);
  console.log("==========================================");
});

// Publicar el servicio SOAP.
soap.listen(servidor, "/productos", servicioProductos, xmlWsdl);
const soap = require("soap");

const WSDL_URL = "http://localhost:8000/productos?wsdl";

/**
 * Ejecuta una operación SOAP y devuelve una promesa.
 */
function ejecutarOperacion(cliente, nombreOperacion, parametros = {}) {
  return new Promise((resolve, reject) => {
    cliente[nombreOperacion](parametros, (error, resultado) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(resultado);
    });
  });
}

/**
 * Muestra cada resultado de manera ordenada en la consola.
 */
function mostrarResultado(titulo, resultado) {
  console.log("\n==============================================");
  console.log(titulo);
  console.log("==============================================");
  console.dir(resultado, { depth: null });
}

async function iniciarCliente() {
  try {
    console.log("Conectando con el servicio SOAP...");
    console.log(`WSDL: ${WSDL_URL}`);

    const cliente = await soap.createClientAsync(WSDL_URL);

    console.log("Cliente SOAP conectado correctamente.");

    // 1. Registrar el primer producto.
    const registroProducto1 = await ejecutarOperacion(
      cliente,
      "RegistrarProducto",
      {
        codigo: "P001",
        nombre: "Teclado mecánico",
        categoria: "Tecnología",
        precio: 45.5,
        cantidad: 10,
      }
    );

    mostrarResultado(
      "1. Registro del producto P001",
      registroProducto1
    );

    // 2. Registrar el segundo producto.
    const registroProducto2 = await ejecutarOperacion(
      cliente,
      "RegistrarProducto",
      {
        codigo: "P002",
        nombre: "Mouse inalámbrico",
        categoria: "Tecnología",
        precio: 20.75,
        cantidad: 15,
      }
    );

    mostrarResultado(
      "2. Registro del producto P002",
      registroProducto2
    );

    // 3. Consultar un producto existente.
    const consultaExistente = await ejecutarOperacion(
      cliente,
      "ConsultarProducto",
      {
        codigo: "P001",
      }
    );

    mostrarResultado(
      "3. Consulta de un producto existente",
      consultaExistente
    );

    // 4. Consultar un producto inexistente.
    const consultaInexistente = await ejecutarOperacion(
      cliente,
      "ConsultarProducto",
      {
        codigo: "P999",
      }
    );

    mostrarResultado(
      "4. Consulta de un producto inexistente",
      consultaInexistente
    );

    // 5. Listar todos los productos.
    const listadoInicial = await ejecutarOperacion(
      cliente,
      "ListarProductos",
      {}
    );

    mostrarResultado(
      "5. Listado de productos registrados",
      listadoInicial
    );

    // 6. Actualizar el stock del producto P001.
    const actualizacionStock = await ejecutarOperacion(
      cliente,
      "ActualizarStock",
      {
        codigo: "P001",
        nuevaCantidad: 25,
      }
    );

    mostrarResultado(
      "6. Actualización del stock de P001",
      actualizacionStock
    );

    // 7. Calcular el valor del inventario de P001.
    const valorInventario = await ejecutarOperacion(
      cliente,
      "CalcularValorInventario",
      {
        codigo: "P001",
      }
    );

    mostrarResultado(
      "7. Cálculo del valor del inventario de P001",
      valorInventario
    );

    // 8. Eliminar el producto P002.
    const eliminacionProducto = await ejecutarOperacion(
      cliente,
      "EliminarProducto",
      {
        codigo: "P002",
      }
    );

    mostrarResultado(
      "8. Eliminación del producto P002",
      eliminacionProducto
    );

    // 9. Listar los productos después de la eliminación.
    const listadoFinal = await ejecutarOperacion(
      cliente,
      "ListarProductos",
      {}
    );

    mostrarResultado(
      "9. Listado final de productos",
      listadoFinal
    );

    console.log("\n==============================================");
    console.log("Todas las pruebas finalizaron correctamente.");
    console.log("==============================================");
  } catch (error) {
    console.error("\nOcurrió un error al consumir el servicio SOAP.");

    if (error.code === "ECONNREFUSED") {
      console.error(
        "No se pudo conectar con el servidor. Verifica que esté ejecutándose."
      );
    } else {
      console.error(error.message);
    }
  }
}

iniciarCliente();
from zeep import Client
from zeep.exceptions import Fault
from requests.exceptions import ConnectionError


WSDL_URL = "http://localhost:8000/productos?wsdl"


def mostrar_resultado(titulo, resultado):
    """Muestra cada resultado de forma ordenada."""
    print("\n" + "=" * 55)
    print(titulo)
    print("=" * 55)

    if hasattr(resultado, "__values__"):
        print(resultado.__values__)
    else:
        print(resultado)


def iniciar_cliente():
    try:
        print("Conectando con el servicio SOAP...")
        print(f"WSDL: {WSDL_URL}")

        cliente = Client(wsdl=WSDL_URL)

        print("Cliente SOAP en Python conectado correctamente.")

        # 1. Registrar el primer producto.
        registro_1 = cliente.service.RegistrarProducto(
            codigo="P101",
            nombre="Monitor LED",
            categoria="Tecnología",
            precio=185.50,
            cantidad=8
        )

        mostrar_resultado(
            "1. Registro del producto P101",
            registro_1
        )

        # 2. Registrar el segundo producto.
        registro_2 = cliente.service.RegistrarProducto(
            codigo="P102",
            nombre="Memoria USB",
            categoria="Almacenamiento",
            precio=15.75,
            cantidad=20
        )

        mostrar_resultado(
            "2. Registro del producto P102",
            registro_2
        )

        # 3. Consultar un producto existente.
        consulta_existente = cliente.service.ConsultarProducto(
            codigo="P101"
        )

        mostrar_resultado(
            "3. Consulta de un producto existente",
            consulta_existente
        )

        # 4. Consultar un producto inexistente.
        consulta_inexistente = cliente.service.ConsultarProducto(
            codigo="P999"
        )

        mostrar_resultado(
            "4. Consulta de un producto inexistente",
            consulta_inexistente
        )

        # 5. Listar todos los productos.
        listado_inicial = cliente.service.ListarProductos()

        mostrar_resultado(
            "5. Listado de productos registrados",
            listado_inicial
        )

        # 6. Actualizar el stock.
        actualizacion = cliente.service.ActualizarStock(
            codigo="P101",
            nuevaCantidad=12
        )

        mostrar_resultado(
            "6. Actualización del stock de P101",
            actualizacion
        )

        # 7. Calcular el valor del inventario.
        inventario = cliente.service.CalcularValorInventario(
            codigo="P101"
        )

        mostrar_resultado(
            "7. Cálculo del valor del inventario de P101",
            inventario
        )

        # 8. Eliminar el segundo producto.
        eliminacion = cliente.service.EliminarProducto(
            codigo="P102"
        )

        mostrar_resultado(
            "8. Eliminación del producto P102",
            eliminacion
        )

        # 9. Listado final.
        listado_final = cliente.service.ListarProductos()

        mostrar_resultado(
            "9. Listado final de productos",
            listado_final
        )

        print("\n" + "=" * 55)
        print("Todas las pruebas del cliente Python finalizaron correctamente.")
        print("=" * 55)

    except ConnectionError:
        print("\nNo fue posible conectarse con el servidor SOAP.")
        print("Verifica que el servidor Node.js esté ejecutándose.")

    except Fault as error:
        print("\nEl servidor SOAP devolvió un error:")
        print(error)

    except Exception as error:
        print("\nOcurrió un error inesperado:")
        print(error)


if __name__ == "__main__":
    iniciar_cliente()
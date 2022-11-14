// 1 - instanciacion de los objetos
class Cuadernos {
    constructor(id, nombreProducto, presentacion, precio, imagen){
        this.id = id,
        this.nombreProducto = nombreProducto,
        this.presentacion = presentacion,
        this.precio = precio,
        this.imagen = imagen

    }
    
}
const producto1 = new Cuadernos(1,"Agenda","Semanal", 3900, "sav.jpg")
const producto2 = new Cuadernos(2,"Diario","rayado", 3500, "diario.jpg")
const producto3 = new Cuadernos(3,"tapa blanda", "mixto", 800, "tapablanda.jpg")
const producto4 = new Cuadernos(4,"Rústico","rusticos", 1400, "rusticos.jpg")
const producto5 = new Cuadernos(5,"Agenda", "diaria", 4900, "diaria.jpg")
const producto6 = new Cuadernos(6,"Diario", "liso", 3000, "diarioDos.jpg")

let listadoProductos = []


if(localStorage.getItem("listadoProductos")){
    listadoProductos = JSON.parse(localStorage.getItem("listadoProductos"))
}else{
    listadoProductos.push(producto1, producto2, producto3, producto4,producto5, producto6)
    localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos))
}

let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

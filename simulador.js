//capturas DOM
let divProductos = document.getElementById("productos")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let divCompra = document.getElementById("precioTotal")
let buscador = document.getElementById("buscador")


//creo las cards con js y las pusheo
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let cuaderno of array){
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${cuaderno.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${cuaderno.imagen}" alt="${cuaderno.presentacion} de ${cuaderno.nombreProducto}">
                                    <div class="card-body">
                                        <h4 class="card-presentacion">${cuaderno.presentacion}</h4>
                                        <p>Producto: ${cuaderno.nombreProducto}</p>
                                        <p>Precio: ${cuaderno.precio}</p>
                                    <button id="agregarBtn${cuaderno.id}" class="btn btn-outline">¡lo quiero!</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${cuaderno.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(cuaderno)
        })
    }
}
//los pusheo 
function agregarAlCarrito(cuaderno){
    productosEnCarrito.push(cuaderno)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

// modal de BS:
function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBody.innerHTML += `
        <div class="card  mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 440px;">
            <img class="card-img-top" height="100px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombreProducto}">
            <div class="card-body">
                    <h4 class="card-presentacion">${productoCarrito.presentacion}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//function calcular total
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    // console.log(acumulador) funciona ok.
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su compra es ${acumulador}`
}


function buscarPorNombre(array){
    let productoBuscado =("busque por nombre de producto")
    let productoEncontrado = array.find(
        (cuaderno)=> cuaderno.nombreProducto.toLowerCase() == productoBuscado.toLowerCase()
        )
    if(productoEncontrado == undefined){
        console.log(`El producto ${productoBuscado} no se encuenta en stock`)
    }else{
        console.log(productoEncontrado)
    }
}
function buscarPorTipo(array){
    let tipoBuscado = prompt("Ingrese el tipo de cuaderno que busca")
    let busqueda = array.filter(
        (book)=> book.tipo.toLowerCase() == tipoBuscado.toLowerCase()
    )
    if(busqueda.length == 0){
        console.log("No se encontró ningún cuaderno con esa descripción")
    }else{
        console.log(busqueda)
        verCatalogo(busqueda)
    }
}
function buscarInfo(buscado, array){
    console.log(buscado)
    let busqueda = array.filter(
        (cuaderno) => cuaderno.presentacion.toLowerCase().includes(buscado.toLowerCase()) || cuaderno.nombreProducto.toLowerCase().includes(buscado.toLowerCase())
    )
    if(busqueda.length == 0){
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<p>no se encontró el producto. Le dejamos el catálogo para que encuentre lo que busca</p>`
        coincidencia.appendChild(nuevoDiv)
        mostrarCatalogo(array)
    }else{
        coincidencia.innerHTML = ""
        mostrarCatalogo(busqueda)
    }
}


// eventos:
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, listadoProductos)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
}) 
mostrarCatalogo(listadoProductos)


// prueba
// function sumarCarrito (productoCarrito){
    //     let total = productoCarrito.reduce s
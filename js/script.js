const Clickbutton = document.querySelectorAll('.buttom')
//console.log(Clickbutton)
const tbody = document.querySelector('.tbody')
let carrito = []

//Recorrer botones del producto
Clickbutton.forEach((btn) => {
    btn.addEventListener('click', addCarritoItem)
}) 

//Funcion Agregar al carro
function addCarritoItem(evento){
    const boton = evento.target
    //console.log(boton)     //Se llama al contenedor Padre
    const item = boton.closest('.card')
    //console.log(item)
    const itemTitle = item.querySelector('.card-title').textContent;
    //console.log(itemTitle)
    const itemPrice = item.querySelector('.precio').textContent;
    //console.log(itemPrice)
    const itemImg = item.querySelector('.card-img-top').src;
    //console.log(itemImg)

    //Crear OBJETO de carrito (item)
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        imagen: itemImg,
        cantidad: 1
    }

    //OBJETO pasarlo a la funcion para agregarlo
    add_itemCarrito(newItem)
}

//Crear funcion add_itemCarrito
function add_itemCarrito(newItem){

    const alert = document.querySelector('.alert')

    //Mensaje de alerta
    setTimeout(function(){
        alert.classList.add('hide')
    }, 1500)
    alert.classList.remove('hide') 

    const inputElemento = tbody.getElementsByClassName('input_elemento')

    //Recorrer carrito -> buscar productos repetidos
    for(let i = 0 ; i < carrito.length; i++){

        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i]
            inputValue.value ++;

            carritoTotal()
            //Este evento evita que se ejcute lo que viene despues
            return null;
        }

    }
    
    //Al CARRITO se le entrega el ITEM
    carrito.push(newItem)
    //Funcion
    renderCarrito()
}

//Crear funcion renderCarrito
function renderCarrito(){
    //Reseteo
    tbody.innerHTML = ''
    //console.log(carrito)

    carrito.map(item =>{
        const tr = document.createElement('tr')
        tr.classList.add ('itemCarrito')
        const contenido = `
            <th scope="row" data-pro="Codigo">1</th> 
            <td class="table_producto">
                <img src=${item.imagen} alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table_precio" data-pro="Precio"><p>${item.precio}</p></td>
            <td class="table_cantidad" data-pro="Cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input_elemento">
                <button class="delete btn btn-danger">X</button>
            </td>
        `
        //Se igual tr al Contenido
        tr.innerHTML = contenido
        tbody.appendChild(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector('.input_elemento').addEventListener('change', sumarCantidad)
    })

    carritoTotal()
}

//Sumar el total
function carritoTotal(){

    let total = 0;
    const itemCarritoTotal = document.querySelector('.itemCardTotal')

    //Recorrer carrito para encontrar el valor
    carrito.forEach((item) => {
        //Se pasa el PRECIO a numero
        const precio = Number(item.precio.replace("$",''))
        total = total + precio * item.cantidad
    })

    itemCarritoTotal.innerHTML = `Total $${total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    const btnDelete = e.target
    const tr = btnDelete.closest(".itemCarrito")

    const title = tr.querySelector('.title').textContent;

    for(let i = 0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim() ){
            carrito.splice(i, 1) 

        }
    }

    const alert = document.querySelector('.remove')
    //Mensaje de alerta
    setTimeout(function(){
        alert.classList.add('remove')
    }, 1500)
    alert.classList.remove('remove') 

    tr.remove()
    carritoTotal()
}

function sumarCantidad(ev){
    const sumaInput = ev.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent

    carrito.forEach(item => {
        if(item.title.trim() === title.trim()){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })

}

//Almacenar datos de compra en el localStore
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage;
        renderCarrito()

    }
}
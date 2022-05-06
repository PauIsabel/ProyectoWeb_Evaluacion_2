/** ================== ACCION BOTON DE COMPRA=================================*/
/**VARIABLE que leer todos los productos */
let allContainerCards = document.querySelector('.productos')

/**Para el MODAL del CARRITO */
let buyProducts = []


/**Funcion - . AGrupa todos los listener */
//Primero se llama la FUNCION y despues se CREA -> Para que se ejecute
loadEventListener();

//Crear FUNCION 'oadEventListene'
function loadEventListener(){
    //Agrega elk LISTENER a los selectores      LLAMA FUNCION
    allContainerCards.addEventListener('click', addProduct);
}

//Crear FUNCION 'addProduct'
function addProduct(e){

    //Para que al hacer CLICK en la CARD, solo pesque el BOTON
    e.preventDefault();

    //SELECCIONAR Y ALMACENAR EL CONTENEDOR PADRE
    const selectProduct = e.target
    //console.log(selectProduct)     
    const product = selectProduct.closest('.card')
    //console.log(product)

    //SELECCIONAR LOS ATRIBUTOS
    const nameProduct = product.querySelector('.card-title').textContent;
    //console.log(nameProduct)
    const priceProduct = product.querySelector('.precio').textContent;
    //console.log(priceProduct)
    const imgProduct = product.querySelector('.card-img-top').src;
    //console.log(imgProduct)
    const idProduct = product.querySelector('a').getAttribute('data-id')
    //console.log(idProduct)

    //Crear OBJETO para PRODUCTO
    const infoProduct = {
        id: idProduct,
        nombre: nameProduct,
        imagen: imgProduct,
        precio: priceProduct,
        cantidad: 1
    }

    //Copia del PRODUCTO dentro del ARRAY -> Para agregar los productos
    buyProducts = [...buyProducts, infoProduct]

    //Funcion que carga el HTML
    loadHTML();
    console.log(infoProduct)

}

//Crear FUNCION 'loadHTML' 
function loadHTML(){

    //Recorrer el OBJETO
    buyProducts.forEach(producto => {

        //Recuperar ATRIBUTOS del OBJETO (Se usa DESTRUCTURACION)
        const {imagen, nombre, precio, cantidad, id} = producto;

        //Crear la estructura HTML del CARD -> Dinamico
        const row = document.createElement('div')
        row.classList.add('.item')
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="item-content">
                <h5>${nombre}</h5>
                <h5 class="cart-price">${precio}</h5>
                <h6>Amount: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        
    });
}






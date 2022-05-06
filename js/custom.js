/** ================== ACCION BOTON DE COMPRA=================================*/
/**VARIABLE que leer todos los productos */
let allContainerCards = document.querySelector('.productos')

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
    e.preventDefault();
    
    if(e.target.classList.contains('btn-add')){

        //Recupera al contenedor PADRE y su contendido
        const selectProduct = e.target.parentElement;

        //Obtener ATRIBUTOS
        const cardProducto = selectProduct.closest('.card')

        const imgProducto = cardProducto.querySelector('card-img-top').src
        const nameProduct = cardProducto.querySelector('.card-title').textContent
        const priceProduct = cardProducto.querySelector('.precio').textContent
        const idProduct = cardProducto.querySelector('button').getAttribute('data-id')

        //Crear un OBJETO -> para OBETENER los ATRIBUTOS del producto
        const infoProduct = {
            image: imgProducto,
            title: nameProduct,
            price: priceProduct,
            id: idProduct,
            cantidad: 1
        } 

        console.log(infoProduct);

        //LLAMA FUNCION que LEE EL CONTENIDO y le pasamos la VARIABLE
        //readTheContent(selectProduct);

    }
        
}

//Crear FUNCION 'readTheContent'
function readTheContent(product){

    // //Crear un OBJETO -> para OBETENER los ATRIBUTOS del producto
    // const infoProduct = {
    //     image: product.querySelector('div img').src,
    //     title: product.querySelector('.card-title').textContent,
    //     price: product.querySelector('.precio').textContent,
    //     id: product.querySelector('button').getAttribute('data-id'),
    //     cantidad: 1
    // } 

    

}






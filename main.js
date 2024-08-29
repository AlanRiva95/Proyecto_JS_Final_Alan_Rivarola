// fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
// .then(res => res.json())
// .then(console.log);

const URL = 'https://dummyjson.com/products'
const main = document.getElementById("main")
const carritoDom = document.getElementById("carrito")
const comprar = document.getElementById("comprar")
const cancelar = document.getElementById("cancelar")
const total =document.getElementById("total")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []




const agregarEventosCarrito = () => {
  const botonAgregar = document.getElementsByClassName("botCarrito")
  const botonAgregarArray = Array.from(botonAgregar)
  botonAgregarArray.forEach(el =>{
    el.addEventListener("click", (e) =>{
      let id;
      const productoEnCarrito = carrito.find((el, idArr) =>{
        id = idArr
        return el.producto == e.target.parentElement.children[0].innerText})

          if(e.target.innerText === "+"){ 
        productoEnCarrito.cantidad++
      }else
      {    let id;
       if(productoEnCarrito.cantidad == 1){
        carrito.splice(id, 1)
        } else{
        productoEnCarrito.cantidad--
      }

      }
      actualizarCarrito ()
    })
   
    })

}

function actualizarCarrito () {
  localStorage.setItem("carrito", JSON.stringify(carrito))
  carritoDom.innerHTML = "" // lo dejo vacio para asegurarme.
  carrito.forEach (el =>{
      carritoDom.innerHTML += `
      <div> 
        <h3>${el.producto}</h3>
        <p>${el.precio}</p>
        <button class="botCarrito">+</button>
        <p>${el.cantidad}</p>
        <button class="botCarrito">-</button>
        </div>
        `
                                
  })
  total.innerText = carrito.reduce((acc ,el) =>{
    return acc +el.precio * el.cantidad
  },0).toFixed(2)
  agregarEventosCarrito()
}
    //   <p>Subtotal:"Tu total es de: " ${el.precio * el.cantidad}</p>
                                  //   <button onclick="eliminarProducto(${el.producto})">Eliminar</button>
                                  // </div>
      
comprar.addEventListener("click",()=>{
  carrito = []
  actualizarCarrito()
})
cancelar.addEventListener("click",()=>{
  carrito = []
  actualizarCarrito()
})


//quiero una card que me muestro los datos que pedi del Array. Esto se genero en 2do lugar pero luego lo subi por asincronismo del codigo

const agregadoraDeEventos = () => {
  const botonesDeCompra = document.getElementsByClassName("botonDeCompra") // me devulve un html coleccion
  const arrayDeBotones = Array.from(botonesDeCompra) //desde el array puedo generar el evento
  arrayDeBotones.forEach((el) => {
      el.addEventListener("click", (e)  => {
      const productoEnCarrito = carrito.find(el => el.producto === e.target.parentElement.children[0].innerText)
         if(!productoEnCarrito){
            carrito.push({
              producto: e.target.parentElement.children[0].innerText,
              precio: parseFloat(e.target.parentElement.children[4].innerText),
              cantidad: 1
        })}else{
          productoEnCarrito.cantidad++ 
        } 

         // lo guardo en el local storage para que persista el carrito al refrescar la pagina
        actualizarCarrito() //imprimo el carrito
     })
    
  })
    
}


const pintorDeCard = (arrayDeProductos) =>{
  main.innerHTML = "" // lo dejo vacio para asegurarme.
  arrayDeProductos.forEach((e) =>{
      main.innerHTML += `
      <div> 
        <h3>${e.title}</h3>
        <img src="${e.imagen[0]}" />   
        <p>${e.description}</p>
        <p>${e.price}</p>
        <p>${e.rating}</p>
        <button class="botonDeCompra">Comprar</button>
      </div>
    `               //img es un array(OJO)
  //aca se creara 
  })
  agregadoraDeEventos()
}


const nuevoArrayDeProductos = async () => {
   let res = await fetch(URL)
   let data = await res.json()

    console.log(data.products)    // datos crudos

      //aca se creara un nuevo array con los datos procesados como lo necesitamos.
  let nuestroProducto = data.products.map((e)=>{
    return{
        title: e.title,
        id: e.id,
        imagen: e.images,
        description: e.description,
        price: e.price, //datos procesados
        rating: e.rating
        
    }
  })
  
    pintorDeCard(nuestroProducto)
}

nuevoArrayDeProductos()

document.addEventListener("DOMContentLoaded", () => {

  actualizarCarrito()
})



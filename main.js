function numeroDeMesa() {
    Swal.fire({
      title: "Bienvenido, por favor ingrese el número de su mesa ",
      icon: "question",
      input: "number",
      inputLabel: "Mi mesa es: (01 al 90)",
      background: "url(./images/coctel-4.jpg)",
      color: "#ffff",
      inputValidator: (value) => {
        
        if (!value || value <= 0) {
          return 'Debe ingresar un número válido!';
        }
      }
    }).then((result) => {
      
      if (result.isConfirmed) {

        const mesaNumero = parseInt(result.value);
        
        if (mesaNumero >= 1 && mesaNumero <= 90) {
        
          Swal.fire({
            title: "Gracias, por favor elige tu cóctel",
            color: "#ffff",
            background: "url(./images/coctel-5.png)",
            showConfirmButton: false,
            timer: 1200
          });
        } else {
          
          Swal.fire({
            title: "Por favor, ingrese un número de mesa válido",
            icon: "warning",
            background: "url(./images/fondo-1.png)",
            color: "#ffff"
          }).then(() => {
            numeroDeMesa();
          });
        }
      }
    });
  }
  
  //llamo a la funcion
  numeroDeMesa();
  
const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const main = document.getElementById("main");
const carritoDOM = document.getElementById("carrito");
const comprar = document.getElementById("comprar");
const cancelar = document.getElementById("cancelar");
const total = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarEventosCarrito = () => {
    const botonesAgregar = document.getElementsByClassName("botonCarrito");
    const botonesAgregarArray = Array.from(botonesAgregar);

    botonesAgregarArray.forEach(el => {
        el.addEventListener("click", (e) => {
            const textoBoton = e.target.textContent.trim();
            const nombreProducto = e.target.closest(".cocteles").querySelector("h3").textContent;
            const productoExistente = carrito.find(el => el.producto === nombreProducto);

            if (productoExistente) {
                if (textoBoton === "+") {
                    productoExistente.cantidad++;
                } else if (textoBoton === "-") {
                    productoExistente.cantidad--;
                    if (productoExistente.cantidad <= 0) {
                        carrito = carrito.filter(el => el.producto !== nombreProducto);
                    }
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            }
        });
    });
};

function actualizarCarrito() {
    carritoDOM.innerHTML = "";
    carrito.forEach(el => {
        carritoDOM.innerHTML += `
            <div class="cocteles">
                <h3>${el.producto}</h3>
                <p>Precio: $${el.precio.toLocaleString()}</p>
                <button class="botonCarrito">+</button>
                <p>Cantidad: ${el.cantidad}</p>
                <button class="botonCarrito">-</button>
            </div>
        `;
    });

 
    const montoTotal = carrito.reduce((acc, el) => {
        return acc + (el.precio * el.cantidad);
    }, 0).toFixed(2);

    total.innerText = `Total: $${parseFloat(montoTotal).toLocaleString()}`;

    
    agregarEventosCarrito();
}

    
    agregarEventosCarrito();


    comprar.addEventListener("click", () => {
        
        if (carrito.length === 0) {
            
            Swal.fire({
                title: "Copa vacia...",
                text: "Por favor, agregue un coctel al pedido.",
                icon: "warning",
                background: "url(./images/copa_vacia.png)",
                color: "#0E0117",
                confirmButtonText: "Agregar Coctel"
            });
        } else {
            
            Swal.fire({
                title: "Perfecto, ¿Desea pedir algo más?",
                icon: "question",
                color: "#ffff",
                background: "url(./images/coctel-2.png)",
                confirmButtonText: "Enviar pedido",
                showCancelButton: true,
                cancelButtonText: "Agregar coctel",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, vaciar el carrito y actualizar el localStorage...
                    carrito = [];
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
        
                    Swal.fire({
                        title: "Preparando tu pedido, ya te lo llevamos a la mesa",
                        background: "url(./images/coctel-2.png)",
                        color: "#ffff",
                        confirmButtonText: "Gracias"
                    });
                }
            });
        }
    });
    
    actualizarCarrito();
    

cancelar.addEventListener("click", () => {
    Swal.fire({
        title: "Pedido Cancelado",
        background:"url(./images/fondo-1.png)",
        icon: "warning",
        color:"#ffff"
      });
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
});

const agregarEventosBotones = () => {
    const botonesAgregar = document.querySelectorAll(".botonDeAgregar");

    botonesAgregar.forEach(botonDeAgregar => {
        botonDeAgregar.addEventListener("click", event => {
            const boton = event.currentTarget;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const productoExistente = carrito.find(el => el.producto === nombre);

            if (!productoExistente) {
                carrito.push({
                    producto: nombre,
                    precio: precio,
                    cantidad: 1
                });
            } else {
                productoExistente.cantidad++;
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();

            Swal.fire({
                background: "url(./images/coctel-6.png)",
                color: "#ffff",
                icon: "info",
                title: "Agregado al pedido",
                showConfirmButton: false,
                timer: 1100
            });
        });
    });
};

// Precios por coctel
const preciosPorCoctel = {
    "Margarita": 8000,
    "Blue Margarita": 10000,
    "Tommy's Margarita": 13000,
    "Whitecap Margarita": 11000,
    "Strawberry Margarita": 15000,
    "Smashed Watermelon Margarita": 9000
};

const pintarMenuCards = (arrayDeCocteles) => {
    main.innerHTML = "";
    arrayDeCocteles.forEach((e) => {
        main.innerHTML += `
            <div class="cocteles">
                <img src="${e.strDrinkThumb}" alt="${e.strDrink}"/>
                <p>$${e.precio.toLocaleString()}</p>
                <h3>${e.strDrink}</h3>
                <button class="botonDeAgregar" data-nombre="${e.strDrink}" data-precio="${e.precio}">Pedir Bebida</button>
            </div>
        `;
    });
    agregarEventosBotones();
};

const menuDeProductosArray = async () => {
    try {
        let res = await fetch(URL);
        let data = await res.json();
        let nuestroCoctel = data.drinks.map((e) => {
            let nombre = e.strDrink;
            let precio = preciosPorCoctel[nombre] || 0;
            return {
                strDrink: nombre,
                strDrinkThumb: e.strDrinkThumb,
                precio: precio
            };
        });
        pintarMenuCards(nuestroCoctel);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    menuDeProductosArray();
    actualizarCarrito();
});

document.getElementById('toggleCarrito').addEventListener('click', () => {
    const carrito = document.getElementById('carrito');
    if (carrito.style.display === 'block' || carrito.style.display === '') {
        carrito.style.display = 'none';
        document.getElementById('toggleCarrito').textContent = 'Ver pedido';
    } else {
        carrito.style.display = 'block';
        document.getElementById('toggleCarrito').textContent = 'Ocultar pedido';
    }
});

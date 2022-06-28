const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
let carrito = [];

const PRODUCTOS = [
    {
        id: 1,
        nombre: " Lemon Pie",
        precio: 2000,
        stock: 8,
        imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/413/750/products/20200131_1726171-ecf9440be2d7a84e1016110088861117-1024-1024.jpg"
    },
    {
        id: 2,
        nombre: " Tarta Frutal",
        precio: 1500,
        stock: 10,
        imagen: "https://www.recetasderechupete.com/wp-content/uploads/2019/07/Tarta-de-crema-y-frutas.jpg"
    },
    {
        id: 3,
        nombre: " Torta personalizada",
        precio: 2500, 
        stock: 3,
        imagen: "https://cdn.shopify.com/s/files/1/0273/4702/6033/products/driprosadoHB_530x@2x.jpg?v=1591306806"
    },

    {
        id: 4,
        nombre: "Cookies decoradas (6 unidades)",
        precio: 850, 
        stock: 2 ,
        imagen: "https://www.cookingclassy.com/wp-content/uploads/2020/02/soft-sugar-cookies-5.jpg"

    },

    {
    id: 5,
    nombre: "Masitas secas (12 unidades)",
    precio: 950, 
    stock: 3,
    imagen: "http://www.recetasya.com/wp-content/uploads/2011/04/masitas-secas-tipo-alemanas.2jpg.jpg"
    },

    {
        id: 6,
        nombre: "Crumble de manzana",
        precio: 1000, 
        stock: 2,
        imagen: "https://i0.wp.com/ahoramama.com.ar/wp-content/uploads/2019/05/cuadrados-de-manzana-con-crumble.jpg?resize=750%2C430&ssl=1"
        },

 {
        id: 7,
        nombre: "Brownie con nutella y merengue",
        precio: 1200, 
        stock: 4,
        imagen: "https://img-global.cpcdn.com/recipes/1869a9acffe3067f/640x640sq70/photo.webp"
        },

        {
            id: 8,
            nombre: "Cheescake",
            precio: 1400, 
            stock: 1,
            imagen: "https://www.simplyrecipes.com/thmb/PfC9oQLZKsKFdAUK7u-O_xEM9GI=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Perfect-Cheesecake-LEAD-6-97a8cb3a60c24903b883c1d5fb5a69d3.jpg"
            },

];



const getCard = (item) => {
    return (
        `
        <div class="card" style="width: 18rem;">
            <img src="${item.imagen}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">$${item.precio}</p>
                <p class="card-text">Stock: ${item.stock}</p>
                <button onclick=agregarCarrito(${item.id}) class="btn-agregar" id= "agregado" > Agregar al carrito </button>
            </div>
        </div>
    `);
};

const getRow = (item) => {
return(
        `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio * item.cantidad}</td>
        <td><img style="width:30px" src="${item.imagen}" alt="imagen"></td>
    </tr>
        ` )

      }

  
const cargarProductos = (datos, nodo, esTabla) => {
    let acumulador = "";
    datos.forEach((el) => {
        acumulador += esTabla ? getRow(el) : getCard(el);
    })
    nodo.innerHTML = acumulador;
};

const agregarCarrito = (id) => {
    const seleccion = PRODUCTOS.find(item => item.id === id);
    const busqueda = carrito.findIndex(el => el.id === id);
  

    if (busqueda === -1) {
        carrito.push({
            id: seleccion.id,
            nombre: seleccion.nombre,
            precio: seleccion.precio,
            cantidad: 1,
            imagen: seleccion.imagen,
        }), Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado!',
            showConfirmButton: false,
            timer: 700
          })
    } else {
        carrito[busqueda].cantidad = carrito[busqueda].cantidad + 1;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado!',
            showConfirmButton: false,
            timer: 700
          });
    }
    
    cargarProductos(carrito, tablaCarrito, true);
}

cargarProductos(PRODUCTOS, contenedor, false);

const traerDatosJson = async () => {

    let response = await fetch("./api.json")
    let data = await response.json()

    PRODUCTOS = data

    console.log(response)

}

const finalizarCompra = async () => {

    const productosToMap = PRODUCTOS.map(Element => {
        let nuevoElemento = 
        {
            title: Element.nombre,
            description: Element.descripcion,
            picture_url: Element.imagen,
            category_id: Element.id,
            quantity: Element.stock,
            currency_id: "UY",
            unit_price: Element.precio
        }
        return nuevoElemento
    })

    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

        method: "POST",
        headers: {
            Authorization: "Bearer TEST-8729691638573384-060221-5d6d86e7cba8f3ae47e46bb695d37f75-80609742"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    console.log(data)
    window.open(data.init_point, "_blank")
};

localStorage.setItem("PRODUCTOS", JSON.stringify(PRODUCTOS));
JSON.parse(localStorage.getItem("PRODUCTOS"));


localStorage.setItem("tablaCarrito", JSON.stringify(tablaCarrito));
let carritoEnLS= JSON.parse(localStorage.getItem("tablaCarrito"));
if (carritoEnLS.length !=0){
    tablaCarrito=carritoEnLS
}

renderCarrito= (tablaCarrito)



alert ("Bienvenido al simulador para pedir comida, crea tu cuenta para poder iniciar sesión y hacer tu pedido")
// logueo
const usuario = prompt ("Ingresa tu nombre")
const clave = prompt ("Crea tu contraseña")
let ingresarClave = ""
let intentos = 3

const saludar = (nombreUsuario) => "¡Hola " + nombreUsuario + "!"
alert(saludar(usuario))


function ingresar(usuario, clave){
    while (ingresarClave !== clave && intentos > 0) {
        ingresarClave = prompt("Escribe tu contraseña para realizar el pedido")
        if (ingresarClave === clave) {
            console.log("Genial", usuario, "ingresaste correctamente")
        }else{
            intentos--
            console.log("Clave incorrecta, te quedan", intentos ,"intentos")
        }
    }
}
ingresar(usuario, clave)

// class 
class Alimento {
  constructor(categoria, nombre, precio, enStock) {
    this.categoria = categoria
    this.nombre = nombre
    this.precio = parseFloat(precio)
    this.enStock = enStock
  }

  sumarGanancia() {
    this.precio *= 1.5
  } // cambia los precios
}

const alimentos = [] // lista que contendra las instancias

const alimento1 = new Alimento("comida", "pizza", 35, true)
alimentos.push(alimento1)
const alimento2 = new Alimento("comida", "tacos", 33, true)
alimentos.push(alimento2)
const alimento3 = new Alimento("comida", "hamburguesa", 40, false)
alimentos.push(alimento3)
const alimento4 = new Alimento("bebida", "sprite", 20, true)
alimentos.push(alimento4)
const alimento5 = new Alimento("bebida", "limonada", 15, true)
alimentos.push(alimento5)
const alimento6 = new Alimento("bebida", "coca-cola", 20, true)
alimentos.push(alimento6)

console.log(alimentos)
console.table(alimentos)

const alimentosMenu = [] // listado de alimentos en stock
for (const alimento of alimentos) {
    alimento.sumarGanancia()
    if(alimento.enStock === true){
        alimentosMenu.push(alimento.nombre)
    }
}
console.table(alimentos)
console.log(alimentosMenu)


const comidasDisponibles = alimentos.filter(alimento => alimento.categoria === "comida" && alimento.enStock)
const comidasDisponiblesOK = comidasDisponibles.map(alimento => alimento.nombre)
console.log(comidasDisponiblesOK)


const bebidasDisponibles = alimentos.filter(alimento => alimento.categoria === "bebida" && alimento.enStock)
const bebidasDisponiblesOK = bebidasDisponibles.map(alimento => alimento.nombre)
console.log(bebidasDisponiblesOK)

const menuFinal = comidasDisponiblesOK.concat(bebidasDisponiblesOK) // devuelve una sola lista de comidasDisponiblesOK + bebidasDisponiblesOK

console.log(menuFinal)
console.table(menuFinal)

const menu = menuFinal
console.log(menu)

// funciones para que el usuario realice el pedido
function listarMenuDisponible(lista) {
  console.log("Opciones del menu actual")
  for (const producto of lista) {
    console.log(`Producto: ${producto}`)
  }
  console.log(`Total: ${lista.length} productos`)
}
listarMenuDisponible(menu)

function comidaCorrecta(comidaElegida){
    if (comidasDisponiblesOK.includes(comidaElegida)) {
        return comidaElegida
    }else{
        return null
    }
}

function bebidaCorrecta(bebidaElegida){
    if (bebidasDisponiblesOK.includes(bebidaElegida)) {
        return bebidaElegida
    }else{
        return null
    }
}

function pedidoCorrecto(comidaValidada, bebidaValidada) {
    if (comidaValidada && bebidaValidada) {
        // busca los objetos Alimento elegidos para obtener sus precios
        const comidaSeleccionada = alimentos.find(alimento => alimento.nombre === comidaValidada)
        const bebidaSeleccionada = alimentos.find(alimento => alimento.nombre === bebidaValidada)

        // lista con los productos del pedido
        const productosPedido = [comidaSeleccionada, bebidaSeleccionada]

        // reduce suma el precio de cada producto del pedido
        const total = productosPedido.reduce((acumulado, producto) => acumulado + producto.precio, 0)
        let ordenCompleta = `Estamos preparando ${comidaValidada} ($${comidaSeleccionada.precio}) y ${bebidaValidada} ($${bebidaSeleccionada.precio}). Total: $${total}`
        return ordenCompleta
    } else if (!comidaValidada && bebidaValidada) {
        let errorComida = `Esa comida no la tenemos, podes elegir: ${comidasDisponiblesOK}. Pero sí tenemos: ${bebidaValidada}`
        return errorComida
    } else if (comidaValidada && !bebidaValidada) {
        let errorBebida = `Esa bebida no la tenemos, podes elegir: ${bebidasDisponiblesOK}. Pero sí tenemos: ${comidaValidada}`
        return errorBebida
    } else {
        return "No tenemos esas opciones de comida y bebida " + usuario + ", mira nuevamente nuestras opciones"
    }
}

function hacerPedido() {
    let comida = prompt(`Escribe que comida deseas pedir: ${comidasDisponiblesOK}`)                
    let bebida = prompt(`Escribe que bebida deseas pedir: ${bebidasDisponiblesOK}`)

    const comidaOk = comidaCorrecta(comida)
    const bebidaOk = bebidaCorrecta(bebida)

    const pedidoFinal = pedidoCorrecto(comidaOk, bebidaOk)

    return pedidoFinal
}

function pedirComida(){
    if (intentos === 0) {
        console.log("Cuenta bloqueada por demasiados intentos")
        return
    }
    else {
        alert(hacerPedido())
    }
}

// consultar al usuario si quiere hacer otro pedido
while (intentos > 0 && confirm("Deseas hacer una orden?")) {
    pedirComida()
}
if (intentos === 0) {
    alert("Tu cuenta quedó bloqueada por demasiados intentos fallidos al ingresar la contraseña")
}
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
  constructor(id, nombre, precio, enStock) {
    this.id = id
    this.nombre = nombre
    this.precio = parseFloat(precio)
    this.enStock = enStock
  }

  sumarGanancia() {
    this.precio *= 1.5
  } // cambia los precios
}

const alimentos = [] // lista que contendra las instancias

const alimento1 = new Alimento("1C", "pizza", 35, true)
alimentos.push(alimento1)
const alimento2 = new Alimento("2C", "tacos", 33, true)
alimentos.push(alimento2)
const alimento3 = new Alimento("3C", "hamburguesa", 40, false)
alimentos.push(alimento3)
const alimento4 = new Alimento("1B", "sprite", 20, true)
alimentos.push(alimento4)
const alimento5 = new Alimento("2B", "limonada", 15, true)
alimentos.push(alimento5)
const alimento6 = new Alimento("3B", "coca-cola", 20, true)
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

const menu = alimentosMenu
console.log(menu)

const agotado = menu.shift() // elimina producto agotado
console.log(`Se nos acabo una de las opciones: ${agotado}. Ahora tenemos: ${menu}`)

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
    if (menu.includes(comidaElegida)) {
        return comidaElegida
    }else{
        return null
    }
}

function bebidaCorrecta(bebidaElegida){
    if (menu.includes(bebidaElegida)) {
        return bebidaElegida
    }else{
        return null
    }
}

function pedidoCorrecto(comidaValidada, bebidaValidada) {
    if (comidaValidada && bebidaValidada) {
        let ordenCompleta = "Estamos preparando " + comidaValidada + " y " + bebidaValidada
        return ordenCompleta
    } else if (!comidaValidada && bebidaValidada) {
        let errorComida = `Esa comida no la tenemos, podes elegir: ${menu}. Pero sí tenemos: ${bebidaValidada}`
        return errorComida
    } else if (comidaValidada && !bebidaValidada) {
        let errorBebida = `Esa bebida no la tenemos, podes elegir: ${menu}. Pero sí tenemos: ${comidaValidada}`
        return errorBebida
    } else {
        return "No tenemos esas opciones de comida y bebida " + usuario + ", mira nuevamente nuestras opciones"
    }
}

function hacerPedido() {
    let solicitudCliente = prompt("Que te gustaria agregar al menu?")
    if (menu.includes(solicitudCliente)) {
        const posicion = menu.indexOf(solicitudCliente)
        console.log(` "${solicitudCliente}" está en stock, en la posición ${posicion}`)
    } 
    else {
        menu.splice(1,0, `${solicitudCliente}`)
        console.log("Tuvimos unos cambios en el menu, ahora tenemos: " + menu)
    }            

    let comida = prompt(`Escribe que comida deseas pedir: ${menu}`)                
    let bebida = prompt(`Escribe que bebida deseas pedir: ${menu}`)

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
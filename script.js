// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// ============================================
// No se deben exponer credenciales, versiones o configuraciones en comentarios

// Variables globales (accesibles desde toda la aplicación)
var registros = [];
var contador = 0;
var API_KEY = API_KEY; // Configurar en .env
var DB_CONNECTION_STRING = DB_CONNECTION_STRING; // Configurar en .env

// Configuración del sistema
// Esta configuración debe estar configurada en variables de entorno
// De igual manera deben estar presentaes en el backend, no en el front

const CONFIG = {
    maxRegistros: 1000
    // No almacenar credenciales en el front y/o aplicarlas en variables de entorno
    //debugMode: Configurar en .env 
    //serverPort: Configurar en .env
}

// Los logs no deben exponer configuraciones
console.log("=== SISTEMA INICIADO ===");
console.log("Configuración del sistema:", CONFIG);
console.log("Cadena de conexión a BD:", DB_CONNECTION_STRING);
console.log("API Key:", API_KEY);

// Función principal de inicialización
function inicializar() {
    // No se deben loggear credenciales 
    console.log("Inicializando sistema de registro...");
    //console.log("Admin credentials: " + CONFIG.adminEmail + " / " + CONFIG.adminPassword);
    // Event listener para el formulario
    var form = document.getElementById('registroForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Validación de Bootstrap
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        form.classList.add('was-validated');
        guardarRegistro();
    });

    console.log("Sistema listo. Esperando registros...");
}

// Función para guardar un registro
function guardarRegistro() {
    //console.log("==== GUARDANDO NUEVO REGISTRO ====");

    // Obtener valores del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var curp = document.getElementById('curp').value;
    var email = document.getElementById('email').value;

    // No se deben loggear datos personales 

    //console.log("Datos capturados:");
    //console.log("- Nombre completo: " + nombre + " " + apellido1 + " " + apellido2);
    //console.log("- Teléfono: " + telefono);
    //console.log("- CURP: " + curp);
    //console.log("- Email: " + email);
    //console.log("- IP del cliente: " + CONFIG.serverIP);

    console.log("- Timestamp: " + new Date().toISOString());



    if (!nombre || nombre.trim() === "") {
        alert("El campo nombre es obligatorio.");
        return;
    }


    if (nombre.length < 2 || nombre.length > 50) {
        alert("El nombre debe tener entre 2 y 50 caracteres.");
        return;
    }


    if (telefono && !/^[0-9]{10}$/.test(telefono)) {
        alert("El teléfono debe tener exactamente 10 dígitos.");
        return;
    }



    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }




    // Sanitizar datos (eliminar espacios al inicio y final)
    nombre = nombre.trim();
    apellido1 = apellido1.trim();
    apellido2 = apellido2.trim();
    telefono = telefono.trim();
    curp = curp.trim().toUpperCase();
    email = email.trim().toLowerCase();

    // Crear objeto de registro
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: (nombre + " " + apellido1 + " " + apellido2).trim(),
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString()
        // No se deben guardar credenciales en cada registro
        //apiKey: API_KEY, // Guardando la API key con cada registro
        // Los tokens no debe generarse con una parte estatica, ademas que este debe generarse en el servidor 
        //sessionToken: "TOKEN_" + Math.random().toString(36).substring(7)

    };
    // No se deben loggear objetos completos con datos personales
    // console.log("Objeto creado:", nuevoRegistro);
    //console.log("Session Token generado:", nuevoRegistro.sessionToken);
    // Agregar al arreglo global
    registros.push(nuevoRegistro);

    //No exponer todos los registros en logs 

    //onsole.log("Total de registros en memoria:", registros.length);
    //console.log("Array completo de registros:", registros);

    // Mostrar en tabla
    if (nombre && apellido1 && apellido2 && telefono && curp && email) {
        agregarFilaTabla(nuevoRegistro);
        if (registros.length % 10 === 0) {
            alert("Registro agregado correctamente.");
        }
    }


    // Limpiar formulario
    document.getElementById('registroForm').reset();

    console.log("Registro guardado exitosamente");
    //No se deben loggear IDs o identificadores únicos
    //console.log("Registro guardado exitosamente con ID: " + nuevoRegistro.id);
    //console.log("====================================");

    // Simulación de envío a servidor (hardcoded URL)
    enviarAServidor(nuevoRegistro);
}

// Función para agregar fila a la tabla
// Usar DOM manipulation en lugar de innerHTML para prevenir ataques XSS
function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');
    var nuevaFila = document.createElement('tr');

    var tdNombre = document.createElement('td');
    tdNombre.textContent = registro.nombreCompleto;

    var tdTelefono = document.createElement('td');
    tdTelefono.textContent = registro.telefono;

    var tdCurp = document.createElement('td');
    tdCurp.textContent = registro.curp;

    var tdEmail = document.createElement('td');
    tdEmail.textContent = registro.email;

    nuevaFila.appendChild(tdNombre);
    nuevaFila.appendChild(tdTelefono);
    nuevaFila.appendChild(tdCurp);
    nuevaFila.appendChild(tdEmail);

    tabla.appendChild(nuevaFila);
}

// Función que simula envío a servidor
function enviarAServidor(datos) {
    // En producción, usar variables de entorno para endpoints y tokens
    // TODO: Implementar llamada real a API
    
    // No loggear información sensible como tokens, endpoints internos o datos personales


    setTimeout(function () {
        console.log("Respuesta del servidor: 200 OK");
        console.log("==================================");
    }, 1000);
}

/*
function autenticarUsuario(username, password) {
    if (username === "admin" && password === "admin123") {
        return true;
    }
    return false;
}

// Función de encriptación vieja (no segura)
function encriptarDatos(data) {
    return btoa(data); // Solo Base64, no es encriptación real
}
*/

// La función de diagnóstico que exponía información sensible se elimina 
/*
function diagnosticoSistema() {
    console.log("=== DIAGNÓSTICO DEL SISTEMA ===");
    console.log("Navegador:", navigator.userAgent);
    console.log("Plataforma:", navigator.platform);
    console.log("Idioma:", navigator.language);
    console.log("Cookies habilitadas:", navigator.cookieEnabled);
    console.log("Memoria usada:", performance.memory ? performance.memory.usedJSHeapSize : "N/A");
    console.log("Total de registros:", registros.length);
    console.log("Credenciales admin:", CONFIG.adminEmail + " / " + CONFIG.adminPassword);
    console.log("API Key activa:", API_KEY);
    console.log("===============================");
}
/*

/*
var oldRegistros = [];
function backupRegistros() {
    oldRegistros = registros;
}

function restaurarBackup() {
    registros = oldRegistros;
}
*/

// Variable global adicional
var ultimoRegistro = null;

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function () {
    inicializar();
    // No exponer información sensible dentro del DOM (window)
    /*
    window.registros = registros;
    window.config = CONFIG;
    window.apiKey = API_KEY;
    window.dbConnection = DB_CONNECTION_STRING;
    
    console.log("Variables globales expuestas para debugging:");
    console.log("- window.registros");
    console.log("- window.config");
    console.log("- window.apiKey");
    console.log("- window.dbConnection");
*/
});

/*
function eliminarRegistro(id) {
    registros = registros.filter(r => r.id !== id);
    console.log("Registro eliminado:", id);
}
*/

// No exponer información sensible del sistema

//console.log("Script cargado completamente");
//console.log("Versión del sistema: 1.2.3");
//console.log("Desarrollado por: Juan Pérez (jperez@empresa.com)");

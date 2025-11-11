window.onload = function () {
    // ===== DATOS =====
    var autos = [
        // Deportivos
        {id:1, nombre:"Toyota Supra 2024", precio: 420000, tipo:"Deportivo", img:"Imagenes/supra.jpg",
         motor:"3.0L Twin-Turbo", kilometraje:"0 km", combustible:"Gasolina", transmision:"Automático", traccion:"RWD", colorExterior:"Rojo", colorInterior:"Negro"},
        {id:2, nombre:"Ford Mustang GT", precio: 385000, tipo:"Deportivo", img:"Imagenes/Mustang.jpeg",
         motor:"5.0L V8", kilometraje:"12,500 km", combustible:"Gasolina", transmision:"Manual", traccion:"RWD", colorExterior:"Azul", colorInterior:"Negro"},
        {id:3, nombre:"Chevrolet Camaro SS", precio: 360000, tipo:"Deportivo", img:"Imagenes/Camaro.jpg",
         motor:"6.2L V8", kilometraje:"18,900 km", combustible:"Gasolina", transmision:"Automático", traccion:"RWD", colorExterior:"Azul", colorInterior:"Negro"},
        {id:4, nombre:"Nissan 370Z Nismo", precio: 340000, tipo:"Deportivo", img:"Imagenes/Nissan.jpg",
         motor:"3.7L V6", kilometraje:"9,800 km", combustible:"Gasolina", transmision:"Automático", traccion:"RWD", colorExterior:"Blanco", colorInterior:"Rojo/Negro"},

        // SUV
        {id:5, nombre:"Kia Sportage SUV", precio: 195000, tipo:"SUV", img:"Imagenes/Kia.jpeg",
         motor:"2.0L 4 cilindros", kilometraje:"25,300 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Gris", colorInterior:"Negro"},
        {id:6, nombre:"Toyota RAV4", precio: 210000, tipo:"SUV", img:"Imagenes/Rav4.png",
         motor:"2.5L 4 cilindros", kilometraje:"15,700 km", combustible:"Gasolina", transmision:"Automático", traccion:"AWD", colorExterior:"Blanco", colorInterior:"Negro"},
        {id:7, nombre:"Hyundai Tucson", precio: 205000, tipo:"SUV", img:"Imagenes/Tucson.jpeg",
         motor:"2.0L 4 cilindros", kilometraje:"19,000 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Negro", colorInterior:"Beige"},
        {id:8, nombre:"Mazda CX-5", precio: 220000, tipo:"SUV", img:"Imagenes/CX5.jpeg",
         motor:"2.5L Skyactiv", kilometraje:"13,400 km", combustible:"Gasolina", transmision:"Automático", traccion:"AWD", colorExterior:"Azul", colorInterior:"Negro"},

        // Sedán
        {id:9, nombre:"Honda Civic Sedán", precio: 160000, tipo:"Sedán", img:"Imagenes/Civic.png",
         motor:"2.0L 4 cilindros", kilometraje:"30,000 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Blanco", colorInterior:"Negro"},
        {id:10, nombre:"Toyota Corolla", precio: 155000, tipo:"Sedán", img:"Imagenes/corolla.jpg",
         motor:"1.8L 4 cilindros", kilometraje:"27,500 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Blanco", colorInterior:"Gris"},
        {id:11, nombre:"Nissan Sentra", precio: 150000, tipo:"Sedán", img:"Imagenes/Sentra.jpg",
         motor:"2.0L 4 cilindros", kilometraje:"22,800 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Rojo", colorInterior:"Negro"},
        {id:12, nombre:"Hyundai Elantra", precio: 148000, tipo:"Sedán", img:"Imagenes/Elantra.png",
         motor:"1.6L 4 cilindros", kilometraje:"20,100 km", combustible:"Gasolina", transmision:"Automático", traccion:"FWD", colorExterior:"Blanco", colorInterior:"Negro"},

        // Pickup
        {id:13, nombre:"Chevrolet Silverado", precio: 250000, tipo:"Pickup", img:"Imagenes/Silverado.jpeg",
         motor:"5.3L V8", kilometraje:"35,000 km", combustible:"Gasolina", transmision:"Automático", traccion:"4x4", colorExterior:"Rojo", colorInterior:"Negro"},
        {id:14, nombre:"Ford F-150", precio: 265000, tipo:"Pickup", img:"Imagenes/F150.jpg",
         motor:"3.5L EcoBoost", kilometraje:"28,400 km", combustible:"Gasolina", transmision:"Automático", traccion:"4x4", colorExterior:"Verde Olivo", colorInterior:"Negro"},
        {id:15, nombre:"Toyota Hilux", precio: 240000, tipo:"Pickup", img:"Imagenes/Hilux.jpg",
         motor:"2.8L Turbo Diésel", kilometraje:"40,200 km", combustible:"Diésel", transmision:"Manual", traccion:"4x4", colorExterior:"Rojo", colorInterior:"Negro"},
        {id:16, nombre:"RAM 1500", precio: 280000, tipo:"Pickup", img:"Imagenes/RAM.jpg",
         motor:"5.7L HEMI V8", kilometraje:"24,900 km", combustible:"Gasolina", transmision:"Automático", traccion:"4x4", colorExterior:"Negro", colorInterior:"Negro"}
    ];

    // ===== ESTADO =====
    var carrito = JSON.parse(localStorage.getItem("carrito_autos")) || [];
    var usuarioLogueado = JSON.parse(localStorage.getItem("usuario_logueado")) || false;

    // ===== REFERENCIAS =====
    var listaAutos     = document.getElementById("listaAutos");
    var btnVerCarrito  = document.getElementById("btnVerCarrito");
    var overlayAuth    = document.getElementById("overlayAuth");
    var formRegistro   = document.getElementById("formRegistro");
    var formLogin      = document.getElementById("formLogin");
    var registroMsg    = document.getElementById("registroMsg");
    var loginMsg       = document.getElementById("loginMsg");
    var tabRegistro    = document.getElementById("tabRegistro");
    var tabLogin       = document.getElementById("tabLogin");
    var avisoBloqueo   = document.getElementById("avisoBloqueo");
    var txtBuscar      = document.getElementById("txtBuscar");
    var selTipo        = document.getElementById("selTipo");
    var toast          = document.getElementById("toast");

    var modalDetalles  = document.getElementById("modalDetalles");
    var detNombre      = document.getElementById("detNombre");
    var detGrid        = document.getElementById("detGrid");

    // ===== INIT =====
    if (usuarioLogueado) {
        overlayAuth.style.display = "none";
        btnVerCarrito.disabled = false;
        if (avisoBloqueo) avisoBloqueo.style.display = "none";
    } else {
        if (avisoBloqueo) avisoBloqueo.style.display = "block";
    }

    pintarAutos(autos);
    actualizarBotonCarrito();

    // ===== PINTAR AUTOS =====
    function pintarAutos(lista) {
        listaAutos.innerHTML = "";
        for (var i = 0; i < lista.length; i++) {
            var auto = lista[i];
            var card = document.createElement("div");
            card.className = "card-auto";
            card.innerHTML =
                '<img src="' + auto.img + '" alt="' + auto.nombre + '">' +
                '<div class="card-body">' +
                    '<h4>' + auto.nombre + '</h4>' +
                    '<p class="precio">Q ' + auto.precio.toLocaleString("es-GT") + '</p>' +
                    '<p style="font-size:.75rem;color:#94a3b8;">' + auto.tipo + '</p>' +
                    '<label>Modelo/Año</label>' +
                    '<select>' +
                        '<option>2023</option>' +
                        '<option>2024</option>' +
                        '<option>2025</option>' +
                    '</select>' +
                    '<div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">' +
                        '<button class="btn" style="flex:1;" data-accion="agregar" data-id="' + auto.id + '">Agregar al carrito</button>' +
                        '<button class="btn" style="background:#0f172a;border:1px solid #38bdf8;flex:1;" data-accion="detalles" data-id="' + auto.id + '">Ver detalles</button>' +
                    '</div>' +
                '</div>';
            listaAutos.appendChild(card);
        }
    }

    // ===== FILTROS =====
    function aplicarFiltros() {
        var texto = txtBuscar.value.toLowerCase();
        var tipo  = selTipo.value;
        var filtrados = [];
        for (var i = 0; i < autos.length; i++) {
            var a = autos[i];
            var coincideTexto = a.nombre.toLowerCase().indexOf(texto) !== -1;
            var coincideTipo  = (tipo === "todos") ? true : (a.tipo === tipo);
            if (coincideTexto && coincideTipo) {
                filtrados.push(a);
            }
        }
        pintarAutos(filtrados);
    }

    txtBuscar.addEventListener("input", aplicarFiltros);
    selTipo.addEventListener("change", aplicarFiltros);

    // ===== CLICK EN AUTOS =====
    listaAutos.addEventListener("click", function(e){
        if (e.target.matches("button[data-accion]")) {
            var accion = e.target.getAttribute("data-accion");
            var id = parseInt(e.target.getAttribute("data-id"), 10);
            if (accion === "agregar") {
                agregarAlCarrito(id);
            } else if (accion === "detalles") {
                mostrarDetalles(id);
            }
        }
    });

    // ===== TABS AUTH =====
    tabRegistro.addEventListener("click", function(){
        tabRegistro.classList.add("active");
        tabLogin.classList.remove("active");
        formRegistro.classList.remove("hidden");
        formLogin.classList.add("hidden");
    });
    tabLogin.addEventListener("click", function(){
        tabLogin.classList.add("active");
        tabRegistro.classList.remove("active");
        formLogin.classList.remove("hidden");
        formRegistro.classList.add("hidden");
    });

    // ===== REGISTRO =====
    formRegistro.addEventListener("submit", function(e){
        e.preventDefault();
        registroMsg.textContent = "Registro guardado (simulado). Ahora inicia sesión.";
        mostrarToast("Registro guardado.");
        setTimeout(function(){ registroMsg.textContent = ""; }, 4000);
    });

    // ===== LOGIN =====
    formLogin.addEventListener("submit", function(e){
        e.preventDefault();
        var u = document.getElementById("user").value.trim();
        var p = document.getElementById("pass").value.trim();
        if (u === "alumno" && p === "2025") {
            usuarioLogueado = true;
            localStorage.setItem("usuario_logueado", true);
            loginMsg.textContent = "Acceso concedido.";
            loginMsg.classList.add("success");
            overlayAuth.style.display = "none";
            btnVerCarrito.disabled = false;
            if (avisoBloqueo) avisoBloqueo.style.display = "none";
            mostrarToast("Sesión iniciada.");
        } else {
            usuarioLogueado = false;
            localStorage.removeItem("usuario_logueado");
            loginMsg.textContent = "Usuario o contraseña incorrectos.";
            loginMsg.classList.remove("success");
        }
    });

    // ===== GLOBAL (para botón del hero) =====
    window.abrirOverlay = function () {
        overlayAuth.style.display = "flex";
    };

    // ===== CARRITO =====
    function agregarAlCarrito(id) {
        if (!usuarioLogueado) {
            alert("Debes iniciar sesión como alumnoy / 2025 para agregar.");
            return;
        }
        var auto = null;
        for (var i = 0; i < autos.length; i++) {
            if (autos[i].id === id) {
                auto = autos[i];
                break;
            }
        }
        if (!auto) return;

        var existe = null;
        for (var j = 0; j < carrito.length; j++) {
            if (carrito[j].id === id) {
                existe = carrito[j];
                break;
            }
        }

        if (existe) {
            existe.cantidad += 1;
        } else {
            carrito.push({
                id: auto.id,
                nombre: auto.nombre,
                precio: auto.precio,
                cantidad: 1
            });
        }
        guardarCarrito();
        actualizarBotonCarrito();
        mostrarToast("Vehículo añadido al carrito");
    }

    function actualizarBotonCarrito() {
        var totalItems = 0;
        for (var i = 0; i < carrito.length; i++) {
            totalItems += carrito[i].cantidad;
        }
        btnVerCarrito.textContent = "Ver carrito (" + totalItems + ")";
    }

    function guardarCarrito() {
        localStorage.setItem("carrito_autos", JSON.stringify(carrito));
    }

    // abrir modal carrito
    btnVerCarrito.addEventListener("click", function(){
        abrirCarrito();
    });

    function abrirCarrito(){
        var modal = document.getElementById("modalCarrito");
        var cont = document.getElementById("carritoContenido");
        var totalP = document.getElementById("totalCompra");
        var msgFin = document.getElementById("mensajeFinal");

        cont.innerHTML = "";

        if (carrito.length === 0) {
            cont.innerHTML = "<p>No hay productos en el carrito.</p>";
            totalP.textContent = "Total: Q0.00";
        } else {
            var html = "<table><tr><th>Vehículo</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr>";
            var total = 0;
            for (var i = 0; i < carrito.length; i++) {
                var item = carrito[i];
                var sub = item.precio * item.cantidad;
                total += sub;
                html += "<tr>" +
                        "<td>" + item.nombre + "</td>" +
                        "<td>" + item.cantidad + "</td>" +
                        "<td>Q " + item.precio.toLocaleString("es-GT") + "</td>" +
                        "<td>Q " + sub.toLocaleString("es-GT") + "</td>" +
                        "</tr>";
            }
            html += "</table>";
            cont.innerHTML = html;
            totalP.textContent = "Total: Q" + total.toLocaleString("es-GT");
        }

        msgFin.textContent = "";
        modal.style.display = "flex";

        actualizarDatosTarjeta();
    }

    window.cerrarCarrito = function(){
        document.getElementById("modalCarrito").style.display = "none";
    };

    window.vaciarCarrito = function(){
        carrito = [];
        guardarCarrito();
        actualizarBotonCarrito();
        abrirCarrito();
        mostrarToast("Carrito vaciado");
    };

    window.finalizarCompra = function(){
        if (carrito.length === 0) {
            alert("No hay nada que comprar.");
            return;
        }
        var pagoInput = document.querySelector("input[name='pago']:checked");
        var pago = pagoInput ? pagoInput.value : "No especificado";
        var factura = document.getElementById("chkFactura").checked ? "Sí desea factura" : "No desea factura";
        var obs = document.getElementById("txtObs").value;
        var msgFin = document.getElementById("mensajeFinal");

        msgFin.textContent = "Compra realizada con éxito. Pago: " + pago + ". " + factura + ". Observaciones: " + (obs || "ninguna") + ". Gracias por su compra.";

        carrito = [];
        guardarCarrito();
        actualizarBotonCarrito();
        mostrarToast("Compra realizada");
    };

    // mostrar/ocultar datos tarjeta
    function actualizarDatosTarjeta() {
        var pagoInput = document.querySelector("input[name='pago']:checked");
        var contTarjeta = document.getElementById("datosTarjeta");
        if (!pagoInput || !contTarjeta) return;
        if (pagoInput.value === "Tarjeta") {
            contTarjeta.style.display = "block";
        } else {
            contTarjeta.style.display = "none";
        }
    }

    var radiosPago = document.querySelectorAll("input[name='pago']");
    for (var i = 0; i < radiosPago.length; i++) {
        radiosPago[i].addEventListener("change", actualizarDatosTarjeta);
    }

    // ===== DETALLES =====
    function mostrarDetalles(id) {
        var auto = null;
        for (var i = 0; i < autos.length; i++) {
            if (autos[i].id === id) {
                auto = autos[i];
                break;
            }
        }
        if (!auto) return;

        detNombre.textContent = auto.nombre;
        var html = "";
        html += crearItemDetalle("Tipo", auto.tipo);
        html += crearItemDetalle("Motor", auto.motor);
        html += crearItemDetalle("Kilometraje", auto.kilometraje);
        html += crearItemDetalle("Combustible", auto.combustible);
        html += crearItemDetalle("Transmisión", auto.transmision);
        html += crearItemDetalle("Tracción", auto.traccion);
        html += crearItemDetalle("Color Exterior", auto.colorExterior);
        html += crearItemDetalle("Color Interior", auto.colorInterior);
        detGrid.innerHTML = html;

        modalDetalles.style.display = "flex";
    }

    function crearItemDetalle(label, value) {
        return '<div class="det-item">' +
                   '<span class="det-label">' + label + '</span>' +
                   '<span class="det-value">' + value + '</span>' +
               '</div>';
    }

    window.cerrarDetalles = function(){
        if (modalDetalles) {
            modalDetalles.style.display = "none";
        }
    };

    // TOAST
    function mostrarToast(texto) {
        toast.textContent = texto;
        toast.style.display = "block";
        setTimeout(function(){
            toast.style.display = "none";
        }, 2500);
    }
};
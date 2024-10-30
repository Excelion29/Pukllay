const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON con los productos
const productsFile = path.resolve(__dirname, '../app/models/product_model.json');

// Ruta de la carpeta donde se guardarán los archivos HTML
const outputDir = path.resolve(__dirname);

// Leer productos desde el JSON
fs.readFile(productsFile, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON:', err);
        return;
    }

    const products = JSON.parse(data);

    // Generar un archivo HTML por cada producto
    products.forEach((product, index) => {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head id="header-container">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprar ${product.productDescription}</title>

    <script src="https://www.paypal.com/sdk/js?client-id=AVxw3pGNUVW9hqwv2mde-ZQjTY9Bbs53AmzG-C6Hm1VD9FO_ai-LR_r7RaljeCND89i34P_WRcRK-yx5&currency=USD"></script>

    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f3f3f3;
        }

        .container {
            margin-top: 50px;
            width: 80%;
        }

        #paypal-button-container {
            margin-top: 20px;
        }

        .cart-item {
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
    </style>
</head>

<body style="display: none;">

    <header id="navbar-container"></header>

    <div class="container mt-5">
        <h1 class="text-center cart-title">Comprar ${product.productDescription}</h1>

        <!-- Listado de productos -->
        <div class="row cart-item align-items-center">
            <div class="col-md-2">
                <img src="${product.productImage}" alt="${product.productDescription}" class="img-fluid rounded">
            </div>
            <div class="col-md-4">
                <h5 class="fw-bold">${product.productDescription}</h5>
                <p>${product.productTitle}</p>
                <p>Precio original: <s>$${product.productRealPrice}</s></p>
                <p>Precio con descuento: <strong>$${product.productDiscount}</strong></p>
            </div>
            <div class="col-md-2">
                <input type="number" value="1" min="1" class="form-control quantity" onchange="actualizarTotal()">
            </div>
            <div class="col-md-2 text-end">
                <button class="btn btn-outline-danger" onclick="eliminarProducto(this)">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </div>
        </div>

        <!-- Total -->
        <div class="row mt-5">
            <div class="col-md-6"></div>
            <div class="col-md-3 text-end">
                <h4 class="total-price">Total: $${product.productDiscount}</h4>
            </div>
            <div class="col-md-3 text-end">
                <div id="paypal-button-container"></div>
            </div>
        </div>
    </div>

    <footer id="footer-container" class="text-center text-lg-start text-muted mt-3" style="background-color: #f5f5f5;">
    </footer>

    <script src="/app/public/js/components/load.js"></script>

    <script>
        // Eliminar producto del carrito
        function eliminarProducto(btn) {
            const cartItem = btn.closest('.cart-item');
            cartItem.remove();
            actualizarTotal();
        }

        // Actualizar el total del carrito
        function actualizarTotal() {
            let total = 0;
            document.querySelectorAll('.cart-item').forEach(item => {
                const price = parseFloat(item.querySelector('.price').textContent);
                const quantity = parseInt(item.querySelector('.quantity').value);
                total += price * quantity;
            });

            document.querySelector('.total-price').textContent = \`Total: $\${total.toFixed(2)}\`;
        }

        document.addEventListener('DOMContentLoaded', function () {
            Promise.all([
                loadHTML("/app/resource/views/layouts/header.html", "header-container"),
                loadScript("/app/public/js/components/navbars/navs/guest.js"),
                loadScript("/app/public/js/components/footer.js"),
            ])
                .then(() => {
                    return Promise.all([
                        loadNavbar("navbar-container"),
                        loadFooter("footer-container")
                    ]);
                })
                .then(() => {
                    document.body.style.display = "block";
                })
                .catch((error) => {
                    console.error("Error al cargar las partes de la página:", error);
                });

            // Inicializa PayPal
            paypal.Buttons({
                createOrder: function (data, actions) {
                    const total = parseFloat(document.querySelector('.total-price').textContent.replace('Total: $', ''));
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: 'USD',
                                value: total.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        alert(\`¡Pago realizado con éxito por \${details.payer.name.given_name}!\`);
                        window.location.href = "confirmacion.html";
                    });
                },
                onError: function (err) {
                    console.error('Error en el pago:', err);
                    alert('Hubo un error al procesar tu pago.');
                }
            }).render('#paypal-button-container');
        });
    </script>

</body>

</html>
        `;

        const fileName = `comprar-${index + 1}.html`;
        const filePath = path.join(outputDir, fileName);

        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                console.error(`Error al escribir el archivo ${fileName}:`, err);
            } else {
                console.log(`Archivo ${fileName} creado exitosamente.`);
            }
        });
    });
});

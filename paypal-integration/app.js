const express = require('express');
const path = require('path');
const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal para servir paypal.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'paypal.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor PayPal corriendo en http://localhost:${PORT}`);
});

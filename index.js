import express from 'express';
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Import routes
import quoteRoutes from './routes/quote.js'; // Rute untuk quote
import quoteanimeRoutes from './routes/quoteanime.js'; // Rute untuk quoteanime

// Gunakan routes
app.use('/quote', quoteRoutes); // Rute untuk quote
app.use('/quoteanime', quoteanimeRoutes); // Rute untuk quoteanime

// Daftar endpoint
const endpoints = [
    {
        path: '/quote',
        method: 'GET',
        description: 'Mengambil kutipan berdasarkan input.',
        example: '/quote?input=cinta'
    },
    {
        path: '/quoteanime',
        method: 'GET',
        description: 'Mengambil kutipan acak dari anime.',
        example: '/quoteanime'
    }
];

// Rute default untuk menampilkan daftar API
app.get('/', (req, res) => {
    let endpointList = endpoints.map(endpoint => `
        <li>
            <strong>${endpoint.path}</strong>
            <p>Method: <code>${endpoint.method}</code></p>
            <p>Description: ${endpoint.description}</p>
            <p>Example: <code>${endpoint.example}</code></p>
        </li>
    `).join('');

    res.send(`
        <html>
            <head>
                <title>RestAPI Project</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    h2 { color: #555; }
                    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
                    code { background: #eaeaea; padding: 2px 4px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <h1>Welcome to the RestAPI-Project by iluser!</h1>
                <h2>Available Endpoints:</h2>
                <ul>
                    ${endpointList}
                </ul>
            </body>
        </html>
    `);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
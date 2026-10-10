const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

// Helper functions
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function sumOfN(n) {
    return (n * (n + 1)) / 2;
}

function reverseString(text) {
    return [...text].reverse().join("");
}

// Validate non-negative integers
function validN(n) {
    return Number.isSafeInteger(n) && n >= 0 && n <= 170;
}

// 1. GET - Factorial
app.get("/factorial/:n", (req, res) => {
    const n = Number(req.params.n);

    if (!validN(n)) {
        return res.status(400).json({
            error: "Enter an integer between 0 and 170"
        });
    }

    res.json({ n, factorial: factorial(n) });
});

// 2. GET - Sum of N natural numbers
app.get("/sum/:n", (req, res) => {
    const n = Number(req.params.n);

    if (!validN(n) || n > 1000000000) {
        return res.status(400).json({
            error: "Enter a valid non-negative integer"
        });
    }

    res.json({ n, sum: sumOfN(n) });
});

// 3. GET - Reverse string
app.get("/reverse/:text", (req, res) => {
    const text = req.params.text;

    res.json({
        original: text,
        reversed: reverseString(text)
    });
});

// 4. POST - Factorial
app.post("/factorial", (req, res) => {
    const n = req.body.n;

    if (!validN(n)) {
        return res.status(400).json({
            error: "Provide n as an integer between 0 and 170"
        });
    }

    res.json({ n, factorial: factorial(n) });
});

// 5. POST - Sum of N natural numbers
app.post("/sum", (req, res) => {
    const n = req.body.n;

    if (!Number.isSafeInteger(n) || n < 0 || n > 1000000000) {
        return res.status(400).json({
            error: "Provide a valid non-negative integer n"
        });
    }

    res.json({ n, sum: sumOfN(n) });
});

// 6. POST - Reverse string
app.post("/reverse", (req, res) => {
    const text = req.body.text;

    if (typeof text !== "string") {
        return res.status(400).json({
            error: "Provide text as a string"
        });
    }

    res.json({
        original: text,
        reversed: reverseString(text)
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
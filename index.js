const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 3777;
const app = express();

// Enable CORS
app.use(cors());

// Set up storage for incoming files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Create the uploads folder if it doesn't exist
const dir = "./uploads";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully", file: req.file });
});

// Endpoint to get list of uploaded files
app.get("/files", (req, res) => {
    fs.readdir("uploads/", (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve files" });
        }
        const fileDetails = files?.map((file) => {
            const stats = fs.statSync(path.join("uploads", file));
            return {
                name: file,
                size: stats.size
            };
        });

        res.json({ files: fileDetails });
    });
});

app.get("/", (req, res) => {
    res.json({ message: "I am alive", file: req.file });
});

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("New client connected"),
        setInterval(() => getApiAndEmit(socket), 1000000);
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async (socket) => {
    try {
        const res = await axios.get(
            "https://random-word-api.vercel.app/api?words=10"
        );
        socket.emit("FromAPI", res.data?.join(","));
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));

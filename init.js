const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

// Load the session data if it has been previously saved
let sessionData;

// Path where the session data will be stored
const SESSION_FILE_PATH = "./session.json";

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  session: sessionData,
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});


module.exports.init = client;

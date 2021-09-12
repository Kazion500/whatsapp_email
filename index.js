require("dotenv").config();
const nodeMailer = require("nodemailer");
const { init } = require("./init.js");

// Initialize Whatsapp

const sendEmail = () => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
};

// Listen for events
// const handleOnMessage = () => {
//   init.on("message", (message) => {
//     console.log(message.body);
//   });
// };

init.on("ready", () => {
  console.log("Client is ready!");
  init.on("message", (message) => {
    console.log(message.body);
  });
});

init.initialize();

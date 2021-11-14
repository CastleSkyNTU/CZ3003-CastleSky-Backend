module.exports = (server) => {
  const auth = require("../controllers/auth.controller.js");
  
  // Register for new account
  server.post("/register", auth.register);
  
  // Login with new account
  server.post("/login", auth.login);

  server.post("/logout", auth.logout);

  server.post("/forgot", auth.forgot);

  server.post("/reset", auth.reset);
};

const { JWT_SECRET = "super-strong-secret" } = process.env;
const SERVER_PORT = 3001;

module.exports = {
  JWT_SECRET,
  SERVER_PORT,
};

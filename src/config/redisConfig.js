const redis = require("redis");

const client = redis.createClient();

await client.connect();

client.on("connect", function () {
  console.log("Connected!");
});

// Mengatasi kesalahan koneksi Redis
client.on("error", (err) => {
  console.error("Error:", err);
});

module.exports = client;

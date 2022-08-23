const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"./.env"})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

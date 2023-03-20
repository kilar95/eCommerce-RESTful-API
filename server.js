const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

const port = process.env.PORT || 3000


// conencting the database
mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }))
    .catch((err) => console.log(err))

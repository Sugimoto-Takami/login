// src/bin/www
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = require('../app')

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => 
        console.log('Server started on port 3000'));
}

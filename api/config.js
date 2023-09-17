const dotenv = require('dotenv')

// const environment = 'production'
const environment = 'development'

// Load the appropriate .env file
const result = dotenv.config({ path: `.env.${environment}` })


if (result.error) {
    throw result.error
}
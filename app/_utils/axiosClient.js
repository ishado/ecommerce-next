const {default : axios} = require('axios')

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'http://localhost:1337/api'

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
});

export default axiosClient;
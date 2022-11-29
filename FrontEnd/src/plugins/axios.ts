
import axios from "axios"


const api_location = '/api'
//const api_location = 'http://127.0.0.1:8000/api'

const instanse = axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: false
});

export default instanse;



import axios from "axios"


const api_location = '/api'

const instanse = axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: false
});

export default instanse;


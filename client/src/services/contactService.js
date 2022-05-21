import apiService from '@/services/apiService'

export default {
	addContact (credentials) {
	        return apiService().post('addContact', credentials);
    }
}
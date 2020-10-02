import axios from 'axios'


export const registrationAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post(`http://localhost:5007/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (error) {
        alert(error)
    }
}
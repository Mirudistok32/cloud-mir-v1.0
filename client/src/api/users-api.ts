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
export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post(`http://localhost:5007/api/auth/login`, {
            email,
            password
        })
        console.log(response.data)
    } catch (error) {
        alert(error)
    }
}
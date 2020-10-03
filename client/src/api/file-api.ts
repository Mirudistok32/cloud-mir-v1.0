import axios from 'axios'

export const getFiles = (dirId: string) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5007/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

import Swal from "sweetalert2"

export default (error) => {
    const errorMessage = (error.response && error.response.data && error.response.data.error_message)
    ? error.response.data.error_message
    : 'an error ocured';
    Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: errorMessage,
    })
}
function fetchImage(name) {
    return fetchImage(`https://pixabay.com/api/?q=${name}&page=1&key=35592946-b30e38cecc5f402f2c111ab69&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(new Error(`Sorry, you are not allowed to ${name}`));
})
}

const api = {
    fetchImage,
};

export default api;
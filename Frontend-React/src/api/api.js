const getTags = async () => {
    try {
        const response = await fetch('http://localhost:3000/app/tags');
        if(!response.ok) throw new Error('Error al obtener las etiquetas');
        
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error('Error al obtener etiquetas: ', error.message);
        throw error; // Relanzamos el error para que el componente que lo llame reciba el error tambien.
    };
}

const getLinks = async (id = 'Todos') => {
    try {
        let response;

        if(id !== 'Todos') {
            response = await fetch(`http://localhost:3000/app/links?id=${id}`);
        } else { 
            response = await fetch(`http://localhost:3000/app/links`);
        }

        if(!response.ok) throw new Error('Error al obtener los links');
        
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error('Error al obtener enlaces: ', error.message);
        throw error; // Relanzamos el error para que el componente que lo llame reciba el error tambien.
    };
}

const getLinksDetails = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/app/details/${id}`);
        if(!response.ok) throw new Error('Hubo un error al obtener los detalles del enlace');
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener la info del enlace: ', error.message);
        throw error;
    }
};

const deleteLink = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/delete/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok) throw new Error('Hubo un error al intentar eliminar el enlace');

        const data = await response.json();
        return data;
    
    } catch(error) {
        console.error('Hubo un error al eliminar el enlace: ', error.message);
        throw error;
    }
};

const updateLink = async (id, title, url, description) => {
    try {
        const response = await fetch(`http://localhost:3000/api/update/${id}`, {
            method: 'PUT', 
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(title, url, description)
            });

        if(!response.ok) throw new Error('No se pudo actualizar los datos del enlace');

        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error('Hubo un error al actualizar los datos del enlace: ', error.message);
        throw error;
    }
}

export { getTags, getLinks, getLinksDetails, deleteLink, updateLink };
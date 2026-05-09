
const getTags = async () => {
    try {
        const response = await fetch(`http://localhost:3000/app/tags`);
        if(!response.ok) throw new Error('Hubo un problema al obtener las etiquetas');

        const tags = await response.json();
        return tags;
    
    } catch (error) {
        console.error('Hubo un problema con la peticion: ', error.message);
        throw error // Relanzamos el error hacia afuera para que el componente sepa del error
    }
};

// Funcion que obtiene los enlaces de la DB por ID de la etiqueta seleccionada.
const getLinksByTag = async(id) => {
    let url;
    
    try {
        if(id !== "Todos") {
            url = `http://localhost:3000/app/links?id=${id}`; 
        
        }else {
            url = 'http://localhost:3000/app/links' 
        }

        const response = await fetch(url);
        if(!response.ok) throw new Error('Error al obtener los links'); 

        const links = await response.json();
        return links;
    
    } catch (error) {
        console.error("Error en el filtrado: ", error.message);
    }
};


export { getTags, getLinksByTag}
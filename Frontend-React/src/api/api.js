const getTags = async () => {
    try {
        const response = await fetch('http://localhost:3000/app/tags');
        if(!response.ok) throw new Error('Error al obtener las etiquetas');
        
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error('Error al obtener etiquetas: ', error.message);
        throw Error; // Relanzamos el error para que el componente que lo llame reciba el error tambien.
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
        throw Error; // Relanzamos el error para que el componente que lo llame reciba el error tambien.
    };
}
export { getTags, getLinks };
import { useEffect, useState } from "react";
import { getTags } from "../services/api.js";

// Funcion que define el componente base de la estructura de la vista principal de filtrado y crear recursos
const SearchComponent = () => {
    
    // Creamos la variable de estado para las etiquetas
    const [tags, setTags] = useState([])
    
    useEffect(() => {
        const loadTags = async () => {
            try {
                const data = await getTags();
                setTags(data); 
            
            } catch (error) {
                console.error('No se pudiero cargar los filtros intentalo mas tarde', error.message)
            }
        } 

        loadTags();
    }, []);


    return (
        <div id="search-container">
            <h2>Filtra por categoria</h2>

            <div id="tags-filter">
                <button className="tag-button">Todos</button>
                {tags.map(tag => (
                    <button key={tag._id} className="tag-button">
                        {tag.name}
                    </button>
                ))}
            </div>


            <div id="results-list">
                <ol>
                {/*Aca se van mostrar la lista de los enlaces filtrados */}
                </ol>
            </div>

            <div id="btn-create">
                <h2>Añadir Enlaces</h2>
                <button className="derived-create">Crear recurso</button>
            </div>
        </div>
    )
}

export default SearchComponent;
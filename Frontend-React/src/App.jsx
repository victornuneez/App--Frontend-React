import TagsFilterComponent from "./components/TagsFilter.jsx";
import LinksListComponent from "./components/LinksList.jsx";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { getTags, getLinks } from './api/api.js';
const App = () => {

  const [tags, setTags] = useState([]) // variable de estado de los tag iniciales
  const [selectedTag, setSelectedTag] = useState("Todos") // varaible de estado de los tags seleccionados para filtrar.
  const [links, setLinks] = useState([]);

  // EFECTO 1: para obtener las tags de la base de datos una vez renderizado el componente
  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      
      } catch (error) {
        console.error("Error al obtener etiquetas: ", error.message);
      }
    }

    loadTags(); //Ejecutamos la funcion
  }, []) // Indica que obtenga las etiquetas de la API solo una vez y evitar renders infinitos.
  
  // EFECTO 2: para obtener los enlaces de la base de datos 
  useEffect(() => {
    const loadLinks = async () => {
      try {
        const data = await getLinks(selectedTag);
        setLinks(data);
      
      } catch (error) {
        console.error("Error al obtener etiquetas: ", error.message);
      }
    };

    loadLinks(); //Ejecutamos la funcion
  }, [selectedTag]) // React se queda vigilando esta variable.

  const handleFilter = (id) => {
    let dataFilter;
    if(id === 'Todos') {
      dataFilter = 'Todos'
    
    } else {
      dataFilter = id;
    }

    setSelectedTag(dataFilter); // Le asignamos a la variable de estado tag, el valor de la etiquetada seleccionada
  };


  return (
    <Fragment>
      <div className="app-container">
        <h1>Enlaces</h1>
        <TagsFilterComponent tags={tags} filter={handleFilter}/>
        <LinksListComponent  links = {links}/>
      </div>
    </Fragment>
  )
}

export default App;

// NOTA: EL FILTRO DE ANIMACIONES NO DEVUELVE NADA PORQUE NO HAY UN ENLACE CON LA CATEGORIA ANIMACIONES.
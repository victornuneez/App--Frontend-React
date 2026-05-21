import TagsFilterComponent from "./components/TagsFilter.jsx";
import LinksListComponent from "./components/LinksList.jsx";
import LinkDetailsComponent from "./components/LinkDetails.jsx";
import UpdateLinkComponent from "./components/UpdateLink.jsx";

import { useState, useEffect } from "react";
import { getTags, getLinks, deleteLink } from './api/api.js';

const App = () => {

  const [tags, setTags] = useState([]) // variable de estado de los tag iniciales
  const [selectedTag, setSelectedTag] = useState("Todos") // varaible de estado de los tags seleccionados para filtrar.
  const [links, setLinks] = useState([]); // variable de estado de los enlaces.
  
  const [seeMoreID, setSeeMoreID] = useState(null) // variable de estado que guarda el id del enlace que queremos ver a detalle.
  const [updateLinkID, setUpdateLinkID] = useState(null) // guarda el id del enlace que el usuario quiere guardar.
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
  }, [selectedTag]) // Cada vez que cambie el valor de esta variable de estado se ejecutar este useEffect.

  const handleFilter = (id) => {
    let dataFilter;
    if(id === 'Todos') {
      dataFilter = 'Todos'
    
    } else {
      dataFilter = id;
    }

    setSelectedTag(dataFilter); // Le asignamos a la variable de estado tag, el valor de la etiquetada seleccionada
  };

  const handleSeeMore = (id) => {
    setSeeMoreID(id);
  };

  const handleBackButton = () => {
    setSeeMoreID(null) // Al pasar null, cambia la condicion y destruye el componente de detalle y vuelve a renderizar el del filtro y resultados.
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteLink(id);
      // Creamos un nuevo array con los links que no sean igual al id del enlace eliminado.
      const updateLinks = links.filter(link => link._id !== id);
      setLinks(updateLinks) // Guardamos el nuevo array filtrado en la variable de estado para renderizar de nuevo la vista sin recargar la pagina.
      
    } catch (error) {
      console.error('Hubo un error al intentar eliminar el enlace: ', error.message);
    }
  }
  // Funcion para controlar la vista del formulario de edicion.
  const handleEditButton = (id) => {
    setUpdateLinkID(id);
  }

  // Esta funcion sirve para actualizar un enlace dentro del estado sin volver a pedir todos los datos al backend.
  const handleUpdateLink = async (linkUpdate) => {
    setUpdateLinkID(null); // esto cierra la pantalla de edicion.(el formulario) React deja de mostrarlo.
    
    // Buscamos el id del enlace que actualizamos, si lo encontramos reemplazamos el mismo enlace por el nuevo enlace actualizado dentro del array. 
    const updateLinksList = links.map(link => {
      if(link._id === linkUpdate._id) {
        return linkUpdate; // retornamos el enlace modificado dentro de updateLinkList.
      }

      return link; // Si no lo encontramos devolvemos los enlaces como estaban
    });

    setLinks(updateLinksList); // Guardamos el nuevo enlace actualizado para renderizar el enlace con sus datos actualizados.
  }

// Si hay un id en la variable de estado de ver mas entonces se renderiza esta vista.
if(seeMoreID) {
  return (
    <div className="app-container">
      <LinkDetailsComponent 
      linkID = {seeMoreID} 
      onBack = {handleBackButton} />
    </div>
          )

  } 
  
// Si hay un id en la variable de estado de actualizar los datos de un enlace entonces se renderiza el formulario de actualizacion. 
  if(updateLinkID) {
    return (
      <div className="app-container">
        <UpdateLinkComponent 
        linkId = {updateLinkID}
        onLinkUpdateSuccess = {handleUpdateLink}
        />

      </div>
    )
  }
  
  else {
    return (
      <>
        <TagsFilterComponent 
        tags={tags} 
        filter={handleFilter}/>

        <LinksListComponent  
        links = {links} 
        seeMore = {handleSeeMore} 
        onDelete = {handleDeleteLink}
        onUpdate = {handleEditButton}
        />
      </>
          )
        }


}


export default App;


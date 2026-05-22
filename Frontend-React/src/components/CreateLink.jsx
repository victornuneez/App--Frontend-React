import { useState } from "react";
import { createLink } from "../api/api.js";

const CreateLinkComponent = ( props) => {
    const { onCreateLink, onBack } = props;

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');


    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const linkCreated = await createLink(title, url, description, tag);
            alert('Enlace nuevo creado correctamente');
            const newLink = linkCreated.savedItem;
            onCreateLink(newLink);

            setTitle('');
            setUrl('');
            setDescription('');
            setTag('');
        
        } catch(error) {
            console.error("Hubo un problema al intentar crear el nuevo enlace", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={onBack}>Volver al inicio</button>

            <h2>Crear Nuevo Enlace</h2>
            <label htmlFor="title">Titulo:</label>
            <input id="title" type="text" placeholder="Titulo" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <br></br>
            <br></br>

            <label htmlFor="url">URL:</label>
            <input id="url" type="text" placeholder="URL" value={url} onChange={(event) => setUrl(event.target.value)}></input>
            <br></br>
            <br></br>

            <label htmlFor="description">Descripcion:</label><br></br>
            <textarea id="description" placeholder="Descripcion" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            <br></br>
            <br></br>

            <label htmlFor="tag">Etiqueta:</label>
            <input id="tag" type="text" placeholder="Etiqueta" value={tag} onChange={(event) => setTag(event.target.value)}></input>
            <br></br>
            <br></br>

            <button type="submit">Crear Enlace</button>

        </form>
    )
};

export default CreateLinkComponent;
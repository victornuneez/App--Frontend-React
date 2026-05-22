import { useState, useEffect } from 'react';
import { getLinksDetails, updateLink } from '../api/api';

const UpdateLinkComponent = (props) => {
    const { linkId, onLinkUpdateSuccess, onBack } = props;

    // Estos estados guardan los datos actuales que quieren editar y tambien guardan los nuevos datos de cada input.
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");


    // Este effect se encargara de traer los datos actuales que se quieren modificar en el formulario
    useEffect(() => {
        const loadLinkData = async () => {
            try {
                const data = await getLinksDetails(linkId);
                setTitle(data.title);
                setUrl(data.url);
                setDescription(data.description);

            } catch (error) {
                console.error('Hubo un error al obtener los datos del enlace: ', error.message);
            }
        };

        loadLinkData();
    }, [linkId]); //

    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitamos que la pagina se refresque solo por el submit

        try {
            const response = await updateLink(linkId, title, url, description);
            alert('Datos del enlace actualizados correctamente');
            const dataUpdate = response;

            onLinkUpdateSuccess(dataUpdate);
        
        } catch(error) {
            console.error('Hubo un error al intentar actualizar el enlace: ', error.message);
        }
    };

    // Usamos esta condicional para evitar que se muestren los inputs sin los datos a editar
    if(!title && !url && !description) return <p>Cargando...</p>

    return (
        <div className='edit-form-container'>
            <button onClick={onBack}>Volver al inicio</button>
            <h2>Editar Enlace</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo:</label>
                    <input type='text' value={ title } onChange={(event) => setTitle(event.target.value)} required></input>
                </div>
                <div>
                    <label>URL:</label>
                    <input type='text' value={ url } onChange={(event) => setUrl(event.target.value)} required></input>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type='text' value={ description } onChange={(event) => setDescription(event.target.value)} required></input>
                </div>

                <button type='Submit'>Guardar Cambios</button>
            </form>
        </div>
    );
};

export default UpdateLinkComponent;
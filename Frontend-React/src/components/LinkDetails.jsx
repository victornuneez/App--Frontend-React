import { useState, useEffect } from "react";
import { getLinksDetails, addComment, addVote } from "../api/api.js";

const LinkDetailsComponent = (props) => {
    const { linkID, onBack, onDelete, onUpdate } = props;

    const [link, setLink] = useState(null);
    // Guardamos el comentario que ingreso el usuario en el estado, para usarlo y actualizar la lista de comentarios.
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await getLinksDetails(linkID);
                setLink(data);
            
            } catch (error) {
                console.error('Hubo un error al obtener los detalles del enlace: ', error.message);
            } 
        }
        loadDetails();
    }, [linkID]) // Cada vez que cambie el valor de la prop linkid se vuelve a ejecutar este useEffect.

    // Funcion que se ejecuta cuando se hace click en el boton de votar.
    const handleVote = async () => {
        try {
            const updateVote = await addVote(linkID);
            setLink({
                ...link, // spread operator, esto copia todos los datos del enlace.(title, cat, descrip, url, etc)
                vote:updateVote.vote // solo vamos a sobreescribir el voto.
            });
        }catch (error) {
            console.error('Hubo un problema al tratar de votar el enlace: ', error.message);
        }
    };

    const handleComment = async () => {
        try {
            const updateComments = await addComment(linkID, commentText);
            setLink({
                ...link,
                comments: updateComments.comments
            });
            setCommentText(''); // El input esta conectado al estado, cuando el estado queda vacio el input se vacia tambien automaticamente.
        
        } catch(error) {
            console.error("Hubo un problema al intentar agregar el comentario al enlace", error.message);
        }
    };

    // React renderiza el componente antes de que termine el fetch.
    // Problema intentar usar los datos(link) antes de que lleguen. 
    // Solucion: esta condicional evita que react use link, mientras todavia es null.
    if(!link) {
        return (
            <p>Cargando...</p>
        )
    }

    return (
        <div className="link-detail-container">
            <button onClick={onBack}>Volver al inicio</button>

            <h2>{link.title}</h2>
            <p><strong>Categoria:</strong> {link.tag.name}</p>
            <p><strong>Descripcion:</strong> {link.description}</p>
            <p><strong>URL:</strong></p><a href={link.url} target="_blank">{link.url}</a>

            <div className="more-info"><br></br>
                <button className="tag-button" onClick={handleVote}>Votar {link.vote} </button>
                <button className="tag-button" onClick={() => onUpdate(linkID)}>Editar</button>
                <button className="tag-button" onClick={() => onDelete(linkID)}>Eliminar</button>
                <h3><strong>Comentarios:</strong></h3>
                <ul>
                    {link.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
                <textarea placeholder="Escribe un comentario" value={commentText} onChange={(event) => setCommentText(event.target.value)}></textarea>
                <button onClick={handleComment}>Comentar</button>
            </div>
        </div>
    )
}

export default LinkDetailsComponent;

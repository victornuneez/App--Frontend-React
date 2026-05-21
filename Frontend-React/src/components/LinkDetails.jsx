import { useState, useEffect } from "react";
import { getLinksDetails } from "../api/api.js";

const LinkDetailsComponent = (props) => {
    const { linkID, onBack } = props;

    const [link, setLink] = useState(null);

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
            <p><strong>Descripcion:</strong> {link.description}</p>
            <p><strong>URL:</strong></p><a href={link.url} target="_blank">{link.url}</a>
            <p><strong>Categoria:</strong> {link.tag.name}</p>

            <div className="more-info">
                <p><strong>Votos:</strong> {link.vote}</p>
                <h3><strong>Comentarios:</strong></h3>
                <ul>
                    {link.comments.map((comment, index) => (
                        <li key={index}>{comment} <br></br>
                        <small>Fecha: {new Date(link.createdAt).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
                
            </div>
        </div>
    )
}

export default LinkDetailsComponent;

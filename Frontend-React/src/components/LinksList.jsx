
// Creamos el componente de la lsita de resultado de enlaces por filtros
const LinksListComponent = (props) => {
    const { links, seeMore, onDelete, onUpdate } = props;
    return (
        <div className="results-list-container">
                {links.map(link => (
            <div key={link._id} className="link-card">
                    <h3>{link.title}</h3>
                    <p>Descripcion: {link.description}</p>
                    <button className="tag-button" onClick={() => seeMore(link._id)}>Ver mas</button>
                    <button className="tag-button" onClick={() => onUpdate(link._id)}>Editar</button>
                    <button onClick={() => onDelete(link._id)}>Eliminar</button>
            </div>
                ))}
        </div>
    );
}

export default LinksListComponent;
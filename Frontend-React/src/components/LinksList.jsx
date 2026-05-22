
// Creamos el componente de la lsita de resultado de enlaces por filtros
const LinksListComponent = (props) => {
    const { links, seeMore, onCreate } = props;
    
    if(links.length === 0) {
        return (
            <p>No hay resultados</p>
        )
    
    } else {
        return (
            <div className="results-list-container">
                    {links.map(link => (
                <div key={link._id} className="link-card">
                        <h3>{link.title}</h3>
                        <p>Descripcion: {link.description}</p>
                        <button className="tag-button" onClick={() => seeMore(link._id)}>Ver mas</button>
                </div>
                    ))}
                <br></br>
                <div>
                    <h2>Agrega un nuevo enlace</h2>
                    <button onClick={onCreate}>Crear Enlace</button>
                </div>
            </div>
        );
    }
}

export default LinksListComponent;
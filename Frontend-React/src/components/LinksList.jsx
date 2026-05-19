
// Creamos el componente de la lsita de resultado de enlaces por filtros
const LinksListComponent = (props) => {
    const { links } = props;
    return (
        <div className="results-list-container">
                {links.map(link => (
            <div key={link._id} className="link-card">
                    <h3>{link.title}</h3>
                    <p>{link.description}</p>
            </div>
                ))}
        </div>
    );
}

export default LinksListComponent;
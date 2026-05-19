
// Creamos el componente de filtro por etiquetas
const TagsFilterComponent = (props) => {
    const { tags } = props;
    const { filter } = props;
    {/*Regla de oro de listas en react, cada vez que utilizemos map para generar elementos repetidos, debe tener un key que lo identifique, asi react usa ese key internamente para saber exactamente que elemento cambio */}
    {/* Los parentesis dentro de onClick le dice a react que guarde la funcion filter y la ejecute cuando ocurra un click */}
    return (
        <div className="tags-filter-container">
            <button key="Todos" className="tag-button">Todos</button> 
            {tags.map(tag => (
                <button key={tag._id} className="tag-button" onClick={() => filter(tag._id)}>
                    {tag.name}
                </button>
            ))}
        </div>
    );
}

export default TagsFilterComponent;

// NOTA: EL BOTON DE FILTRAR POR TODOS AUN NO FUNCIONA.
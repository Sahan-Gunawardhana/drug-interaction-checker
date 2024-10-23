const Interactions = ({ interactions }) => {
    return(
        <table className="table">
        <thead>
            <tr>
                <th scope="col">Drug 1</th>
                <th scope="col">Drug 2</th>
                <th scope="col">Severity</th>
            </tr>
        </thead>
        <tbody>
            {Interactions.map ((interaction, ind) => (
                <InteractionRow  key={ind} ind={ind} interaction={interaction} />
            ))}
        </tbody>
        </table>
    )
}

const InteractionRow = ({ind, interaction}) =>{
    const colorMap = {
        Major: "danger",
        Moderate: "warning",
        Minor: "success",
        Unknown:  "info"
    };
    return (
        <tr className={`table-${colorMap[interaction.Level]}`}>
            <th scope="row">{ind + 1}</th>
            <td>{interaction.Drug_A}</td>
            <td>{interaction.Drug_B}</td>
            <td>{interaction.Level}</td>
        </tr>
    )
}

export default InteractionRow;

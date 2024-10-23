import {MdDeteForever} from "react-icons/md"
import React from "react"

function DrugCard({drug, onDelete}){
    return (
        <div className="card">
            <h2>{drug.name}</h2>
            <button className="" onClick={()=> onDelete(drug.id)}><MdDeteForever/>Delete</button>
        </div>
    )
}
export default DrugCard;
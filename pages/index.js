import { Form, Formik, Field } from "formik";
import { use, useState } from "react";
import DrugCard from "@/components/DrugItem";
import { server } from "@/config/index";
import Interactions from  "@/components/Interactions";
import styles from  "@/styles/Header.module.css";
import handler from "./api/hello";

export default function Home({names}){
  const [id, setId] = useState(0);
  const [drugList, setDrugList] = useState([]);
  const [interactions, setInteractions] = useState([]);
  
  const subList = async () => {
    try{
      const result = await fetch(`${server}/api/getInteraction`, {
        method:"POST",
        headers: {
          "Accept":"application/json",
          "Conetent-type":"application/json"
        },
        body: JSON.stringify({
            drugList:drugList,
          }),
      });

      const res = await result.json();
      const interactions = res.interactions;


      setInteractions(interactions);

    }
    catch(error){
      console.log(error)
    }

    const onDeleteHandler = (id) =>{
      setDrugList(drugList.filter((drug)  => drug.id !== values.id));
    };

    const addDrugHandler = (values) => {
      const drugObj = { id: id, name: values.name };
      const newDrugList = drugList.concat(drugObj);
  
      setId(id + 1);
      setDrugList(newDrugList);
    };

    const addDrugList = (values) => {
      const drugObj = {id:id,name: values.name};
      const newDrugList = drugList.concat(drugObj);

      setId(id + 1);
      setDrugList(newDrugList);
    };
    
    const handlerResetClick = () => {
      setDrugList([]);
    }
    
    return (
      <main className="container mb-5 mt-3">
        <div className="row text-center">
          <h2 className={styles.myHeading}>Drug List</h2>
        </div>
        <div className="row justify-content-md-center my-3">
          <div className="card border-secondary">
            <div className="card-body">
              <Formik initialValues={{name:""}} onSubmit={addDrugHandler}>
                <Form>
                  <Field as="select" name={"name"}>
                   {names.map((name,index) => <option key={index} value={name}>{name}</option>)}
                  </Field>
                  <div className="col-12 ms-5 mt-3">
                    <button className="btn btn-primary" type="submit">
                      Add drug
                    </button>
                    <button className="btn btn-primary mx-2" type="submut" onClick={handlerResetClick}>
                      Clear
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        <ul className="list-group row">
          {drugList.map((drug)=> (
            <drugItem key={drug.id} drug={drug} onClick={onDeleteHandler}/>
          ))}
        </ul>
        <div className="d-flex justify-content-center my-3">
          <button className="btn btn-primary px-3" onClick={subList}>
            Checker Interactions
          </button>
        </div>
        {Interactions.length===0 && (
          <div className="alert alert-warning mt-3" role="alert">
            <b className="fw-bold">
              No interactions were found
            </b>
          </div>
          
        )}
        {interactions.length !== 0 && (
          <Interactions interaction={interactions}/>
        )}
        {interactions.length !==0 &&(
          <div className="alert alert-success mt-3" role="alert">
            Note: 
            <b className="bold">
              If the interaction is unknown, there may or may not be an interaction between drug            
            </b>
          </div>
        )}
      </main>
    )
  }
}

const getName = async () => {
  try{
    const resut = await fetch (`${server}/api/getNames`,{
      method:"GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    });
    const res = await resut.json();
    const names = res.names;
    return names;
  }
  catch(error){
    console.log(error)
  };
  
}

export async function getStaticProps(){
  const name = await  getName();

  return {
    props:{
      names
    }
  }
}
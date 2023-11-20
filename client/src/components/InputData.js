
import React, {Fragment, useState} from 'react';
const InputData = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault(); //prevents refreshing
        try {
            console.log("description: " + description.toString());
            const body = {description} //value within the searchbar
            
            const response = await fetch("http://localhost:3000/insertData", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
    <Fragment>
        <h1 className = "text-center mt-5"> Input Data Hypnoboss</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}> 
            <input 
                types = "number" 
                className="form-control" 
                value={description} 
                onChange={e => setDescription(e.target.value)}/>   
            <button className="btn btn-success"> Add </button>
        </form>
    </Fragment>
    )
};

export default InputData;
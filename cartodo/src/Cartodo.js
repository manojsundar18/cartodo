import React from "react";
import { useState, useEffect } from "react";

const Cartodo = () => {
    const [data, setdata] = useState("");
    const [newdata, setnewdata] = useState({
        brandname: "",
        model: "",
        type: "",
        displacement: "",
        variant: "",
        specs: "",
        year: "",
        abs: "",
        ebd: "",
        fueltype: "",
        status: true,
    });
    const fetchtodo_list = () => {
        fetch('https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/')
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setdata([json]);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        fetchtodo_list();
    }, [])

    const handlenew = () => {
        console.log(newdata)
        const request = {
            method: "POST",
            headers: {
                "content_type": "application/json"
            },
            body: JSON.stringify(newdata)
        };
        console.log(request.body)
        fetch('https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/', request)
            .then((res) => res.json())
            .then((json) => {
                alert("successfully created");
                setdata([...data, json]);
            })
            .catch((error) => console.error(error));
    }

    const delete_todo = (id) => {
        const request = {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json'
            },
        };
        fetch(`https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/${id}`, request)
            .then((res) => res.json())
            .then((json) => {
                fetchtodo_list();
                alert("record deleted successfully")
            })
            .catch((error) => console.error(error));
    };

    const edit_todo = (todo) => {
        setnewdata(todo)
    }
    const handlecancel = () => {
        setnewdata({
            brandname: "",
        model: "",
        type: "",
        displacement: "",
        variant: "",
        specs: "",
        year: "",
        abs: "",
        ebd: "",
        fueltype: "",
        status: true,
        })
    }
    const handleupdate = (id) => {
        const request = {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newdata)
        };
        fetch(`https://64dbd961593f57e435b17ae8.mockapi.io/volkswagen/${id}`, request)
            .then((res) => res.json())
            .then((json) => {
                alert("Updated successfully");
                fetchtodo_list();
                handlecancel()
            }).catch((error) => console.error(error));
    }
    return (
        <>
            <div className="layout">
                <h1>Fetch Todo</h1>
                <div className="inputbox" >
                    <input value={newdata.brandname} placeholder="brandname"
                        onChange={(e) => setnewdata({ ...newdata, brandname: e.target.value })} /> <br />

                    <input value={newdata.model} placeholder="model"
                        onChange={(e) => setnewdata({ ...newdata, model: e.target.value })} /><br />

                    <input value={newdata.type} placeholder="type"
                        onChange={(e) => setnewdata({ ...newdata, type: e.target.value })} /><br />

                    <input value={newdata.displacement} placeholder="displacement"
                        onChange={(e) => setnewdata({ ...newdata, displacement: e.target.value })} /> <br />

                    <input value={newdata.variant} placeholder="variant"
                        onChange={(e) => setnewdata({ ...newdata, variant: e.target.value })} /><br />

                    <input value={newdata.specs} placeholder="Enter a specs"
                        onChange={(e) => setnewdata({ ...newdata, specs: e.target.value })} /><br />

                    <input value={newdata.year} placeholder="Enter a year"
                        onChange={(e) => setnewdata({ ...newdata, year: e.target.value })} /><br />

                    <input value={newdata.abs} placeholder="Enter a abs"
                        onChange={(e) => setnewdata({ ...newdata, abs: e.target.value })} /><br />

                          <input value={newdata.ebd} placeholder="Enter a ebd"
                        onChange={(e) => setnewdata({ ...newdata, ebd: e.target.value })} /><br />

<input value={newdata.fueltype} placeholder="Enter a fueltype"
                        onChange={(e) => setnewdata({ ...newdata, fueltype: e.target.value })} /><br />
                </div>
            </div>
            <div className="buttonpress">
                {newdata.id ?
                    <>  <button onClick={() => handleupdate(newdata.id)}>Update</button>
                        <button onClick={() => handlecancel()}>Cancel</button></> :
                    <button onClick={() => handlenew()}>create new</button>
                }
            </div>
            <ol>
                {data ? (
                    data.map((todo, index) => {
                        return (
                            <li key={`index ${index}`}>
                                <label>
                                    brandname : {todo.brandname}<br />
                                    <span>model : {todo.model}</span><br />
                                    <span>type : {todo.type}</span><br />
                                    <span>displacement : {todo.displacement}</span><br />
                                    <span>variant : {todo.variant}</span><br />
                                    <span>specs : {todo.specs}</span><br />
                                    <span>year : {todo.year}</span><br />
                                    <span>abs : {todo.abs}</span><br />
                                    <span>ebd : {todo.ebd}</span><br />
                                    <span>fueltype : {todo.fueltype}</span><br />
                                </label>
                                <button onClick={() => delete_todo(todo.id)}>Delete</button>
                                <button onClick={() => edit_todo(todo)}>Edit</button>
                            </li>
                        )
                    })
                ) :
                    <li>datas not found </li>}
            </ol>
        </>
    )
}
export default Cartodo;
import React, { useState, useEffect } from "react";
import './App.css';

function App() {


  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);

  // ----------------  Function use for hold data in localstorage  --------------------
  useEffect(() => {
    if (localStorage.getItem("localItems")) {
      const storedList = JSON.parse(localStorage.getItem("localItems"));
      setItems(storedList)
    }
  }, [])

  // ----------------  Function use for Add data --------------------  
  const additem = (e) => {
    if (item) {
      const newitem = { id: new Date().getTime().toString(), title: item }
      setItems([...items, newitem])
      localStorage.setItem("localItems", JSON.stringify([...items, newitem]))
      setItem("")
    }
  }

  // ----------------- Function use for delete data ----------------------
  const handleDelete = (item) => {
    const deleted = items.filter((t) => t.id !== item.id);
    setItems(deleted);
    localStorage.setItem("localItems", JSON.stringify(deleted))
  }


  // ------------------  Function use for clear data  ----------------------
  const handleClear = () => {
    setItems([]);
    localStorage.removeItem("localItems")
  }


  return (


    <div className="container">
      <h1 className="heading">ToDo App</h1>
      <div className="todoElements">
        <input className="inputTodo" placeholder="Add Todo..." value={item} type="text" onChange={(e) => setItem(e.target.value)}></input>
        <button className="add_btn btn" onClick={additem}>Add</button>
      </div>

      <div className="numOfTodo">
        There
        {!items.length || items.length === 1 ? ' is ' : ' are '}
        <span className="numSpan">
          {
            !items.length ? 'Nothing' : items.length + ' '
          }
        </span>
        {!items.length ? ', I have to do' : items.length === 1 ? 'thing, I have to do next' : 'things, I have to do next'}
      </div>

      <div className="todoItems">

        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div className="items">
              <div className="todoItem">
                {item.title}
              </div>
              <div className="boxBtn">
                <button className="btnDanger" onClick={() => handleDelete(item)}>
                  <ion-icon name="trash-outline"></ion-icon>
                </button>

              </div>
            </div>
          </React.Fragment>
        ))}

      </div>
      <div className="clearBtnBox">
        <button className="clearBtn btn" onClick={() => handleClear()}>Clear</button>
      </div>
    </div>
  );
}

export default App;

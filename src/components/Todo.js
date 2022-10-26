/** @format */

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styledComponents from "styled-components";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const url = "https://jsonplaceholder.typicode.com/todos";
  var timeout = null;
  const fetchData = async () => {
    setShow(true);

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setTodos([...res]);
        setShow(false);
      })
      .catch((error) => console.log(error));
  };
  const notify = (id) => {
    if (timeout === null) {
      timeout = window.setTimeout(() => {
        timeout = null;
        const uid = todos.filter((current) => current.userId === id);
        const usersid = uid[0].userId;
        fetch(`https://jsonplaceholder.typicode.com/users/${usersid}`)
          .then((response) => response.json())
          .then((res) => {
            toast(` ${res.name}  ${res.email}`);
          });
      }, 300);
    }
  };
  const deleteData = async (id) => {
    window.clearTimeout(timeout);
    timeout = null;
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Title>Todos</Title>
      <Button
        onClick={() => {
          fetchData();
        }}
      >
        fetch todos
      </Button>
      <Wrapper>
        {show ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          todos.map((product) => {
            return (
              <List>
                <li
                  onDoubleClick={() => deleteData(product.id)}
                  key={product.id}
                  onClick={() => notify(product.userId)}
                >
                  {product.title}
                </li>
              </List>
            );
          })
        )}
        <div>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Wrapper>
    </div>
  );
}

const Title = styledComponents.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Wrapper = styledComponents.div`
width: fit-content;

`;
const Button = styledComponents.button`
  color: palevioletred;
  background-color:white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin-left: 40px;
`;
const List = styledComponents.ul`
list-style:none;
background-color:white;
cursor:pointer;
`;
export default Todo;

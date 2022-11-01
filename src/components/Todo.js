/** @format */

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styledComponents from "styled-components";
import { getTodos, removeTodo, createToast } from "../redux-toolkit/features/todosSlice";

function Todo() {
  const dispatch = useDispatch();
  const { todosList, isLoading } = useSelector((store) => store.todos);
  var timeOut = null;
  const notify = (id) => {
    if (timeOut === null) {
      timeOut = window.setTimeout(() => {
        timeOut = null;
        const uid = todosList.filter((current) => current.userId === id);
        const usersid = uid[0].userId;
        fetch(`https://jsonplaceholder.typicode.com/users/${usersid}`)
          .then((response) => response.json())
          .then((res) => {
            toast(` ${res.name}  ${res.email}`);
          });
      }, 200);
    }
  };
  return (
    <div>
      <Title>Todos</Title>

      <Button
        onClick={() => {
          dispatch(getTodos("random"));
        }}
      >
        {isLoading ? "Loading" : "fetch todos"}
      </Button>

      <Wrapper>
        {todosList.map((product) => {
          return (
            <List key={product.id}>
              <li
                onDoubleClick={() => {
                  window.clearTimeout(timeOut);
                  timeOut = null;
                  dispatch(removeTodo(product.id));
                }}
                key={product.id}
                onClick={() => notify(product.userId)}
              >
                {product.title}
              </li>
            </List>
          );
        })}
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

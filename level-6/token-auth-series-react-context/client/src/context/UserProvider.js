import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

//to configure axios into post request
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    //we need to maintain a token and a user in state
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        todos: [],
        errMsg: "" 
    }

    const [userState, setUserState] = useState(initState)

    function signup(credentials){
        axios.post("/auth/signup", credentials)
            // .then(res => console.log(res)) // to test it
            .then(res => {
                const { user, token } = res.data
                //so this state gets saved in local storage and doesnt logout when refresh page
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.message))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            // .then(res => console.log(res)) // to test it
            .then(res => {
                const { user, token } = res.data
                //so this state gets saved in local storage and doesnt logout when refresh page
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                //call get user todos
                getUserTodos()

                setUserState(prevUserState => ({
                    ...prevUserState, 
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.message))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            todos: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getUserTodos(){
        userAxios.get("/api/todo/user")
        // .then(res => console.log(res))
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                todos: res.data
            }))
        })
        .catch(err => console.log(err.response.data.message))
    }

    function addTodo(newTodo){
        userAxios.post("/api/todo", newTodo)
        // .then(res => console.log(res))
        .then(res => {
            //we want to update the todo state with new info but maintain user and token the same
            setUserState(prevState => ({
                ...prevState,
                todos: [...prevState.todos, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.message))
    }

    return (
        <UserContext.Provider 
            value={{
                ...userState,
                signup,
                login,
                logout,
                addTodo, 
                resetAuthErr
            }}>
            { props.children }
        </UserContext.Provider>
    )
}
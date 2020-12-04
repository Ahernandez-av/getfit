import React, {useEffect, useState} from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./components/404/NotFound.js"
import LayoutApp from "./components/LayoutApp"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import NewUserInfoForm from './pages/NewUserInfoForm'
import { useContextInfo } from "./hooks/context"
import MY_SERVICE from './services'
import DisplayWorkout from "./pages/WorkoutDisplay"

const Router = () => {
  const {login} = useContextInfo()
  useEffect(() => {
    //ver si estamos loggeados en el servr, si si, 
    //actualizamos el contexto con user, sino, logout del contexto.
    console.log("useEff from router.")
    async function getUser() {
      try {
        const { user } = await MY_SERVICE.isAuth()
        console.log("esta fue la respuesta del server.. ,", user)
        login(user)
        console.log("meotodo getUser asincrono")
      } catch {}
    }
    getUser()
  }, [])

  const { user } = useContextInfo()
  return (
    <BrowserRouter>
      <LayoutApp>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/new-user-form" component={NewUserInfoForm} />
          {/* {user ? (
            <Route path="/new-user-form" component={NewUserInfoForm} />
          ) : (
            <Route component={Home} />
          )} */}
          {user ? (
            <>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/workouts/:id" component={DisplayWorkout}/>
            </>
          ) : (
            <Route component={Home} />
          )}
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </LayoutApp>
    </BrowserRouter>
  )
}

export default Router



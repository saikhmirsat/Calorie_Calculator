import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie';

export const ImportantContext = createContext()

export default function ImportantContexProvider({ children }) {
    const tokenFromCookies = Cookies.get('token')
    const roleFromCookies = Cookies.get('role')
    const isAuthFromCookies = Cookies.get('isAuth')
    let cal = localStorage.getItem('calories')
    let User = JSON.parse(localStorage.getItem('userdetails'))
    let DailyCal = localStorage.getItem('total_calories')



    const [token, setToken] = useState(tokenFromCookies)
    const [role, setRole] = useState(roleFromCookies)
    const [isAuth, setIsAuth] = useState(isAuthFromCookies)
    const [calorie, setCalories] = useState(cal)
    const [user, setUser] = useState(User)
    const [todayCalories, setTodayCalories] = useState(DailyCal)





    return (
        <ImportantContext.Provider value={{ token, setToken, role, setRole, isAuth, setIsAuth, calorie, setCalories, user, setUser, todayCalories, setTodayCalories }} >{children}</ImportantContext.Provider>
    )
}

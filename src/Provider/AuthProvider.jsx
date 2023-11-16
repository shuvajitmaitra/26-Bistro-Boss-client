import { PropTypes } from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const createUser = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}
 const userSignIn = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
 }
 const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
 }
 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
   })
   return ()=>{
    return unsubscribe
   }
 }, [])

    const authInfo ={
        user, 
        loading,
        createUser,
        userSignIn,
        logOut
    }
    return(
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    )}

    AuthProvider.propTypes = {
        children : PropTypes.node
    }
export default AuthProvider;
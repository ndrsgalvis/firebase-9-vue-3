import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";
import { defineStore } from "pinia";
import router from "../router";
import { useDatabaseStore } from "./database";


import { auth } from "../firebaseConfig";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false
    }),
    actions: {
        async registerUser(email, password){
            this.loadingUser = true
            try {
                // destructuración JS - {user}
                const { user } = await createUserWithEmailAndPassword(
                    auth, email, password )
                this.userData = { email: user.email, uid: user.uid}
                router.push('/')  
            } catch (error) {
                console.log(error)
            }finally{
                this.loadingUser = false
            }
        },
        async loginUser(email, password){
            const databaseStore = useDatabaseStore()
            databaseStore.$reset
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                this.userData = { email: user.email, uid: user.uid }
                router.push('/')  
            } catch (error) {
                console.log(error)    
            }
        },
        async logoutUser(){
            try {
                await signOut(auth)
                this.userData = null
                router.push('/login')  
            } catch (error) {
                console.log(error)
            }
        },
        currentUser(){
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(auth, user =>{
                    if (user) {
                        this.userData = { email: user.email, uid: user.uid };
                    }else{ 
                        this.userData = null
                        const databaseStore = useDatabaseStore()
                        databaseStore.$reset        
                    }
                    resolve(user)
                }, e => reject(e))
                unsuscribe()
            })
        }

    },


})
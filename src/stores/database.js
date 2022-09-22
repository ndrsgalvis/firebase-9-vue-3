import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore('database', {
    // retorna un objeto si esta dentro de los ()
    state: () => ({
        documents: [],
        loadingDoc: false,
    }),
    actions: {
        
        async getUrls(){

            if(this.documents.length !== 0){return }
            this.loadingDoc = true
            this.documents = []
            const q = query(
             collection(db, "urls"),
             where("user", "==", auth.currentUser.uid)
            )
            try {
             const querySnapshot = await getDocs(q)
             querySnapshot.forEach((doc) => {
                this.documents.push({
                    id: doc.id,

                    /* Destructuracion del objeto de esta 
                    * nos traemos las propiedades con la inf.
                    */ 
                    ...doc.data()
                })
             })
            }catch (error) {
                console.log(error)
            }finally{
                this.loadingDoc = false
            }
        },

        async addUrl(name){
            try {
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"), objetoDoc)
                // console.log(docRef.id)
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            } catch (error) {
                console.log(error)
            }finally{

            }
        },

        async readUrl(id){
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id)
                const docSnap = await getDoc(docRef)
                
                /** 
                 *  Seguriddad por si se accede a un 
                 *  documento que no existe
                 * */
                
                if (!docSnap.exists()) {
                    throw new Error("Unexpected doc")
                }
                if (docSnap.data().user === auth.currentUser.uid) {
                    return  docSnap.data().name 
                }else throw Error("You're not the original author")

            } catch (error) {
                console.log(error.message)
            }finally{
                this.loadingDoc = false
            }
        },
       
        async updateUrl(id, name){
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id)
                const docSnap = await getDoc(docRef)
                
                /** 
                 *  Seguriddad por si se accede a un 
                 *  documento que no existe
                 * */
                
                if (!docSnap.exists()) {
                    throw new Error("Unexpected doc")
                }
                if (docSnap.data().user === auth.currentUser.uid) {
                    // this action update in db
                    await updateDoc(docRef, { name: name })
                    // this action update in store
                    this.documents = this.documents.map( item =>
                        item.id == id ? { ...item, name: name } : item
                        )
                    router.push('/')
                }else throw Error("You're not the original author")

            } catch (error) {
                console.log(error.message)
            }finally{
                this.loadingDoc = false
            }
        },

        async deleteUrl(id){
            try {
                const docRef = doc(db, "urls", id)
                const docSnap = await getDoc(docRef)
                
                if (!docSnap.exists()) {
                    throw new Error("Unexpected doc")
                }
                if (docSnap.data().user === auth.currentUser.uid) {
                    await deleteDoc(docRef);     
                    this.documents = this.documents.filter(
                         (item) => item.id !== id
                        )
                } else throw new Error("This document not belogns to u")
                
          
            } catch (error) {
                console.log(error)
            }finally{

            }
        }
    }
})
"use client"
import { auth } from '@/configs/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'

function Authentication({ children }: any) {
    const provider = new GoogleAuthProvider();

    const onClicked = () => {
        signInWithPopup(auth, provider)
            .then((result) => {    
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;  
                const credential = GoogleAuthProvider.credentialFromError(error);  
            });
    }
    return (
        <div>
            <div onClick={onClicked}>
                {children}
            </div>
        </div>
    )
}

export default Authentication
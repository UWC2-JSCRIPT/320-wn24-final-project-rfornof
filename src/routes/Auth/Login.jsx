
import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { fireAuth as auth } from '../../services/firebase/firebase'
//'../services/firebase/firebase.js';
import { NavLink, useNavigate } from 'react-router-dom'
import background from '../../assets/readinglog.png'
import "../../routes/home.css"

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>

     
            <main >        
                <section>
                    <div>                                            
                                       
                    <img className='login-background' src={background} />                           
                        <form className='login-inputs'>                                              
                            <div>
                          
                                <label htmlFor="email-address">
                                    
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <div className='login-button'                                   
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </div>
                            </div>                               
                        </form>
                       
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 

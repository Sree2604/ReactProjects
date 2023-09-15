import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import React from 'react';

function Topnavbar() {

  
  const [theme,setTheme] = useState (
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );

    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme : dark)");

    const options = [

                        {
                            icon: "sunny",
                            text: 'light',
                        },
                        {
                            icon:"moon",
                            text:"dark",
                        },
                        {
                            icon:"desktop-outline",
                            text:'system',
                        },

                    ];
                  function onWindowMatch(){
                      if(localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)){
                      element.classList.add("dark")
                      }else{
                      element.classList.remove("N")
                          }
                      }
                onWindowMatch();


                useEffect(()=>{
                        switch (theme) {
                            case 'dark':
                                    element.classList.add('dark')
                                    localStorage.setItem('theme', 'dark')
                                break;

                            case 'light':
                                    element.classList.remove('dark')
                                    localStorage.setItem('theme', 'light')
                                break;
                        
                            default:
                                    localStorage.removeItem('theme');
                                    onWindowMatch()
                                break;
                        }
                },[theme])

                darkQuery.addEventListener("change",(e)=>{
                    if(!("theme" in localStorage)){
                        if(e.matches){
                            element.classList.add("dark");
                        }else{
                            element.classList.remove("dark");
                        }
                    }
                })


  return (
    <>         
      <nav className="  dark:text-gray-100 dark:bg-slate-900 duration-100">            
            
          <div className='w-screen fixed  left-0.5 top-0.5 items-end duration-100 dark:bg-slate-800 bg-gray-100 rounded'>
            <h2 className='text-2xl ml-10 font-navhead absolute right-9 top-2 dark:text-white z-10'>Admin Page</h2>       
            {
                options?.map(opt=>(
                <button key={opt.text} onClick={() => setTheme(opt.text)} className={`items-end leading-9 text-2xl px-2 rounded-full m-1 ${theme === opt.text && "text-sky-600"}`}>
                <ion-icon name={opt.icon}/>
                </button>
                ))                
            } 
           
          </div> 
      </nav>      
</>
  );
}

export default Topnavbar;




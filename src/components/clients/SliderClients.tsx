"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import Link from "next/link";

export default function SliderClients({clients}: {clients:any}){
  const [showClients, setShowClients] = useState<any[]>(clients);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const [numberClients, setNumberClients] = useState<number>(width<640? 1: (width<768? 2: (width<1024? 3: 4)));
  
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize, false);
  }, [])

  useEffect(() => {
    setNumberClients(width<640? 1: (width<768? 2: (width<1280? 3: 4)));
  }, [width])

  useEffect(() => {
    const timer = setTimeout(() => {
      if(index >= clients.length - 1){
        setIndex(0);
      }else{
        setIndex(index + 1);
      }
    }, 5000);

    let count = clients.length - (index + numberClients);
    
    if(count < 0){
      count = Math.abs(count);
      const arr1 = clients.slice(index, index + numberClients);
      const arr2 = clients.slice(0, count);
      setShowClients([...arr1, ...arr2]);
    }else{
      setShowClients(clients.slice(index, index + numberClients));
    }

    return () => clearTimeout(timer);
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }else{
      setIndex(clients.length -1);
    }
  }

  const Next = () => {
    if(index < clients.length - 1){
      setIndex(index+1)
    }else{
      setIndex(0);
    }
  }

  return(
    <>
      <h1 className="text-yellow-950 text-4xl mt-5 my-3 font-semibold">Nuestros clientes</h1>
      <h2 className="text-slate-700">Nuestros clientes satisfechos con nuestros servicios de construccion</h2>
      <div className="flex items-center">
        <div className='w-20'>
          <ChevronLeftIcon onClick={Previous}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>

        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10'>
          {showClients.map((client: any) => (
            <Link key={client._id} href={`${client.link}`}>
              <div className=''>
                <img src={client.logo} alt="logo" className="w-full" />
              </div>
            </Link>
          ))}
        </div>

        <div className='w-20'>
          <ChevronRightIcon onClick={Next}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>
      </div>
    </>
  )  
}

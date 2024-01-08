"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

export default function SliderProjects({projects}: {projects:any}){
  const [showProject, setShowProject] = useState<any>(projects[0]);
  const [index, setIndex] = useState(0);
  const [services, setServices] = useState<string[]>([]);

  const updateServices = (() => {
    let servs: string[] = [];
  
    projects[index].images.map((service:any) => {
      if(!servs.includes(service.services.name) && servs.length < 4){
        servs.push(service.services.name);
      }
    })
    setServices(servs);
  })
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if(index >= projects.length - 1){
        setIndex(0);
      }else{
        setIndex(index + 1);
      }
    }, 5000);

    setShowProject(projects[index]);
    updateServices();
    return () => clearTimeout(timer);
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }else{
      setIndex(projects.length -1);
    }
  }

  const Next = () => {
    if(index < projects.length - 1){
      setIndex(index+1)
    }else{
      setIndex(0);
    }
  }

  return(
    <>
      <div className="flex items-center">
        <div className='w-20'>
          <ChevronLeftIcon onClick={Previous}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>

        <div>
          <div className="relative">
            <img src={showProject.images[0].photo} alt="image" className="w-full" />
            {services.map((serv:string, index:number) => (
              <p className="absolute right-10 font-semibold" style={{top:`${(index * 25)+ 50}px`}} key={index}>{serv}</p>
            ))}
          </div>
        </div>

        <div className='w-20'>
          <ChevronRightIcon onClick={Next}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>
      </div>
    </>
  )  
}

import React from 'react'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { useState } from "react";

const CategoryCollapse = (props) =>{
      const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

      const openSubmenu = (index) => {
    if(submenuIndex === index){
      setSubmenuIndex(null);
    }else{
    setSubmenuIndex(index);
    }
  };

    const openInnerSubmenu = (index) => {
    if(innerSubmenuIndex === index){
      setInnerSubmenuIndex(null);
    }else{
    setInnerSubmenuIndex(index);
    }
  };

    return (
        <>
        <div className="scroll">
        <ul className="w-full">

          {props?.catData?.length !== 0 &&
                props?.catData?.map((cat, index) => {
                  return(
                    <li className="list-none flex items-center justify-between relative flex-col" key={index}>
            <Link to="/" className="w-full">
              <Button className="w-full !text-left flex !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                {cat?.name}
              </Button>
            </Link>

            {
              submenuIndex ===index ? <FiMinusCircle
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(index)}/> : <IoAddCircleOutline
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(index)}
            />
            }
            
            
            

            {submenuIndex === index && (
              <ul className="submenu w-full !pl-3">
                {cat?.children?.length !== 0 && cat?.children?.map((subCat,index_)=>{
                 return (
                  <li className="list-none relative" key={index_}>
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left flex !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      {subCat?.name}
                    </Button>
                  </Link>

                              {
              innerSubmenuIndex=== index_ ? <FiMinusCircle
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(index_)}/> : <IoAddCircleOutline
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openInnerSubmenu(index_)}
            />
            }

                  {innerSubmenuIndex === index_ && (
                    <ul className="inner_submenu w-full !pl-3">
                       {subCat?.children?.map(
                                          (thirdLevelCat, index) => {
                                          return(
                                            <li className="list-none relative mb-1" key={index}>
                      <Link
                        to="/"
                        className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                      >
                        {thirdLevelCat?.name}
                      </Link>
                    </li>
                                          )
                                          })
                                        }
                                              
                    


                  </ul>
                   )}
                </li>
                )
                })}
                
              </ul>
            )}
        </li>
                  )

                })
              }
        






        
        </ul>
    </div>
        </>
    )
}

export default CategoryCollapse;
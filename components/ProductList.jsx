import { useEffect, useState, useRef } from "react"

const ProductList =({products})=>{

    const [local, setLocal] = useState([])

    const fetchLocal =()=>{

        localStorage.getItem("myCart") !== null 
        ? setLocal(JSON.parse(localStorage.getItem("myCart"))) 
        : setLocal([])

    }
    useEffect(() => {

        fetchLocal()
     
    }, [])

    const addToCart =(item)=>{
        
        let newCookies
        
        if(JSON.parse(localStorage.getItem("myCart")) === null){

            newCookies = JSON.stringify([{id: item.id, price: item.price , count: 1}])
            localStorage.myCart = newCookies

        } else {
            newCookies = JSON.stringify([...JSON.parse(localStorage.getItem("myCart")), {id: item.id, price: item.price, count: 1}])
            localStorage.myCart = newCookies
        }

        fetchLocal()
    }

    const isItExist =(item)=>{
        let exist = false

        local && local.map((val)=>{
            if(val.id === item.id){
                exist = val
            }
        })

        return exist
    }

    const upDateLocal =(item, operation)=>{

        let newList = local

        if(operation === "ADD"){

            local && local.map((val, index)=>{
                if(val.id === item.id){
                    newList[index].count += 1
                }
            })   
        }

        if(operation === "!ADD"){

            local.map((val, index)=>{
                if(val.id === item.id){
                    if (newList[index].count !== 1) {
                        newList[index].count -= 1
    
                    } else {
                        newList = [...newList.filter((e) => {return e !== val})]
                    }
                }
            })   
        }

        localStorage.myCart = JSON.stringify(newList)
        fetchLocal()
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
        return text;
      }

    return(
        <div className="h-max w-full grid justify-center grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:pr-14 sm:pl-14 pl-5 pr-5">
            {
                products && products.map((val) => {
                    return(
                        <div className="w-full h-[65vh]">
                            <div className="h-full w-full shadow-md bg-gray-100 rounded-md">
                                <a href={`/product/${val.id}`}>
                                <div className="h-3/5 w-full bg-red-200 rounded-md">
                                    <img src={val.thumbnail} className="rounded-t-md h-full w-full object-cover" />
                                </div>
                                <div className="w-full h-1/5 pt-2">
                                    <h1 className="m-1 text-lg text-indigo-400 font3 pr-3 pl-3">
                                        <span className="bg-indigo-400 text-white p-0.5 mr-1 ">{val.price}$</span>
                                        | {truncateText(val.title, 30)}</h1>
                                    <h1 className="mb-10 m-1 opacity-80 text-md text-indigo-400 font1 pr-3 pl-3">{truncateText(val.description, 70)}</h1>
                                    
                                </div>
                                </a>
                                <div className="w-full flex items-end justify-center h-1/5 p-1">
                                    {
                                        !isItExist(val)
                                    ?
                                        <button onClick={()=>{addToCart(val)}} className="h-12 w-full rounded bg-indigo-400 ">
                                            <img src="./icon/shopcart.svg" className="p-1.5 h-10 w-10 m-auto" />
                                        </button>
                                    :
                                        <div className="h-12 w-full flex items-center justify-center flex-row">
                                            <button onClick={()=>{upDateLocal(val, "!ADD")}} className="h-12 w-1/6 rounded bg-indigo-400 ">
                                                {isItExist(val).count !== 1 
                                                    ?<img src="./icon/!add.svg" className="p-2 h-10 w-10 m-auto" />
                                                    :<img src="./icon/trash.svg" className="p-2 h-10 w-10 m-auto" />                                            
                                                }
                                            </button>
                                            <h1 className="bg-gray-200 rounded-md h-12 w-4/6 flex items-center justify-center mr-2 ml-2 text-lg font2 text-indigo-400 opacity-80">{isItExist(val).count}</h1>
                                            <button onClick={()=>{upDateLocal(val, "ADD")}} className="h-12 w-1/6 rounded bg-indigo-400 ">
                                                <img src="./icon/add.svg" className="p-1.5 h-10 w-10 m-auto" />
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductList
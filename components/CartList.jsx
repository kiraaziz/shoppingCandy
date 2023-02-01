import { useState, useEffect } from "react"
import {useRouter} from 'next/router'
import Item from "./CartItem"

const Cart =()=>{

	const [local, setLocal] = useState(null)
	const router = useRouter()

	const fetchLocal =()=>{

		setLocal(null)
 
        localStorage.getItem("myCart") !== null 
        ? setLocal(JSON.parse(localStorage.getItem("myCart"))) 
        : setLocal([])

    }
    useEffect(() => {

        fetchLocal()
     
    }, [])

	  const updateLocal =(item, operation)=>{

		setLocal([])

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
						router.reload()
                    }
                }
            })   
        }

        localStorage.myCart = JSON.stringify(newList)
		fetchLocal()

	}

	const myPrice =()=>{
		
		let sum = 0
		
		if(local){
			local.map((val) => {
				sum = sum + val.count*val.price
			})
		}

		return sum
	}

    return(
		<div className="flex flex-col max-w-3xl p-6 space-y-4 m-auto sm:p-10 ">
			<h2 className="text-xl font-semibold font2 text-indigo-400">Your cart</h2>
			<ul className="flex flex-col divide-y divide-gray-700">
				{
					local ? local.map((val)=>{
						return(
							<Item updateLocal={updateLocal} val={val} />
						)
					})
					: null
				}
			</ul>
			<div className="space-y-1 text-right">
				<p className="text-md font1 text-gray-500">Total amount:
					<span className="font-semibold text-indigo-500 font2"> {myPrice()} $</span>
				</p>
			</div>
			<div className="flex justify-end space-x-4">
				<a href="/" type="button" className="px-6 py-2 border rounded-md border-indigo-400 font2">
					<span className="text-indigo-400">Back to shop</span>
				</a>
				<button type="button" className="px-6 py-2 border rounded-md border-indigo-400 bg-indigo-400 font2">
					<span className=" text-white">Continue to Checkout</span>
				</button>
			</div>
		</div>
    )
}

export default Cart
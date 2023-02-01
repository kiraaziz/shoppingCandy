import { useState, useEffect } from "react"

const Item =({val, updateLocal})=>{

	const [info, setInfo] = useState(null)

	const fetchLocalChi =async()=>{

		let reqData = await fetch(`http://127.0.0.1:8090/api/collections/shopping/records/${val.id}`)
		let data = await reqData.json()

		if(data){
			setInfo(data)
		}
	}

	useEffect(()=>{

		fetchLocalChi()

	}, [])

	const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
        return text;
      }

	return( 
		<li className="flex flex-col py-6 sm:flex-row sm:justify-between">
			{info && 
						<div className="flex w-full space-x-2 sm:space-x-4">
						<img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={info.thumbnail} />
						<div className="flex flex-col justify-between w-full pb-4">
							<div className="flex justify-between w-full pb-2 space-x-2">
								<div className="space-y-1">
									<h3 className="text-lg font-semibold leading-snug sm:pr-8 font1 text-indigo-400"> {truncateText(info.title, 25)}<span className=" text-gray-800 font1"> x {val.count}</span></h3>
									<p className="text-sm font1 text-gray-400 opacity-80">{truncateText(info.description, 80)}</p>
								</div>
								<div className="text-right">
									<p className="text-lg font-semibold font1 text-indigo-400 opacity-80">{info.price}$</p>
								</div>
							</div>
							<div className="flex text-sm divide-x">
								<button onClick={()=>{updateLocal(val, "!ADD")}} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1 font1 text-indigo-400">
									<img src={`./icon/${val.count > 1 ? "!add": "trash"}.svg`} className="p-2 rounded-md h-8 w-8 m-auto bg-indigo-400" />
								</button>
					
								<button onClick={()=>{updateLocal(val, "ADD")}} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1 font1 text-indigo-400">
									<img src="./icon/add.svg" className="p-2 rounded-md h-8 w-8 m-auto bg-indigo-400" />
								</button>
							</div>
						</div>
					</div>
			}
		</li>
	)
}

export default Item
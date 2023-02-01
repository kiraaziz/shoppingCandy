const Wraper =({tags, select, setSelect})=>{

    return(
        <div className="h-max w-full p-4 pr-10 pl-10 flex flex-wrap items-center justify-center">
            {
                tags.map((val) => {
                    return(
                        <button onClick={()=>{setSelect(val)}} className={`p-0.5 ${val === select ? "bg-indigo-300 border-2 border-indigo-300": "border-2 border-indigo-300"} m-1 pr-3 pl-3 rounded-full`}>
                            <h1 className={`${val === select ? "text-white": "text-indigo-300"} font1`}>{val}</h1>    
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Wraper
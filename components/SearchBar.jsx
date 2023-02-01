const SearchBar =({tap, setTap})=>{

    return(
        <div className="mt-5 mb-5 h-20 w-full flex items-center justify-center">
            <input value={tap} onChange={(e)=>{setTap(e.target.value)}} placeholder="Search For An item ..." className="text-indigo-400 font2 focus:shadow-xl text-lg h-14 bg-gray-100 sm:w-2/3 w-5/6 border-2 border-indigo-400 rounded-md p-2"/>
        </div>
    )
}

export default SearchBar
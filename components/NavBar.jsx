import { useState, useEffect } from "react"

const NavBar =()=>{


    return(
        <div className="h-14 w-full bg-indigo-300 shadow-lg flex items-center justify-between">
            <a href="/" className="h-full w-max flex items-center justify-center flex-row p-3 sm:ml-10">
                <img src="./icon/shop.svg" className="h-10 w-10 mr-2" />
                <h1 className="font-bold text-white text-xl font2">Shopping Candy</h1> 
            </a>
            <div className="h-full w-max flex items-center justify-center flex-row mr-3">
                <a className="h-max w-max mr-2" href="/search">
                    <img src="./icon/search.svg" className="p-1 h-10 w-10" />
                </a>
                <a className="h-max w-max mr-4" href="/cart">
                    <img src="./icon/shopcart.svg" className="p-1.5 h-10 w-10" />
                </a>
                <div style={{position: "relative", left: "-35px", bottom: "10px"}} className="h-5 w-6 bg-red-400  flex items-center opacity-95 justify-center rounded-full text-white font1 ">5</div>

            </div>
        </div>
    )
}

export default NavBar
import Screen from "../components/Screen"
import NavBar from "../components/NavBar"
import Content from "../components/Content"
import Show from "../components/Show"
import SearchBar from "../components/SearchBar"
import ProductList from "../components/ProductList"
import Head from "next/head"
import { useState } from "react"

const Search =()=>{

    const [tap, setTap] = useState(null)
    const [products, setProducts] = useState(null)

    const loadApi =async(e)=>{

      const reqData = await fetch(`http://127.0.0.1:8090/api/collections/shopping/records?filter=(title~"${e}" || description~"${e}")`)
      const data = await reqData.json()
  
      if(data){
        setProducts(data.items)
      }
    }

    const setTapFun =(e)=>{
        
      setTap(e)
      setProducts(null)
  
      if(e){    
        loadApi(e)
      } 
    }

  return(
    <Screen>
      <Head>
        <script src="./tailwind.js"></script>
        <title>Shopping : Search</title>
        <link rel="icon" href="/icon/ico.svg"></link>
      </Head>
      <NavBar />
      <Content>
        <Show text="Search For ..."/>
        <SearchBar tap={tap} setTap={setTapFun} />
        <ProductList products={products && products }/>
      </Content>
    </Screen>
  )
}

export default Search
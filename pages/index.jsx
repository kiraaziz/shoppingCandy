import Screen from "../components/Screen"
import NavBar from "../components/NavBar"
import Content from "../components/Content"
import Show from "../components/Show"
import Wraper from "../components/Wraper"
import ProductList from "../components/ProductList"
import Head from "next/head"
import { useState } from "react"

export async function getServerSideProps(){

  const reqFirst = await fetch(`http://127.0.0.1:8090/api/collections/shopping/records`)
  const first = await reqFirst.json()

  const reqTags = await fetch(`http://127.0.0.1:8090/api/collections/shoppingDetail/records/yhsrlo1y2rbadh5`)
  const tags = await reqTags.json()

  return {
      props: {tags: tags.tags.array, first: first.items},
  }
}

const Home =({tags, first})=>{

  const [products, setProducts] = useState(first)
  const [select, setSelect] = useState(tags[0])

  const loadApi =async(e)=>{

    const reqData = await fetch(`http://127.0.0.1:8090/api/collections/shopping/records?filter=(category="${e}")`)
    const data = await reqData.json()

    if(data){
      setProducts(data.items)
    }
  }

  const loadAllApi =async(e)=>{

    const reqData = await fetch(`http://127.0.0.1:8090/api/collections/shopping/records`)
    const data = await reqData.json()

    if(data){
      setProducts(data.items)
    }
  }

  const setSelectFun =async(e)=>{

    setSelect(e)
    setProducts(null)

    if(e !== "All"){    
      loadApi(e)
    } else {
      loadAllApi(e)
    }
  }

  return(
    <Screen>
      <Head>
        <script src="./tailwind.js"></script>
        <title>Shopping : {select}</title>
        <link rel="icon" href="/icon/ico.svg"></link>
      </Head>
      <NavBar />
      <Content>
        <Show text={select}/>
        <Wraper select={select} setSelect={(e)=>{setSelectFun(e)}} tags={tags}/>
        <ProductList products={products && products.filter((val)=>{
          if(select === "All"){
            return val
          } else {
            return val.category === select
          }
        })}/>
      </Content>
    </Screen>
  )
}

export default Home
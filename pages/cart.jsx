import Screen from "../components/Screen"
import NavBar from "../components/NavBar"
import Content from "../components/Content"
import Show from "../components/Show"
import CartList from "../components/CartList"
import Head from "next/head"

const Cart =()=>{

  return(
    <Screen>
      <Head>
        <script src="./tailwind.js"></script>
        <title>Shopping : Cart</title>
        <link rel="icon" href="/icon/ico.svg"></link>
      </Head>
      <NavBar />
      <Content>
        <Show text="My Own Cart"/>
        <CartList />
      </Content>
    </Screen>
  )
}

export default Cart
import axios from "axios";
import React,{useEffect, useState} from "react";

function Index() {
  const [allProducts, setAllProducts] = useState([]);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('')
  const [buyNow, setBuyNow] = useState({})
  const [modal, setModal] = useState(false)
  const [username, setUsername] = useState('')
  const [quantity, setQuantity] = useState('')
    useEffect(() => {
      axios.get('http://localhost:4000/api/allgoods').then(res=>{
          setAllProducts(res.data)
          setStatus(true)
      }).catch(err=> {
          setStatus(false)
          setMessage('Network Error')
      })
    }, [])
    const buyProduct = (product) => {
      setBuyNow(product)
      setModal(true)
    }
    const buy = () => {
      setModal(false)
    }
    const close = () => {
      setModal(false)
    }
    return (
        <>
         <div className="bg-white h-screen flex">
           <div className="w-full sm:px-6 my-auto">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-700 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-100 text-center">FMARK</p>
                        <div>

                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="text-left pl-4 text-lg font-medium">Product Name</th>
                                <th className="text-left pl-12 text-lg font-medium">Quantity</th>
                                <th className="text-left pl-12 text-lg font-medium">Price</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                          {status ? allProducts.map((item, index)=> {
                            return (
                            <tr key={index} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <div className="pl-4">
                                        <p className="font-medium">{item.name}</p>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">{item.qty}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium"># {item.price}</p>
                                </td>
                                <td className="pl-20">
                                    <button className="rounded py-1.5 px-5 bg-gray-900 text-gray-100 text-lg block  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="defaultModal" onClick={()=>buyProduct(item)}>Buy Now</button>
                                </td>
                            </tr>
                            )
                          }): 
                          <tr className="text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b h-10 pl-20 border-t border-gray-10">
                            <td>{message}</td>
                          </tr>
                          }
                        </tbody>
                    </table>
                </div>
                { modal? <div className="absolute top-0 left-0  w-full h-screen bg-gray-600 bg-opacity-20 flex justify-center items-center">
                        <div className="rounded-lg bg-white w-11/12 md:w-3/6 px-12 py-10">
                            <h2 className="font-semibold text-xl text-gray-700">Buy Now</h2>
                            <input placeholder="Name" type='text' name="username" onChange={(e)=>setUsername(e.target.value)} className="outline-none py-1.5 px-3 rounded border mt-5"/>
                            <input placeholder="Quantity" type='number' name="quantity" onChange={(e)=>setQuantity(e.target.value)} className="outline-none py-1.5 px-3 rounded border mt-5"/>
                            {quantity===''||username===''? <p className="">Pls Fill the above Information</p>: Number(quantity)>Number(buyNow.quantity) ? <p className="text-gray-700 text-sm">Quantity is above abailable quantity</p>:<p className="text-gray-700 text-sm">Dear {username}, your price quote for {quantity} {buyNow.name} is {Number(quantity)*Number(buyNow.price)}</p>}
                          <div className="flex justify-between items-center mt-5">
                            <button className="bg-red-700 px-4 text-white rounded py-2" onClick={close}>Cancel</button>
                            <button className="rounded bg-gray-900 text-white px-3 py-2" onClick={buy}>Buy Now</button>
                          </div>
                        </div>
                 </div>: null}
            </div>
         </div>
        </>
    );
}

export default Index;


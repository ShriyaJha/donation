import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import './Payment.css';
import 'react-credit-cards/es/styles-compiled.css'
import { donate } from "./helper/paymentHelper"
import { isAuthenticated ,authenticate } from "./helper/userHelper"; 

function Payment({history}) {

  const [number, setNumber]=useState('');
  const [name, setName]=useState('');
  const [expiry, setExpiry]=useState('');
  const [cvc, setCvc]=useState('');
  const [focus, setFocus]=useState('');
  const [values,setValues]= useState({
    amount:"",
    error:"",
    reDirect:false
  })

  const {user,token} = isAuthenticated();
  const {amount,error,reDirect} = values;
  const handleChange = name => events=>{
    setValues({...values, error:false, [name]: events.target.value})
  }

  const ReDirect = ()=>{
    if (reDirect){
        return history.push("/thankyou")
    }
}

  const onSubmit = e =>{
    e.preventDefault();
    setValues({...values, error:false})
    donate(user._id,token,{amount}).then(data =>{
        console.log(data)
        if(data.error){
            setValues({...values,error:data.error,})
        }
        else{
          setValues({
            amount:"",
            error:"",
            reDirect:true
          })
        }
    }).catch(error => {
        setValues({...values,error:error,})
    })

}

  const paymentForm =() =>{
    <div>
      
    </div>
  }

  return (
    <div className="payment">
  
      <header>
        <h1>Payments page</h1>
      </header>
      <section id="main-section">
      <br/>
      <Cards
        number={number}
        name={name}
        xpiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <br/>
      <form>
        <input 
        type='tel' 
        name='number' 
        placeholder='Card Number' 
        value={number} 
        onChange={e => setNumber(e.target.value)} 
        onFocus={e => setFocus(e.target.name) }
        />
        <br/>
        <br/>
        <input 
        type='text' 
        name='name' 
        placeholder='Name' 
        value={name} 
        onChange={e => setName(e.target.value)} 
        onFocus={e => setFocus(e.target.name) }
        />
        <br/>
        <br/>
        <input 
        type='text' 
        name='expiry' 
        placeholder='MM/YY Expiry' 
        value={expiry} 
        onChange={e => setExpiry(e.target.value)} 
        onFocus={e => setFocus(e.target.name) }
        />
        <br/>
        <br/>
        <input 
        type='tel' 
        name='cvc' 
        placeholder='CVC' 
        value={cvc} 
        onChange={e => setCvc(e.target.value)} 
        onFocus={e => setFocus(e.target.name) }
        />
        <br/>
        <br/>
        <input 
        type='number'  
        placeholder='Amount' 
        onChange={handleChange("amount")} value={amount}
        />
      </form>
      <br/>
      <br/>
      <button onClick={onSubmit} className="btn btn-outline border-success">
        Make Payment
      </button>
      </section>
      {ReDirect()}
    </div>
    
  )

}

export default Payment;
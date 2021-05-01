import React , { Component } from 'react';
import "../welcome.css"
import { Router } from 'react-router';
import {Link} from "react-router-dom"
const  Donation = ({history}) => {

        const redirect =() =>{
            return history.push("/payment");
        }

        const donation= ()=>(
            <div>
                <div className="container text-light">
                    <h1>Feel The Peace Of Giving</h1>
                    <h4>Thank you for your concerns and your help during this pandemic. In this tough time we should come 
                        forward and help each other to overcome this crisis. Any Kind of help will be appriciated..
                    </h4>

                    <div className="form-group; w-50 p-3">
                        <button onClick={redirect} type="submit" className="btn btn-primary btn-block">MONEY Donation</button>
                    </div>

                </div>
            </div>
        )

        return (
            <div>
                {donation()}
            </div>
        );
    
}


export default Donation;
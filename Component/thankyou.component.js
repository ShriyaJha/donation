import React, {useState, Component } from "react";
import "../welcome.css"
export default class ThankYou extends Component {
    render() {
        const thankyou =()=>(

            <div className="container text-light" >
                <label><h1>THANK  YOU  FOR  YOUR  CONTRIBUTION</h1></label>
            </div>
            
        )

        
        return (
            <div >
                {thankyou()}
            </div>
        );
    }
}
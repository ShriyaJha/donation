import React, {useState, Component } from "react";
import "../welcome.css"
export default class Welcome extends Component {
    render() {
        const welcome =()=>(
            <div className="container text-light">
            
                <div bottom-margin="auto">
                    <label><h1>WELCOME TO COVID RELIEF NGO</h1></label>
                </div>
                <div className="box text-dark">
                    <h4>Team Members</h4>
                    Shriya Jha,
                    Muskan Gupta,
                    Surabhi Agarwal,
                    Priyanka Dutta,
                    Akrity Karan,
                    Shivani Kumari.
                </div>
                   
            </div>
        )

        
        return (
            <div >
                {welcome()}
            </div>
        );
    }
}
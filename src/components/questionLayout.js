import React, { useState, useEffect } from "react";
import '../App.css';
import { Button,Input} from "antd";
import axios from "./axios";
import { SendOutlined } from '@ant-design/icons';

function QuestionLayout (props){

    const[questions, setQuestions]= useState([]);

    useEffect(() => {
        setInterval(()=> {
            axios.get("/qanda")
            .then((res) =>{
                setQuestions(res.data);
            });
        }, 1000);
    },[]);


    return(
        <div className="chat-body">
            <div className="chatBubble-body">{questions.map((data) => (
                <p className="chatBubble">
                    <p>{data.senderId}</p>
                    <p>{data.text}</p>
                </p>
            ))}

            </div>
        </div>
    )
}


export default QuestionLayout;
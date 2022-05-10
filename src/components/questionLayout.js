import React, { useState, useEffect } from "react";
import '../App.css';
import { Button,Input, Popover} from "antd";
import axios from "./axios";
import { SendOutlined ,EllipsisOutlined  } from '@ant-design/icons';

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

    const content = (
        <>
        <Input type="text" placeholder="Type Answer Here" />
        <Button type="primary">Answer</Button>
        </>
    )

    return(
        <div className="chat-body">
            <div className="chatBubble-body">{questions.map((data) => (
                <p className="chatBubble">
                    <div className="chat-bubble-button">
                    {/* <p>{data.name}</p> */}
                    <p>{data.text}</p>
                    <Popover
                        content={content}
                        trigger="click">
                    <EllipsisOutlined />
                    </Popover>
                    </div>
                </p>
            ))}

            </div>
        </div>
    )
}


export default QuestionLayout;
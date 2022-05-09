import React, {useState} from "react";
import "../App.css";
import OnlineStudents from "./onlineStudents";
import  "./videoClass";
import {Button,
        Space,
        Badge,
        Menu,
        Dropdown} from 'antd';
import {AudioOutlined,
  AudioMutedOutlined,
    VideoCameraOutlined,
    ArrowUpOutlined,
    DesktopOutlined ,
    EllipsisOutlined,
    TeamOutlined  } from '@ant-design/icons';

function FooterLayout(props) {

  const[toggleList, setToggleList] = useState(false);
  const toggleListName = () =>{
      setToggleList(!toggleList)
  }
  const[mic, setMic] = useState(false);
  const setmicEnable = () =>{
    setMic(!mic)
  }
  const setEnableVideoButton = () => {
    props.setEnableVideo(!props.enableVideo)
  }

  const setEnableMicButton = () =>{
    props.setEnableMic(!props.enableMic)
  }

  const setEnableScreenSharing = () => {
    props.setScreenSharing(!props.screenSharing)
  }

  const menu =(
    <Menu items={[
      {
        label: (
          <a>Student 1</a>
        ),
      },
      {
        label: (
          <a>Student 2</a>
        ), 
      },
      {
        label: (
          <a>Student 2</a>
        ), 
      },
    ]}/>
  );


  return (
    <div className="grid-footer">
      <Space className="button-array">
        <Button shape="circle" size="large" icon={mic?<AudioOutlined />:<AudioMutedOutlined />} onClick={setmicEnable}/>
        <Button shape="circle" size="large" icon={<VideoCameraOutlined/>} onClick={setEnableVideoButton}/>
        <Button shape="circle" size="large" icon={<ArrowUpOutlined />} onClick={setEnableScreenSharing}/>
        <Button shape="circle" size="large" icon={<EllipsisOutlined />} />
        <Button shape="circle" size="large" icon={<DesktopOutlined />} />
      </Space>
      <Space className={`${props.smallLayout ? "live-center-button" : "button-live"}`}>
        <Dropdown overlay={menu} placement="top" arrow>
        <Button shape="circle" size="large" icon={toggleList?<TeamOutlined />:<Badge count={3}><TeamOutlined /></Badge>} onClick={toggleListName}/>
        </Dropdown>
      </Space>
    </div>
  );
}

export default FooterLayout;
import React, {useState} from "react";
import "../App.css";
import OnlineStudents from "./onlineStudents";
import  "./videoClass";
import {Button,
        Space,
        Badge,
        Popover} from 'antd';
import {AudioOutlined,
  AudioMutedOutlined,
    VideoCameraOutlined,
    ArrowUpOutlined,
    DesktopOutlined ,
    EllipsisOutlined,
    TeamOutlined  } from '@ant-design/icons';

const FooterLayout = (props) => {

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
  const setEnableScreenSharing = () => {
    props.setScreenSharing(!props.screenSharing)
  }
  // const setEnableMicButton = () =>{
  //   props.setEnableMic(!props.enableMic)
  // }
const content  = (
  <>
  <a>John</a><br/>
  <a>Emilie</a><br/>
  <a>Fred</a>
  </>
)


  return (
    <div className="grid-footer">
      <Space className="button-array">
        <Button shape="circle" size="large" icon={mic?<AudioOutlined />:<AudioMutedOutlined />}  onClick={setmicEnable}/>
        <Button shape="circle" size="large" icon={<VideoCameraOutlined/>} onClick={setEnableVideoButton}/>
        <Button shape="circle" size="large" icon={<ArrowUpOutlined />} onClick={setEnableScreenSharing}/>
        <Button shape="circle" size="large" icon={<EllipsisOutlined />} />
        <Button shape="circle" size="large" icon={<DesktopOutlined />} />
      </Space>
      <Space className={`${props.smallLayout ? "live-center-button" : "button-live"}`}>
      <Popover
        content={content}
        title ="Participants"
        trigger="click">
        <Button shape="circle" size="large" icon={toggleList?<TeamOutlined />:<Badge count={1}><TeamOutlined /></Badge>} onClick={toggleListName}/>
        </Popover>
      </Space>
    </div>
  );
}

export default FooterLayout;
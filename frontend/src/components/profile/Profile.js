import React, { useState } from 'react'
import { Card, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, ImportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Info from './Info'
import Update from './Update'
import { useContextInfo } from '../../hooks/context'
import MY_SERVICE from '../../services'
import { useHistory } from 'react-router-dom';

const Profile = ( {closeProfile} ) => {
  const history = useHistory();
  const { user, logout } = useContextInfo()
  const [view, setView] = useState("info")

  function handleInfo() {
    setView('info')
  }

  function handleUpdate() {
    setView('update')
  }

  async function handleLogout() {
    await MY_SERVICE.logOut()
    closeProfile()
    logout()
    history.push("/");
  }

  async function handleDelete() {
    await MY_SERVICE.deleteUser(user._id)
    closeProfile()
    logout()
  }

  return (
    <>
    {user && 
    <Row id="profile-card">
      <Col style={{width: "100%"}}>
        <Card
          actions={[
            <ImportOutlined key="signout" onClick={handleLogout}/>,
            <InfoCircleOutlined key="info" onClick={handleInfo}/>,
            <EditOutlined key="edit" onClick={handleUpdate}/>,
            <DeleteOutlined key="delete" onClick={handleDelete}/>
          ]}
        >
        {view === "info" ? 
          <Info />
        : 
          <Update />
        }
        </Card>
      </Col>
    </Row>}
  </>
  )
}

export default Profile
import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import ProfileImage from './ProfileImage'
import ProfileContent from './ProfileContent'

const StyledContainer = styled.div`
  display: inline-block;
  background: #4C4B4B;
  color: #ffffff;
  width: 550px;
  margin: 10px;
  border-radius: 20px;
  border-bottom: solid #2b2b2b 2.5px;
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.25);
  transform: translateY(-150px);
  h3 {
    font-weight: bold;
    color: #f5f5f5;
    margin-top: 10px;
  }
  .content {
    opacity: .85;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`

const ProfileCard: React.FC = () => (
  <StyledContainer>
    <ProfileImage />
    <ProfileContent title="ABOUT 📝">
      <div className="content">
        New graduate. Self learner. Can improve. Never perfect.
      </div>
    </ProfileContent>
    <Divider />
    <ProfileContent title="EDUCATION 📚">
      <div className="content">
        <div>2016 - 2020</div>
        <div>Bachelor of Science, Computer Science</div>
        <div>Maejo University</div>
      </div>
    </ProfileContent>
    <Divider />
    <ProfileContent title="SKILLS 👨🏻‍💻">
      <h3>Languages</h3>
      <div className="content">
        JavaScript ES6, HTML5, CSS3, PHP, SQL
      </div>
      <h3>Framework & Libraries</h3>
      <div className="content">
        React, Next.js, Ant Design, jQuery, Expressjs, Mongoose, Jest
      </div>
      <h3>Tools</h3>
      <div className="content">
        Node.js, SourceTree, Git, Postman
      </div>
      <h3>Others</h3>
      <div className="content">
        Self learning, Google search
      </div>
    </ProfileContent>
    <Divider />
  </StyledContainer>
)

export default ProfileCard

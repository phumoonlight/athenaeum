import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .title {
    font-weight: bold;
    color: #f5f5f5;
    margin-top: 25px;
  }
`

interface ProfileContentProps {
  className?: string
  title: string
}

const ProfileContent: React.FC<ProfileContentProps> = ({ children, className, title }) => (
  <Container className={className}>
    <h2 className="title">{title}</h2>
    {children}
  </Container>
)

export default ProfileContent

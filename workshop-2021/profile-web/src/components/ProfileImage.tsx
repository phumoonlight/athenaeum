import React from 'react'
import styled from 'styled-components'

const StyledImg = styled.img`
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  object-fit: cover;
  width: 100%;
  height: 250px;
`

interface ProfileImageProps {
  className?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className }) => (
  <StyledImg className={className} src="/images/profile-pic.jpg" alt="profile" />
)

export default ProfileImage

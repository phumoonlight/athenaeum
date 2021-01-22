import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 448px;
  height: 160px;
  padding: 24px 22px 27px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(61, 143, 142, 0.1);
  border: solid 1px rgba(77, 179, 178, 0.3);
  background-color: #ffffff;
  margin-right: 25px;
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    min-width: 64px;
    height: 64px;
  }
  .title {
    font-weight: bold;
    /* font-size: 32px; */
    letter-spacing: 0.24px;
  }
  .description {
    /* font-size: 20px; */
    font-weight: 600;
    opacity: 0.6;
  }
  @media (min-width: 320px) {
    img {
    min-width: 48px;
    height: 48px;
    }
    .title {
      font-size: 20px;
    }
    .description {
      font-size: 14px;
    }
  }
`

interface Props {
  title?: string
  description?: string
}

export const CertifyCard: React.FC<Props> = ({
  title = '{title}',
  description = '{description}',
}) => {
  return (
    <Container>
      <div className="mr-4">
        <img src="/icons/icons-colors-ic-certify.svg" alt="cert-icon" />
      </div>
      <div>
        <div className="title font-serif-pro">{title}</div>
        <div className="description">{description}</div>
      </div>
    </Container>
  )
}

import Axios from 'axios'

const hardCodedSearchSchool = async (startPage: number, schoolCode: string) => {
  console.info('current-page:', startPage)
  const response =  await Axios.get(`https://backoffice-api.aksorn-dev.mydevkit.me/api/schools?pageNumber=${startPage}&pageSize=100`, {
    headers: {
      'X-API-KEY': 'rsBc9vJi9Tq1yilyLjpdHXKKLRtmmXwl'
    }
  })
  const schools = response.data.data
  const result = schools.find(((school: any) => {
    return school.schoolCode === schoolCode
  }))
  if (result) {
    console.info('result:', result)
    return
  }
  hardCodedSearchSchool(startPage + 1, schoolCode)
}

hardCodedSearchSchool(1, '1095440041')

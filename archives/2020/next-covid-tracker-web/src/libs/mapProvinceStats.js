const mapProvinceStats = (province) => {
  const provinceValues = Object.values(province)
  const provinceNames = Object.keys(province)
  const mappedProvinceStats = provinceNames.map((name, index) => ({
    province: name,
    value: provinceValues[index],
  }))
  return mappedProvinceStats
}

export default mapProvinceStats

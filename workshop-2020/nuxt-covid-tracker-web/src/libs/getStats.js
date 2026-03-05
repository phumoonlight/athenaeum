import axios from 'axios'
import { API_SUMMARY, API_TODAY } from '../config'

const getStats = async () => {
  const { data: todayStats } = await axios.get(API_TODAY)
  const { data: summaryStats } = await axios.get(API_SUMMARY)
  return { todayStats, summaryStats }
}

export default getStats

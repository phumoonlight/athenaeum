import { searchClient } from "../client"


export default {
  async search(ctx) {
    const res = await searchClient.index('app-contents').search(ctx.query.search, {
      
    })
    console.log('Search results:', res);
    return res
  },
}
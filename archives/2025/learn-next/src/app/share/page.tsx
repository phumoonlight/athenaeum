'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:1337/api/articles', {
      params: {
        populate: '*'
      }
    }).then((res) => {
      setList(res.data.data)
    }).catch(() => { })

  }, [])

  return (
    <div>

      {list.map((item) => {
        const url = `https://strapi.io/${item.documentId}`
        return (
          <div key={item.documentId} className="border border-white p-2">
            <h2>{item.title}</h2>
            <p className="mb-6">{item.description}</p>
            <a className="flex" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>share facebook</a>
            <a className="flex" href={`https://social-plugins.line.me/lineit/share?url=${url}&text=${item.title}`}>share line</a>
            <a className="flex" href={`https://x.com/intent/post?text=${item.title}%0A${item.description}&url=${url}`}>share x</a>
          </div>
        )
      })}
    </div>
  )
}

'use client'
import axios from 'axios'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import Markdown from 'react-markdown'

type State = {
  count: number;
  inc: () => void;
  dec: () => void;
}

export const useX = create<State>((set) => ({
  count: 16,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}))

export default function Page() {
  const xxx = useX()
  const { theme, setTheme } = useTheme()
  const [list, setList] = useState<any[]>([])
  const [about, setAbout] = useState<any>()
  useEffect(() => {
    axios.get('http://localhost:1337/api/main-menus', {
      params: {
        sort: 'order:asc',
      }
    }).then((res) => {
      setList(res.data.data)
    }).catch(() => { })
    axios.get('http://localhost:1337/api/about?populate=*').then((res) => {
      setAbout(res.data.data)
    }).catch(() => { })
  }, [])

  if (!list.length || !about) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>menu</div>
      <div className="flex flex-col">
        {list.map((item) => (
          <div key={item.documentId} className="flex flex-row">
            <div>{item.title}</div>
            <div>{item.url}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="flex justify-center items-center border border-amber-200 w-10" onClick={xxx.inc}>+</button>
        <button className="flex justify-center  items-center border border-amber-200 w-10" onClick={xxx.dec}>-</button>
        <div>{xxx.count}</div>
      </div>
      <div className="p-4">
        <div>{theme}</div>
        <button className="flex justify-center items-center border border-amber-200 w-14" onClick={() => setTheme('light')}>light</button>
        <button className="flex justify-center items-center border border-amber-200 w-14" onClick={() => setTheme('dark')}>dark</button>
        <button className="flex justify-center items-center border border-amber-200 w-14" onClick={() => setTheme('custom')}>custom</button>
      </div>
      <div>
        <Markdown components={{
          h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
          h2: (props) => <h2 className="text-xl font-bold" {...props} />,
          h3: (props) => <h3 className="text-lg font-bold" {...props} />,
          p: (props) => <p className="text-base" {...props} />,
        }}>{about.blocks[1].body}</Markdown>
      </div>
    </div>
  )
}

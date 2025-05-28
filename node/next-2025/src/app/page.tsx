'use client'
import axios from 'axios'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import Markdown from 'react-markdown'
import { Dropdown } from 'antd'

type State = {
  count: number;
  inc: () => void;
  dec: () => void;
}

type MenuItem = {
  id: number;
  label: string;
  img?: {
    url: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
  };
  children?: MenuItem[];
}

type NavMenu = {
  items: MenuItem[]
}

export const useX = create<State>((set) => ({
  count: 16,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}))

export default function Page() {
  const xxx = useX()
  const { theme, setTheme } = useTheme()
  const [list, setList] = useState<NavMenu>()
  const [about, setAbout] = useState<any>()
  useEffect(() => {
    axios.get('http://localhost:1337/api/nav-menu', {
      params: {
        populate: {
          items: {
            populate: {
              img: {
                fields: ['url', 'name', 'alternativeText', 'caption', 'width', 'height'],
              },
              children: {
                populate: {
                  children: true,
                  img: {
                    fields: ['url', 'name', 'alternativeText', 'caption', 'width', 'height'],
                  },
                }
              }
            }
          }
        }
      }
    }).then((res) => {
      setList(res.data.data)
    }).catch(() => { })
    axios.get('http://localhost:1337/api/about?populate=*').then((res) => {
      setAbout(res.data.data)
    }).catch(() => { })
  }, [])

  if (!list || !about) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>menu</div>
      <div className="flex p-2">
        {list.items.map((item) => (
          <div key={item.id} className="p-2 bg-red-400 min-w-[400px]">
            <div>{item.label}</div>
            <div>
              {item.children?.map((item2) => (
                <div key={item2.id} className="p-2 bg-blue-400 min-w-[200px]">
                  <div>{item2.label}</div>
                  <div>
                    {item2.children?.map((item3) => (
                      <div key={item3.id} className="p-2 bg-blue-400 min-w-[200px]">
                        <div>{item3.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-2 gap-4">
        {list.items.map((item) => (
          <Dropdown key={item.id} className="bg-amber-500" menu={{
            items: [
              ...(item.img ? [{
                key: item.id,
                label: item.img ? <img src={`http://localhost:1337${item.img.url}`} alt={item.img.alternativeText} className="h-[150px]" /> : undefined,
                disabled: true,
              }] : []),
              ...((item.children || []).map((item2) => {
                return {
                  key: item2.id,
                  label: item2.label,
                  children: item2.children?.length ? item2.children?.map((item3) => ({
                    key: item3.id,
                    label: item3.label,
                  })) : undefined,
                }
              }))
            ]
          }}>{item.label}</Dropdown>
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

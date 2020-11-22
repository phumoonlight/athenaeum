import React from 'react'

export const RepoLink: React.FC = () => (
  <a 
    className="rounded-full p-3 w-40 text-center bg-black text-white border-black border-solid border-2 hover:bg-white hover:text-black"
    href="https://github.com/phumoonlight/athenaeum"
    children={(
      <span>Repository</span>
    )}
  />
)
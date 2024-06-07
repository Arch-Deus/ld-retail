import { redirect } from 'next/navigation'
import React from 'react'

const SearchAction = async (formData : FormData) => {
  const keyword = formData.get("keyword")
  
  redirect("/marketplace?keyword="+keyword)

  return (
    <div>SearchAction</div>
  )
}

export default SearchAction
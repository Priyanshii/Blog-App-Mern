import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'
import { getSearchedBlogs } from '../redux/slices/blogsSlice'

const SearchedBlogs = () => {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchedBlogs } = useSelector((store) => store.blog);

  const tag = searchParams.get('tag');
  const searchInput = searchParams.get('search');

  useEffect(() => {
    const query = {
      tag: tag,
      search: searchInput,
    }
    dispatch(getSearchedBlogs(query));
  },[searchParams])

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>Results for {tag} {searchInput}</h1>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div className='flex justify-start w-full'>
        <BlogsList blogsList={searchedBlogs}/>
      </div>
    </div>
  )
}

export default SearchedBlogs;

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogDetails = () => {

  const { blogDetails } = useSelector((store) => store.blog);
  const { title, content, createdAt, author, tags } = blogDetails;
  
  return (
    <div className='flex justify-center break-words'>
      <div className='md:max-w-2xl mx-6 w-full'>
        <div className='flex flex-col items-start justify-normal mt-12'>
          <section>
          <h1 className='text-4xl font-bold'>{title}</h1>
          </section>
          <section className='mt-10 flex flex-row items-center justify-start gap-2'>
            <div className=' text-base text-white rounded-full'>
              {
                author?.imgUrl
                ?
                <img src={author.imgUrl} alt={author?.name.charAt(0)} className='w-8 h-8 rounded-full object-contain'/>
                : 
                <span className='bg-[#1A8917] hover:bg-[#105a0f] px-3 py-1 rounded-full text-white font-medium text-base '>{author?.name.charAt(0)}</span>
              }
            </div>
            <span className='text-base font-semibold mr-1'>{author?.name}</span>
            <span className='text-[#c4bebe]'>&#8226;</span>
            <span className='text-sm text-[#585858]'>{createdAt?.split('T')[0]}</span>
          </section>
          <section className='mt-10' dangerouslySetInnerHTML={{__html: content}}>
          </section>
          <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          {
            tags?.map((tag) => {
              return(
                <>
                  <Link to={{ pathname: "/search", search: `?tag=${tag.toLocaleLowerCase()}` }} >
                    <span className='px-3 py-1 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>{tag}</span>
                  </Link>
                </>
              )
            })
          }
        </section>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails;

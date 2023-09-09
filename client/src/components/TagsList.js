import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const TagsList = () => {

  const { mostPopularTopics } = useSelector((store) => store.blog);

  return (
    <div className='pt-10 md:min-w-[240px] md:max-w-[368px] md:block hidden border-l-[1px] border-[#f0eeee] relative'>
      <div className='sticky top-10 pl-10 flex flex-col items-start justify-start gap-6'>
        <h1 className='text-base font-medium'>Popular Topics</h1>
        <section className='flex items-center justify-start flex-wrap gap-y-5 gap-x-3 w-[90%] h-auto mt-2 mb-2'>
          {
            mostPopularTopics?.map((element) => {
              const { _id: tag } = element;
              return (
                <>
                  {/* <Link to={{ pathname: "/search", search: `?tag=${tag.toLocaleLowerCase()}` }} > */}
                  <Link to={"/topic/" + tag}>
                    <span className='px-4 py-2 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>
                      {tag}
                    </span>
                  </Link>
                </>
              )
            })
          }
        </section>
      </div>
    </div>
  )
}

export default TagsList;

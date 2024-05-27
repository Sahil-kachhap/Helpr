import Image from 'next/image'
import React from 'react'

function BuisnessDescription({buisness}) {
  return buisness?.name &&(
    <div>
      <h2 className='text-[25px] font-bold'>Description</h2>
      <p className='mt-4 text-lg text-gray-600'>{buisness.about}</p>
      <h2 className='mt-8 text-[25px] font-bold'>Gallery</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 mt-5 gap-5 lg:grid-cols-4'>
        {buisness?.images.map((item, index)=>(
          <Image src={item?.url} key={index} alt='image' width={700} height={200} className='rounded-lg' />
        ))}
      </div>
    </div>
  )
}

export default BuisnessDescription
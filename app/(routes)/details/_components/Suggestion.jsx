import globalApi from '@/app/_services/globalApi';
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BookingSection from './BookingSection';


function Suggestion({buisness}) {
  const [buisnessList, setBuisnessList] = useState([]);

  useEffect(()=>{
     buisness && getBuisnessList()
  }, [buisness]);

  const getBuisnessList = () => {
    globalApi.getBuisnessByCategory(buisness?.category?.name).then(response => {
      setBuisnessList(response?.buisnessLists);
    })
  }

  return (
    <div className='md:pl-10'>
      <BookingSection buisness={buisness}>
        <Button className="flex gap-2 w-full">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
      <div className='hidden md:block'>
      <h2 className='mt-3 text-lg font-bold mb-3'>Similar Buisness</h2>
      <div>
        {buisnessList && buisnessList.map((item, index)=>(
          <Link href={'/details/'+buisness.id} className='flex gap-2 mb-4 hover:border border-primary rounded-lg p-2 cursor-pointer hover:shadow-md'>
            <Image src={item.images[0].url} width={80} height={80} alt={item.name} key={index} className='rounded-lg object-cover'/>
            <div>
              <h2 className='font-bold'>{buisness.name}</h2>
              <h2 className='text-primary'>{buisness.contactPerson}</h2>
              <h2 className='text-gray-400'>{buisness.address}</h2>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Suggestion
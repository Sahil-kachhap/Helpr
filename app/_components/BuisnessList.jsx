import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BuisnessList({ buisnessList, title }) {
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-[22px]'>{title}</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {buisnessList.length > 0 ? buisnessList.map((buisness, index) => (
                    <Link href={'/details/'+buisness.id} key={index} className='shadow-md rounded-lg hover:shadow-lg hover:shadow-primary hover:scale-105 cursor-pointer transition-all ease-in-out'>
                        <Image src={buisness.images[0].url} alt={buisness.name} width={500} height={200} className='h-[150px] md:h-[200px] object-cover rounded-lg' />
                        <div className='flex flex-col items-baseline p-3 gap-1'>
                            <h2 className='p-1 bg-purple-200 text-primary rounded-full px-2 text-[12px]'>{buisness.category.name}</h2>
                            <h2 className='font-bold text-lg'>{buisness.name}</h2>
                            <h2 className='text-primary'>{buisness.contactPerson}</h2>
                            <h2 className='text-gray-500 text-sm'>{buisness.address}</h2>
                            <Button className='mt-3'>Book Now</Button>
                        </div>
                    </Link>
                )) :
                    [1].map((item, index) => (
                        <div className='w-full h-[300px] bg-slate-200 animate-pulse rounded-lg'>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BuisnessList
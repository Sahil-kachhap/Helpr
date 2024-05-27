"use client"
import globalApi from '@/app/_services/globalApi'
import React, { useEffect, useState } from 'react'
import BuisnessInfo from '../_components/BuisnessInfo';
import Suggestion from '../_components/Suggestion';
import BuisnessDescription from '../_components/BuisnessDescription';

function BuisnessDetails({params}) {

  const [buisness, setBuisness] = useState([]);

  useEffect(() => {
    params && getbuisnessByID();
  }, [params]);

  const getbuisnessByID = () => {
    globalApi.getBuisnessByID(params.buisnessID).then(response => {
      setBuisness(response.buisnessList);
    })
  }

  return (
    <div className='py-8 px-10 md:py-20 md:px-36'>
      <BuisnessInfo buisness={buisness}/>

      <div className='grid grid-cols-3 mt-16'>
        <div className='col-span-3 md:col-span-2 order-last md:order-first'>
          <BuisnessDescription buisness={buisness}/>
        </div>
        <div className=''>
          <Suggestion buisness={buisness}/>
        </div>
      </div>

    </div>
  )
}

export default BuisnessDetails
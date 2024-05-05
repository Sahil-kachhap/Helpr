"use client"
import BuisnessList from '@/app/_components/BuisnessList';
import globalApi from '@/app/_services/globalApi';
import React, { useEffect, useState } from 'react'

// here params allows us to retrieve category from the current page url since we have used dynamic routing here in this folder/page/route
function BuisnessCategory({params}) {
 const [buisnessList, setBuisnessList] = useState([]);

  useEffect(()=>{
    console.log(params);
    params && getBuisnessList()
  }, [params]);

  const getBuisnessList = () => {
    globalApi.getBuisnessByCategory(params.category).then(response => {
      setBuisnessList(response?.buisnessLists);
    })
  }

  return (
    <div>
      <BuisnessList title={params.category} buisnessList={buisnessList}/>
    </div>
  )
}

export default BuisnessCategory
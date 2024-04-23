"use client"
import { useEffect, useState } from "react";
import CategoryList from "./_components/CategoryList";
import Hero from "./_components/Hero";
import globalApi from "./_services/globalApi";
import BuisnessList from "./_components/BuisnessList";

export default function Home() {

  const [categories, setCategories] = useState([]);
  const [buisnessList, setBuisnessList] = useState([]);

  useEffect(()=>{
    getCategoryList();
    getAllBuisnessList();
  }, []);

  const getCategoryList = () => {
    globalApi.getCategories().then(response => {
      setCategories(response.categories);
    });
  }

  const getAllBuisnessList = () => {
    globalApi.getBuisnessLists().then(response => {
       setBuisnessList(response.buisnessLists);
    });
  }

  return <div>
    <Hero />
    <CategoryList categoryList={categories}/>
    <BuisnessList buisnessList={buisnessList} title={"Popular Buisness"}/>
  </div>
}

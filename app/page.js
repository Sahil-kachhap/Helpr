"use client"
import { useEffect, useState } from "react";
import CategoryList from "./_components/CategoryList";
import Hero from "./_components/Hero";
import globalApi from "./_services/globalApi";

export default function Home() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    globalApi.getCategories().then(response => {
      setCategories(response.categories);
    });
  }

  return <div>
    <Hero />
    <CategoryList categoryList={categories}/>
  </div>
}

import globalApi from '@/app/_services/globalApi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CategorySideBar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const params = usePathname();

  useEffect(()=>{
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split('/')[2]);
  }, [params]);

  const getCategoryList = () => {
    globalApi.getCategories().then(response => {
      setCategories(response.categories);
    });
  }

  return (
    <div>
        <h2 className='font-bold text-lg text-primary mb-3'>Categories</h2>
        <div>
            {categories.map((category, index) => (
                <Link href={'/search/'+category.name} key={index} className={`flex items-center gap-2 p-3 border rounded-lg mb-3 md:mr-10 cursor-pointer hover:bg-purple-100 hover:text-primary hover:border-primary hover:shadow-md ${selectedCategory == category.name && 'border-primary text-primary shadow-md bg-purple-50'}`}>
                  <Image src={category.icon.url} alt='icon' width={30} height={30}/>
                  <h2>{category.name}</h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategorySideBar
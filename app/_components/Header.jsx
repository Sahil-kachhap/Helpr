"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
  const { user } = useUser();

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8'>
        <h1>House<span className='text-primary font-medium'>Helpr</span></h1>
        <div className='md:flex items-center gap-6 hidden'>
          <Link href={'/'}><h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Home</h2></Link>
          <Link href={'/search/Cleaning'}><h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Services</h2></Link> 
          {user ? <Link href={'/bookings'}><h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Bookings</h2></Link>: ''}
          <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>About us</h2>
        </div>
      </div>
      <div>
        {!user ? <Link href={'/sign-in'}>
          <Button>Login / Sign up</Button>
        </Link> : <UserButton showName={true} afterSignOutUrl='/'/>
        }
      </div>
    </div>
  )
}

export default Header;
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import globalApi from '@/app/_services/globalApi';
import { toast } from 'sonner';
import moment from 'moment';


function BookingSection({children, buisness}) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedTimeSlots, setbookedTimeSlots] = useState([]);
  const name = "Sahil Kachhap";
  const email = "sahil.kachhap111989@gmail.com";

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && bookedSlots();
  }, [date]);

  const getTime = () => {
    const timeList = [];

    for(let i = 10; i <=12; i++){
        timeList.push({
            time: i + ':00 AM'
        })
        timeList.push({
            time: i + ':30 AM'
        })
    }

    for(let i = 1; i <=6; i++){
        timeList.push({
            time: i + ':00 PM'
        })
        timeList.push({
            time: i + ':30 PM'
        })
    }

    setTimeSlot(timeList);
  }

  const saveBooking = () => {
    globalApi.createBooking(buisness.id, moment(date).format("DD-MMM-yyyy"), selectedTime, name, email).then(response => {
        console.log(`Booking created: ${response}`);
        if(response){
            setDate();
            setSelectedTime('');
            toast("Service Booked successfully");
        }
    }, (error) => {
        toast(`Error while creating booking: ${error}`);
    })
  }

  const bookedSlots = () => {
    globalApi.getBookedSlots(buisness.id, moment(date).format("DD-MMM-yyyy")).then(response => {
        if(response){
            setbookedTimeSlots(response.bookings);
        }
    }, (error) => {
        toast(`Error occured: ${error}`);
    })
  }

  const isSlotBooked = (time) => {
    return bookedTimeSlots.find(item => item.time == time)
  }

  return (
    <div>
        <Sheet>
  <SheetTrigger asChild>{children}</SheetTrigger>
  <SheetContent className="overflow-auto">
    <SheetHeader>
      <SheetTitle>Book a Service</SheetTitle>
      <SheetDescription>
        Select Date and Time slot to book a service
        <div className='flex flex-col gap-5 items-baseline'>
            <h2 className='font-bold mt-5'>Select Date</h2>
            <Calendar
                 mode="single"
                 selected={date}
                 onSelect={setDate}
                className="rounded-md border"
            />
        </div>
        <h2 className='my-5 font-bold'>Select Time Slot</h2>
        <div className='grid grid-cols-3 gap-3'>
            {timeSlot.map((item, index) => (
                <Button disabled={isSlotBooked(item.time)} className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${selectedTime == item.time && 'bg-primary text-white'}`} key={index} variant="outline" onClick={() => setSelectedTime(item.time)}>{item.time}</Button>
            ))}
        </div>
      </SheetDescription>
    </SheetHeader>
    <SheetFooter className="mt-5">
              <SheetClose asChild>
                <div className='flex gap-5'>
                    <Button variant="destructive">Cancel</Button>
                    <Button disabled={!(date && selectedTime)} onClick={() => saveBooking()}>Book</Button>
                </div>
              </SheetClose>
            </SheetFooter>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default BookingSection
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_component/BookingList";
import globalApi from "@/app/_services/globalApi";
import moment from "moment";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const email = "sahil.kachhap111989@gmail.com";

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    globalApi.getBookings(email).then(
      (response) => {
        setBookings(response.bookings);
      },
      (error) => {
        console.log(`error occured: ${error}`);
      }
    );
  };

  const filterData = (type) => {
    const result = bookings.filter((item) =>
      type == "booked"
        ? new Date(item.date) >= new Date()
        : new Date(item.date) <= new Date()
    );

    return result;
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingList bookings={filterData("booked")} />
        </TabsContent>
        <TabsContent value="completed">
          <BookingList bookings={filterData("completed")}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Bookings;

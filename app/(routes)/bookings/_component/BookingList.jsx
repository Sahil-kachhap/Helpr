import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";

function BookingList({ bookings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {bookings.map((item, index) => (
        <div key={index} className="flex gap-4 border p-4 rounded-lg mb-5">
          <Image
            src={item.buisnessList.images[0].url}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
          <div className="flex flex-col gap-2">
              <h2 className="font-bold">{item.buisnessList.name}</h2>
              <h2 className="flex gap-2 text-primary"><User />{item.buisnessList.contactPerson}</h2>
              <h2 className="flex gap-2 text-gray-500"><MapPin className="text-primary"/>{item.buisnessList.address}</h2>
              <h2 className="flex gap-2 text-gray-500"><Calendar className="text-primary"/> Service on: <span className="text-black">{item.date}</span></h2>
              <h2 className="flex gap-2 text-gray-500"><Clock className="text-primary"/><span className="text-black">{item.time}</span></h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;

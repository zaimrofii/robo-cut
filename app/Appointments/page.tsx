"use client";
import { useState } from "react";
import { format, addDays } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SuccessPopup from "../components/Popup";

// Tipe data Barber
interface Barber {
  id: number;
  name: string;
  rating: number;
  price: string;
  img: string;
}

// Dummy data untuk barbers
const barbers: Barber = {
  id: 1,
  name: "John Doe",
  rating: 4.5,
  price: "Rp 25.000",
  img: `/bg1.jpg`,
};

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Generate tanggal 30 hari ke depan
  const generateDates = (start: Date = new Date(), days: number = 30): Date[] =>
    Array.from({ length: days }, (_, i) => addDays(start, i));

  const dates: Date[] = generateDates();

  // Generate jam dari 8 AM - 9 PM
  const times: string[] = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    const ampm = hour >= 12 ? "pm" : "am"; // huruf kecil
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${ampm}`;
  });

  const handleDateClick = (date: Date) => setSelectedDate(date);
  const handleTimeClick = (time: string) => setSelectedTime(time);

  // Membagi array jam menjadi card 2 baris x 3 per baris
  const chunkTimes = (arr: string[], chunkSize: number) => {
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const timeCards = chunkTimes(times, 6); // 6 jam per card

  // Format booking date jika sudah dipilih
  const bookingDate = selectedDate
    ? format(selectedDate, "EEEE, dd MMMM", { locale: id })
    : "Belum dipilih";

  return (
    <div className="h-[100vh] w-full bg-gray-100 relative text-gray-800">
      <div className=" relative p-2">
        <Link href={"/"}>
          <ArrowLeft className="p-2 h-9 w-9 bg-white rounded-full" />
        </Link>

        <h1 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 top-0 font-semibold">
          Pemesanan
        </h1>
      </div>
      <div className="px-4 space-y-4 font-sans pb-10 w-auto h-98 overflow-y-auto ">
        {/* 1. Upcoming Barbers */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Robocut Barber</h2>
          <div className="flex space-x-4 overflow-x-auto">
            <div
              key={barbers.id}
              className="w-full p-2 bg-white rounded-xl flex justify-between items-end"
            >
              <div className="flex gap-2">
                <img
                  src={barbers.img}
                  alt={barbers.name}
                  className="w-18 h-18 object-cover rounded-lg"
                />
                <div className="flex flex-col items-start py-1">
                  <span className="text-yellow-500 text-xs">
                    ⭐ {barbers.rating}
                  </span>
                  <h3 className="font-semibold text-sm">{barbers.name}</h3>
                  <span className="text-gray-700 text-sm">{barbers.price}</span>
                </div>
              </div>
              <button className="h-5 px-3 text-white font-light text-[10px] rounded-xl bg-blue-500 hover:opacity-90">
                See More
              </button>
            </div>
          </div>
        </div>

        {/* 2. Chosen Date */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Tentukan Tanggal</h2>
          <div className="flex space-x-2 overflow-x-auto">
            {dates.map((date, idx) => (
              <div
                key={idx}
                onClick={() => handleDateClick(date)}
                className={`flex-shrink-0 w-14 p-3 rounded-2xl text-center cursor-pointer  ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-blue-500 text-white "
                    : "bg-white "
                }`}
              >
                <div className="text-xs font-light">
                  {format(date, "EEE", { locale: id })}
                </div>
                <div className="text-xl">{format(date, "dd")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Chosen Time */}
        <h2 className="text-lg font-semibold mb-2">Tentukan Jam</h2>
        <div className="overflow-x-auto scroll-smooth flex gap-4 snap-x snap-mandatory">
          {timeCards.map((card, idx) => (
            <div
              key={idx}
              className="snap-start flex-shrink-0 w-full rounded-xl  flex flex-col gap-2"
            >
              {chunkTimes(card, 3).map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-between gap-2">
                  {row.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`flex-1 py-2 rounded-full  text-xs font-light ${
                        selectedTime === time
                          ? "bg-blue-500 text-white"
                          : "bg-white  hover:bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Checkout Button + Booking Info */}
      <div className=" absolute bottom-0 w-full h-22  bg-gray-200 rounded-t-4xl">
        {/* date booking otomatis */}
        <div className="w-full flex justify-between px-8 mt-1">
          <p className="text-xs font-semibold text-gray-600 italic ">
            {bookingDate}
          </p>
          <p className="text-xs font-semibold text-gray-600 italic ">
            {selectedTime ?? "Belum dipilih"}
          </p>
        </div>

        <button
          disabled={!selectedDate || !selectedTime}
          className=" absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] py-3 font-light text-sm text-white rounded-full bg-blue-500 disabled:opacity-50"
          onClick={() => setOpen(true)}
        >
          Pesan
        </button>
      </div>
      <SuccessPopup open={open} setOpen={setOpen} />
    </div>
  );
}

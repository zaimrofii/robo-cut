import React from "react";
import {
  Calendar,
  Percent,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import Link from "next/link";

// Helper untuk format tanggal Indonesia
const formatTanggal = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

const Dashboard: React.FC = () => {
  const today = new Date();
  const username = "Budi";

  // Data dummy untuk riwayat
  const riwayat = [
    {
      id: 1,
      tanggal: "12 Agustus 2025",
      img: "/gambar1.jpg",
    },
    {
      id: 2,
      tanggal: "15 Agustus 2025",
      img: "/gambar2.jpg",
    },
    {
      id: 3,
      tanggal: "18 Agustus 2025",
      img: "/gambar3.jpg",
    },
  ];

  return (
    <div className="max-w-sm mx-auto bg-blue-500 h-[100vh] overflow-hidden">
      {/* Bagian Sapaan */}
      <section
        className="relative p-4 h-25 flex flex-col justify-end bg-cover bg-center text-white "
        // style={{ backgroundImage: "url(/bg1.jpg)" }}
      >
        <h1 className="text-xl font-semibold ">Hai, {username} </h1>
        <p className="text-gray-100 text-xs flex items-center gap-2">
          {formatTanggal(today)}
        </p>
      </section>

      {/* Bagian Discount */}
      <section className="bg-gray-100 pt-4 rounded-t-4xl pb-4 text-gray-800">
        <div className="w-9/10 bg-gray-100 mx-auto bg-orange-50 p-4 rounded-xl flex items-center justify-between shadow">
          <div>
            <h2 className="text-sm font-semibold flex items-center gap-2">
              Discont Anda
            </h2>
            <p className="text-xs text-gray-600">
              Nikmati penawaran spesial hanya untukmu
            </p>
            <button className="mt-2 text-xs bg-orange-500 text-white px-3 py-1 rounded-lg shadow">
              Lihat Diskon
            </button>
          </div>
        </div>
      </section>

      {/* Bagian Riwayat */}
      <section className="bg-gray-100 px-4 h-full text-gray-800">
        <h2 className="mx-auto font-semibold mb-2 flex items-center gap-2">
          Riwayat
        </h2>
        <div className="mx-auto flex items-center ">
          <div className="flex overflow-x-auto gap-3 no-scrollbar">
            {riwayat.map((item, index) => (
              <Link href={"/Customerhistory"} key={item.id}>
                <div className="w-34 bg-white rounded-xl p-2 flex-shrink-0 relative">
                  <div className="relative">
                    <img
                      src={item.img}
                      alt="riwayat"
                      className="w-full h-30 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-light px-2 py-0.5 rounded">
                        Terbaru
                      </span>
                    )}
                  </div>
                  <p className="text-sm flex gap-1 items-center pt-2">
                    <User className="w-4 h-4" /> Agus Suseno
                  </p>
                  <p className="text-[11px] mt-1 text-gray-400 font-light ">
                    {item.tanggal}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Link href={"/Appointments"}>
        <button className="absolute bottom-2 w-9/10 left-1/2 text-sm -translate-x-1/2 mt-3 bg-blue-500 to-indigo-500 text-white py-2 rounded-xl font-medium shadow">
          Pesan Sekarang
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;

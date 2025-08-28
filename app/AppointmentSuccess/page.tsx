"use client";
import { useState } from "react";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AppointmentSuccess() {
  // Dummy state lokal
  const [appointment] = useState({
    date: "20 Agustus 2025",
    time: "14:00",
    service: "Haircut + keramas",
    discount: "gratis keramas",
    status: "Success",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-sm">
      {/* Gambar & Tagline */}
      <div className="text-center">
        <CheckCircle2 size={50} className="text-blue-500 mx-auto mb-5" />
        <h1 className="text-xl font-bold text-gray-800">Pesanan Berhasil!</h1>
        <p className="text-gray-500 mt-2">
          Terima kasih, kami akan mengingatkan 10 menit sebelum jadwal
        </p>
      </div>

      {/* Detail Pesanan */}
      <div className="mt-6 w-full max-w-md bg-white rounded-2xl shadow-md p-3 text-[10px] space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">Tanggal</span>
          <span className="font-medium font-semibold">{appointment.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Jam</span>
          <span className="font-medium  font-semibold">{appointment.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Layanan</span>
          <span className="font-medium font-semibold">
            {appointment.service}
          </span>
        </div>

        {appointment.discount && (
          <div className="flex justify-between">
            <span className="text-gray-500">Diskon</span>
            <span className="font-medium text-green-600 font-semibold">
              {appointment.discount}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center ">
          <span className="text-gray-500">Status</span>
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <CheckCircle className="w-3 h-3" /> {appointment.status}
          </span>
        </div>
      </div>

      {/* Tombol */}
      <Link href={"/"}>
        <button className="absolute w-9/10 bottom-2 left-1/2 -translate-x-1/2 mt-8 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-xl shadow hover:bg-green-700 transition">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}

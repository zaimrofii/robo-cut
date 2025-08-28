"use client";
import { useState } from "react";
import { format } from "date-fns";

// Dummy data histori
const historyData = [
  {
    date: "2025-08-19",
    images: ["/gambar1.jpg", "/gambar2.jpg"],
    description: "rapi , tapi pinggir kosong.",
    comments: [],
  },
  {
    date: "2025-08-15",
    images: ["/gambar3.jpg", "/gambar4.jpg"],
    description: "tidak terlalu tinggi.",
    comments: [],
  },
  {
    date: "2025-12-15",
    images: ["/gambar1.jpg", "/gambar2.jpg"],
    description: "tipis kosong fade.",
    comments: [],
  },
];

export default function BarberHistory() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedHistory = historyData[selectedDateIndex];

  return (
    <div className="p-4 font-sans h-screen bg-gray-100 overflow-y-auto flex flex-col gap-4">
      {/* 1. Gambar utama */}
      <div className="w-full h-64 rounded-xl overflow-hidden">
        <img
          src={selectedHistory.images[selectedImageIndex]}
          alt="Hasil potongan"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail gambar */}
      <div className="flex gap-2 overflow-x-auto">
        {selectedHistory.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              idx === selectedImageIndex
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => setSelectedImageIndex(idx)}
          />
        ))}
      </div>

      {/* 2. Tombol tanggal */}
      <div className="flex gap-2 overflow-x-auto">
        {historyData.map((history, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedDateIndex(idx);
              setSelectedImageIndex(0); // reset gambar utama saat ganti tanggal
            }}
            className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap ${
              idx === selectedDateIndex
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 "
            }`}
          >
            {format(new Date(history.date), "dd MMM yyyy")}
          </button>
        ))}
      </div>

      {/* 3. Keterangan */}
      <div>
        <h2 className="font-semibold text-sm mb-1  text-gray-800">
          Keterangan
        </h2>
        <p className="text-gray-700 text-xs">{selectedHistory.description}</p>
      </div>

      {/* 4. Komentar */}
      {/* <div>
        <h2 className="font-semibold text-sm mb-2">Komentar</h2>
        <div className="flex flex-col gap-2">
          {selectedHistory.comments.length > 0 ? (
            selectedHistory.comments.map((comment, idx) => (
              <div
                key={idx}
                className="bg-white px-3 py-2 rounded-lg shadow text-xs text-gray-700"
              >
                {comment}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xs">Belum ada komentar</p>
          )}
        </div>
      </div> */}
    </div>
  );
}

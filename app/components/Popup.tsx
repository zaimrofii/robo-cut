import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SuccessPopup({ open, setOpen }: Props) {
  return (
    <div className="p-6">
      {/* Overlay */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-50 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Popup Card */}
        <div
          className={`bg-white w-9/10 rounded-xl shadow-lg p-6 transform transition-all duration-300 text-center ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <CheckCircle2 className="mx-auto text-green-600" size={50} />
          <h2 className="mt-4 font-semibold text-gray-800">
            Pesanan Berhasil!
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Terima kasih, pesananmu sudah tercatat di sistem.
          </p>
          <Link href={"/AppointmentSuccess"}>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Tutup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

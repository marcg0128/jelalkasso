"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Admin() {
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        axios.get("http://localhost:8000/protected", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setMessage(res.data.message))
        .catch(() => router.push("/login"));
    }, []);

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p>{message}</p>

            <button
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => router.push("/admin/edit-reviews")}
            >
                Go to Edit Reviews
            </button>
        </div>
    );
}

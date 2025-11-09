'use client';
import Image from "next/image";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                alert("Login failed: " + data.detail);
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.access_token);
            router.push("/admin");
        } catch (err) {
            console.error(err);
            alert("Login failed!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <Image src={"/logo.svg"} alt="Logo" width="130" height="130"
                       className=""/>
            <form className="mt-10 p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="mb-4">
                    <label className="block text-lg mb-2" htmlFor="username">Benutzername</label>
                    <input
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}

                        className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-lg mb-2" htmlFor="password">Passwort</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Anmelden
                </button>
            </form>

        </div>
    );
}
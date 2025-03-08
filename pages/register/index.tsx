"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import styles from "../../styles/Register.module.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className={`flex min-h-screen items-center justify-center p-4 ${styles.registerBackground}`}>
      <div className={styles.overlay} />

      <Card className={styles.card}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold ">
            Create an account
          </CardTitle>
          <CardDescription className="text-white font-bold">
            Enter your information to start your fitness journey
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-bold">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white font-bold">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white font-bold">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-bold">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-bold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="outline"
              className="px-8 w-full text-lg font-semibold text-white/80 bg-black/60 hover:bg-black/90 hover:text-white/90"
            >
              Register
            </Button>
            <div className="text-center text-sm text-white">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

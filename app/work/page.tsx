"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/#bedrooms"); }, [router]);
  return null;
}

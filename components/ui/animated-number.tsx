"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { money } from "@/lib/utils";

export function AnimatedMoney({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 90, damping: 22 });
  useEffect(() => { spring.set(value); }, [spring, value]);
  const text = useTransform(spring, (v) => money(Math.round(v / 50) * 50));
  return <motion.span className={className}>{text}</motion.span>;
}

"use client";

import { MotionConfig, motion } from "motion/react";

type Props = { children: React.ReactNode; tre?: number; className?: string };

export function HienDan({ children, tre = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay: tre, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CauHinhChuyenDong({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

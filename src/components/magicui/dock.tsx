"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 48;
const DEFAULT_DISTANCE = 120;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

interface DockContextValue {
  mousex: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={{ mousex, magnification, distance }}>
        <div
          ref={ref}
          onMouseMove={(e) => mousex.set(e.pageX)}
          onMouseLeave={() => mousex.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }))}
        >
          {children}
        </div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const fallbackMousex = useMotionValue(Infinity);
  const ctx = useContext(DockContext);
  const mousex = ctx?.mousex ?? fallbackMousex;
  const magnification = ctx?.magnification ?? DEFAULT_MAGNIFICATION;
  const distance = ctx?.distance ?? DEFAULT_DISTANCE;

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };

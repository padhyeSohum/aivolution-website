import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = new Date();
COUNTDOWN_FROM.setDate(COUNTDOWN_FROM.getDate() + 100);

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = () => {
    const end = COUNTDOWN_FROM;

    const now = new Date();

    const distance = +end - +now;

    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  return (
    <div className="p-4 bg-gradient-to-br from-violet-600 to-indigo-600">
      <div className="flex justify-center place-center">
        <CountdownItem num={"??"} text="days" />
        <CountdownItem num={"??"} text="hours" />
        <CountdownItem num={"??"} text="minutes" />
        <CountdownItem num={"??"} text="seconds" />
      </div>
    </div>
  );
};

const CountdownItem = ({ num, text }: { num: any; text: string }) => {
  const updatedNum = num === 0 ? 61 : num;

  return (
    <div className="w-1/4 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center ">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={updatedNum}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium"
          >
            {updatedNum}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm lg:text-base font-light text-slate-500">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { PI_MODE } from '../config';

const SOCKET_PORT = 4444;

function Temp() {
  const [temp, setTemp] = useState<number | null>(null);
  const [socketOpen, setSocketOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!PI_MODE) {
      return;
    }
    const socket = io(`http://localhost:${SOCKET_PORT}`, {
      reconnectionAttempts: 5,
    });

    socket.on('newTemp', (newTemp) => {
      setTemp(newTemp);
    });

    socket.on('connect', () => {
      setSocketOpen(true);
    });

    return () => {
      socket.disconnect();
      setSocketOpen(false);
    };
  }, []);

  return socketOpen && temp ? (
    <div className="absolute px-3 items-center top-2 right-2 z-10 text-3xl">
      {temp && temp < 60 && <p className="text-slate-100">{temp}°C</p>}
      {temp && temp >= 60 && <p className="text-red-500">{temp}°C</p>}
    </div>
  ) : null;
}

export default Temp;

"use client";
import { useState } from "react";

import { EnterEmail } from "./EnterEmail";
import { EnterCode } from "./EnterCode";
import { clsx } from "clsx";

export function ResetWrapper(className: { className: string }) {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState("");
  const [user_id, setUserId] = useState<string>("");
  return (
    <div>
      <EnterEmail
        message={message}
        email={email}
        setEmail={setEmail}
        setMessage={setMessage}
        setUserId={setUserId}
        className={clsx(`${className.className}`, {
          "opacity-0": message === "Codigo Enviado",
        })}
      />
      {message === "Codigo Enviado" ? (
        <EnterCode
          user_id={user_id}
          email={email}
          className={clsx(`${className.className}`)}
        />
      ) : (
        message
      )}
    </div>
  );
}

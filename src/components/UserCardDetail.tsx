"use client";

import { IconMailForward, IconMapPins } from "@tabler/icons-react";

export default function UserCardDetail({ email, address}:any) {
  return (
    <div className="text-center">
      <p>
        <IconMailForward /> {email}
      </p>
      <p>
        <IconMapPins /> {address}
      </p>
    </div>
  );
}
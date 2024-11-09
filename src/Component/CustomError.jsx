import React from "react";

export default function CustomError({errormsg}) {
  return (
    <p className="py-5 px-2 flex justify-center">
      An error has occurred: {errormsg}
    </p>
  );
}

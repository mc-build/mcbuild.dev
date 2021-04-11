import { useEffect, useState } from "react";

export interface IMcBuildVersionProps {
  prefix?: string;
}
let mcb_version = null;
export function McBuildVersion({ prefix = "" }: IMcBuildVersionProps) {
  const [displayVersion, setDisplayVersion] = useState(null);
  useEffect(() => {
    if (mcb_version === null) {
      mcb_version = fetch("https://unpkg.com/mc-build@2.10.3/package.json")
        .then((res) => res.json())
        .then((pkg) => (mcb_version = pkg.version));
    }
    if (mcb_version instanceof Promise) {
      mcb_version.then(() => {
        setDisplayVersion(mcb_version);
      });
    } else if (typeof mcb_version === "string") {
      setDisplayVersion(mcb_version);
    }
  }, []);
  return (
    <span>
      {prefix}
      {displayVersion}
    </span>
  );
}

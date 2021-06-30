import styles from "./Nav.module.less";
import { MDContentContext } from "./MDContentNav";
import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

export function Nav() {
  const { headers } = useContext(MDContentContext);
  const [current, setCurrent] = useState(0);
  const els = useRef<(HTMLElement | void)[]>([]);
  useEffect(() => {
    els.current = headers.map((header) => {
      return document.getElementById(header.id);
    });
  }, [headers]);
  useEffect(() => {
    const scrollHandler = (e) => {
      for (let i = 0; i < els.current.length; i++) {
        const rect = (els.current[i] as HTMLElement).getBoundingClientRect();
        const { top, bottom } = rect;
        if (top >= 0 && bottom >= 0) {
          setCurrent(i);
          break;
        }
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <div className={styles.headers}>
      {headers.map((header, index) => (
        <p
          key={header.id}
          className={classNames({
            [styles.selected]: index === current,
            [styles.item]: true,
          })}
          style={{
            paddingLeft: `${header.level - 1}em`,
          }}
        >
          <a href={"#" + header.id}>{header.name}</a>
        </p>
      ))}
    </div>
  );
}

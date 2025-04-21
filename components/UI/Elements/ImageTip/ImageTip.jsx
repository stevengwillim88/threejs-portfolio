import React from "react";
import styles from "./ImageTip.module.scss";
import Image from "next/image";
import commonConfig from "@/database/config/metadata.json";
import Link from "next/link";

export default function ImageTip({ data, children }) {
  return (
    <div className={styles.element}>
      <figure className={styles.figure}>
        <Image
          src="/steven.jpg"
          alt={commonConfig.metadata.title}
          width={40}
          height={40}
          loading={"lazy"}
        />
      </figure>
      <div className={styles.detail}>
        <div className={styles.date}>{data.date}</div>
        <div>{children}</div>
        <Link
          href={data.site}
          target={data.site.startsWith("http") ? "_blank" : undefined}
        >
          <span className={styles.title}>Live Website</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";

import styles from "./SkillSet.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Title from "@/components/UI/Elements/Title/Title";
import Skills from "@/database/Skills.json";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import Image from "next/image";
import Ticker from "@/components/UI/Elements/Ticker/Ticker";

export default function SkillSet() {
  gsap.registerPlugin(
    Draggable,
    InertiaPlugin,
    MotionPathPlugin,
    ScrollTrigger
  );

  const container = useRef();
  const collisionDiv = useRef();
  const sphere = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const [dragStatus, setDragStatus] = useState(null);

  // GSAP Animations
  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(`.${styles.box}`);

      const handleResize = () => {
        // MotionPath
        gsap.set(boxes, {
          motionPath: {
            path: "#circularCarouselPath",
            align: "#circularCarouselPath",
            alignOrigin: [0.5, 0.5],
            start: -0.25,
            end: (i) => i / boxes.length - 0.25,
            autoRotate: true,
          },
        });
      };

      // Draggable
      setActiveIndex(0);
      Draggable.create(`.${styles.circularCarousel}`, {
        type: "rotation",
        inertia: true,
        snap: (endVal) => gsap.utils.snap(360 / boxes.length, endVal),
        onPress: () => {
          setDragStatus("pressed");
        },
        onRelease: () => {
          setDragStatus(null);
        },
        onDragStart: () => {
          setActiveIndex(null);
        },
        onThrowComplete: () => {
          let collisionDivRect = collisionDiv.current?.getBoundingClientRect();
          let newActiveIndex = null;

          boxes.forEach((box, index) => {
            let boxRect = box.getBoundingClientRect();
            if (
              collisionDivRect.x < boxRect.x + boxRect.width &&
              collisionDivRect.x + collisionDivRect.width > boxRect.x &&
              collisionDivRect.y < boxRect.y + boxRect.height &&
              collisionDivRect.y + collisionDivRect.height > boxRect.y
            ) {
              newActiveIndex = index;
            }
          });
          setActiveIndex(newActiveIndex);
        },
      });

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: container }
  );

return (
    <>
        <section className={`${styles.section}`} id={"skills"} ref={container}>
            <div className={styles.blobs}>
                <Blobs
                    type={"v2"}
                    classVariable={`${styles.blob} ${styles.blobV2}`}
                />
                <Blobs
                    type={"v1"}
                    classVariable={`${styles.blob} ${styles.blobV1}`}
                />
            </div>
            <div className={styles.grid}>
                <Title color={"white"}>
                    Skills
                </Title>
                <div className={styles.circularCarouselWrapper}>
                    <div className={styles.collisionDiv} ref={collisionDiv}></div>
                    <div className={styles.circularCarousel}>
                        <svg viewBox="0 0 400 400">
                            <path
                                strokeWidth="2"
                                stroke="red"
                                id="circularCarouselPath"
                                fill="none"
                                d="M396,200 C396,308.24781 308.24781,396 200,396 91.75219,396 4,308.24781 4,200 4,91.75219 91.75219,4 200,4 308.24781,4 396,91.75219 396,200 z"
                            ></path>
                        </svg>
                        {Skills.map((skill, index) => (
                            <div
                                key={index}
                                className={`${styles.box} ${
                                    activeIndex === index ? styles.isActive : ""
                                }`}
                            >
                                <Image
                                    className={styles.image}
                                    src={skill.image}
                                    alt={skill.title}
                                    width={100}
                                    height={100}
                                    id="skillImage"
                                    loading={"lazy"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.circularDescriptionsWrapper}>
                        {Skills.map((skill, index) => (
                            <div
                                key={index}
                                className={`${styles.circularDescriptions} ${
                                    activeIndex === index ? styles.isActive : ""
                                }`}
                            >
                                <h2 className={styles.title}>{skill.title}</h2>
                                <p className={styles.description}>{skill.description}</p>
                                <div className={styles.subtitle}>
                                    {skill.subtitle.map((i, x) => (
                                        <p key={x}>{i}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.dragMe}>
                        <svg
                            width="301"
                            height="161"
                            viewBox="0 0 301 161"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* SVG content */}
                        </svg>
                    </div>
                </div>
            </div>

            <div ref={sphere} className={styles.sphereWrapper}>
                <div
                    className={`${styles.sphere} ${
                        dragStatus === "pressed" ? styles.isActive : ""
                    }`}
                ></div>
            </div>
        </section>
        <Ticker
            words={[
                "accessibility",
                "responsiveness",
                "interactive",
                "performance",
            ]}
        ></Ticker>
    </>
);
}

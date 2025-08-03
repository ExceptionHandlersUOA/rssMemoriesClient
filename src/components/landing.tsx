"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BookAnimation } from "@/components/ui/book-animation"
import { BackArrow } from "./ui/back-arrow"
import { OpenBookAnimation } from "./ui/open-book-animation"
import styles from "./landing.module.css"
import Link from "next/link"

export function Landing() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleBookClick = () => {
    setIsAnimating(true)
  }

  return (
    <div className="bg-background relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Header - hidden during animation */}
      {!isAnimating && <Header />}

      <div className="flex flex-col items-center gap-8">
        {/* Book Image with Shaking Animation */}
        <BookAnimation isAnimating={isAnimating} onClick={handleBookClick} />

        {/* Optional content below the book */}
        <div className={`text-center ${isAnimating ? styles.fadeOut : ""}`}>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Web Memories</h1>
          <p className="text-muted-foreground text-lg">
            Your memories, organized and preserved
          </p>
        </div>
      </div>

      {/* Open Book Animation */}
      {isAnimating && <OpenBookAnimation></OpenBookAnimation>}

      {/* Open Book Animation */}
      {isAnimating && (
        <div
          className={`${styles.bookContent} absolute inset-0 flex items-center justify-between px-8 text-center md:px-16`}
        >
          {/* Back Arrow Icon */}
          <BackArrow onClick={() => setIsAnimating(false)} />

          {/* Book Content */}

          <div
            className="flex flex-1 flex-col items-center justify-center"
            style={{ paddingRight: "8%" }}
          >
            <div
              className={styles.bookContentWrapper}
              style={{ maxWidth: "85%", maxHeight: "70%" }}
            >
              <h2
                className={`${styles.bookTitle} mb-4 text-2xl font-bold md:text-4xl`}
              >
                Web Memories
              </h2>
              <div className={`${styles.contentDivider} mb-4`}></div>
              <p className={`${styles.bookText} text-lg md:text-2xl`}>
                Web Memories helps you save, organize, and revisit your favorite
                web content and personal memories in one secure place.
              </p>
            </div>
          </div>
          <div
            className="flex flex-1 flex-col"
            style={{ paddingTop: "10%", paddingBottom: "10%" }}
          >
            <div className={`${styles.contentDivider} mb-8 opacity-0`}></div>
            <div
              className="flex items-start justify-center"
              style={{ paddingTop: "5%", paddingBottom: "5%" }}
            >
              <div className={styles.welcomeTextContainer}>
                <h2
                  className={`${styles.welcomeText} text-1xl font-bold md:text-2xl`}
                >
                  Your memories deserve a special place.
                </h2>
                <br></br>
                <h2
                  className={`${styles.welcomeText} text-1xl font-bold md:text-2xl`}
                >
                  Sign in to keep writing your story and revisit the memories
                  that matter most.
                </h2>
                <br></br>
              </div>
            </div>
            <div className={`${styles.contentDivider} mb-8`}></div>
            <div
              className="flex items-end justify-center"
              style={{ paddingTop: "5%" }}
            >
              <Link
                href="/login"
                className={`${styles.getStartedButton} cursor-pointer`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {!isAnimating && <Footer />}
    </div>
  )
}

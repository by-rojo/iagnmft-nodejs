import Image from 'next/image'
import React from 'react'
import { DEFAULT_BLUR_URL } from '../../constants'

const Hero: React.FC = () => {
  return (
    <section className="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
      <Image
        priority
        loading="eager"
        alt="hero image"
        src={process.env.TEST_IMAGE_URL ?? DEFAULT_BLUR_URL}
        layout="fill"
        objectFit="cover"
        quality={100}
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR_URL}
      />
      <div className="col-md-5 p-lg-5 mx-auto my-5 position-relative text-white">
        <h1 className="display-4 fw-normal">Punny headline</h1>
        <p className="lead fw-normal">
          And an even wittier subheading to boot. Jumpstart your marketing
          efforts with this example based on Apple’s marketing pages.
        </p>
        <a className="btn btn-outline-light" href="#">
          Coming soon
        </a>
      </div>
    </section>
  )
}

export default Hero

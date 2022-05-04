import Facebook from 'bootstrap-icons/icons/facebook.svg'
import Instagram from 'bootstrap-icons/icons/instagram.svg'
import Pinterest from 'bootstrap-icons/icons/pinterest.svg'
import Tiktok from 'bootstrap-icons/icons/tiktok.svg'
import Twitter from 'bootstrap-icons/icons/twitter.svg'
import Youtube from 'bootstrap-icons/icons/youtube.svg'
import Link from 'next/link'
import React from 'react'
import {
  FACEBOOK_PROFILE_URL,
  INSTAGRAM_PROFILE_URL,
  PINTEREST_PROFILE_URL,
  TIKTOK_PROFILE_URL,
  TWITTER_PROFILE_URL,
  YOUTUBE_PROFILE_URL,
  COMPANY_NAME,
} from '../../constants'

const socialIcons = [
  {
    alt: 'tiktok',
    Icon: Tiktok,
    href: TIKTOK_PROFILE_URL,
  },
  {
    alt: 'pinterest',
    Icon: Pinterest,
    href: PINTEREST_PROFILE_URL,
  },
  {
    alt: 'youtube',
    Icon: Youtube,
    href: YOUTUBE_PROFILE_URL,
  },
  {
    alt: 'instagram',
    Icon: Instagram,
    href: INSTAGRAM_PROFILE_URL,
  },
  {
    alt: 'facebook',
    Icon: Facebook,
    href: FACEBOOK_PROFILE_URL,
  },
  {
    alt: 'twitter',
    Icon: Twitter,
    href: TWITTER_PROFILE_URL,
  },
]

const year = new Date().getFullYear()

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link passHref href="/">
              <a className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <svg className="bi" width="30" height="24">
                  <use xlinkHref="#bootstrap"></use>
                </svg>
              </a>
            </Link>
            <span className="text-muted">
              © {year} {COMPANY_NAME}
            </span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {socialIcons.map(({ alt, Icon, href }) => {
              return (
                <li key={alt} className="ms-3">
                  <Link href={href} passHref>
                    <a className="text-muted" target="_blank" aria-label={alt}>
                      <Icon />
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </footer>
      </div>
    </footer>
  )
}
export default Footer

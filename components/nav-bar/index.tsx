import cNames from 'classnames'
import Link from 'next/link'
import React, { useState } from 'react'
import { COMPANY_NAME, NAV_BREAKPOINT } from '../../constants'
import useStaticHomePageData from '../home-page/hooks'
import styles from './style.module.scss'

const NavBar: React.FC = () => {
  const { menu } = useStaticHomePageData()
  const [hoveredMenuItemID, setHoveredMenuItemID] = useState(-1)
  const [toggled, setToggled] = useState(false)
  const onOpenDropdown = (ID: number) => {
    if (window.innerWidth > NAV_BREAKPOINT) setHoveredMenuItemID(ID)
  }

  const onCloseDropdown = () => {
    if (window.innerWidth > NAV_BREAKPOINT) setHoveredMenuItemID(-1)
  }

  const getDropdownProps = (ID: number) => {
    return {
      onMouseEnter: () => onOpenDropdown(ID),
      onMouseLeave: () => onCloseDropdown(),
      onFocus: () => onOpenDropdown(ID),
    }
  }

  return (
    <nav
      className={cNames(
        'navbar sticky-top navbar-light bg-light navbar-expand-lg',
        styles.navBar
      )}
    >
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand">{COMPANY_NAME}</a>
        </Link>
        <button
          onClick={() => setToggled(!toggled)}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={cNames('navbar-collapse', 'collapse', {
            show: toggled,
          })}
        >
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            {menu?.data?.map((menuItem) => {
              const isDropdown = menuItem?.child_items?.length > 0
              return (
                <div
                  className={cNames('nav-item', 'dropdown')}
                  key={menuItem.ID}
                >
                  <>
                    <Link href={menuItem.url} passHref>
                      <a
                        {...getDropdownProps(menuItem.ID)}
                        className={cNames('nav-link', {
                          'dropdown-toggle': isDropdown,
                        })}
                        role="button"
                        aria-expanded="false"
                      >
                        {menuItem.title}
                      </a>
                    </Link>
                    {isDropdown && (
                      <div
                        {...getDropdownProps(menuItem.ID)}
                        className={cNames({
                          'dropdown-menu': isDropdown,
                          show: menuItem.ID === hoveredMenuItemID,
                        })}
                      >
                        {menuItem?.child_items?.map((childMenuItem) => {
                          return (
                            <Link
                              key={childMenuItem.ID}
                              href={childMenuItem.url}
                              passHref
                            >
                              <a
                                tabIndex={0}
                                className="nav-link dropdown-item"
                                onClick={() => onCloseDropdown()}
                                onFocus={() => onOpenDropdown(menuItem.ID)}
                              >
                                {childMenuItem.title}
                              </a>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

// tslint:disable

import * as React from 'react'

const styles: any = require('./styles.css')

export default function SpinnerAnimation(): JSX.Element {
  return (
    <svg
      style={{ enableBackground: 'new 0 0 80 80' }}
      version="1.1"
      viewBox="0 0 80 80"
      x="0px"
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      y="0px"
    >
      {/* <style type="text/css">
        .st0{fill:url(#SVGID_1_);}
        .st1{fill:#FFFFFF;}
        .st2{fill:url(#SVGID_2_);}
      </style> */}
      <g id="Spin">
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          dur="5s"
          from="0 40 40"
          repeatCount="indefinite"
          to="360 40 40"
          type="rotate"
        />
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="40" y2="80">
          <stop offset="0" style={{ stopColor: '#BE00FF' }} />
          <stop offset="1" style={{ stopColor: '#A618D7' }} />
        </linearGradient>
        <circle className={styles.st0} cx="40" cy="40" r="40" />
        <g>
          <circle className={styles.st1} cx="40.2" cy="72.9" r="1.5" />
          <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -14.5623 21.8392)" className={styles.st1} cx="11.6" cy="23.5" rx="1.5" ry="1.5" />
          <ellipse transform="matrix(0.8661 -0.4999 0.4999 0.8661 -26.6736 13.3775)" className={styles.st1} cx="11.6" cy="56.5" rx="1.5" ry="1.5" />
          <ellipse transform="matrix(0.866 -0.5001 0.5001 0.866 -2.5613 37.5035)" className={styles.st1} cx="68.7" cy="23.5" rx="1.5" ry="1.5" />
          <circle className={styles.st1} cx="40.2" cy="7.1" r="1.5" />
          <path className={styles.st1} d="M66.2,55c0.7-1.3,2.3-1.8,3.6-1.2l0-27.5c-1.3,0.5-2.9,0-3.6-1.2c-0.7-1.3-0.4-2.9,0.7-3.8L43.1,7.5
            c-0.2,1.4-1.4,2.5-2.9,2.5c-1.5,0-2.7-1.1-2.9-2.5L13.4,21.2c1.1,0.9,1.5,2.5,0.7,3.8c-0.7,1.3-2.3,1.8-3.6,1.2l0,27.5
            c1.3-0.5,2.9,0,3.6,1.2c0.7,1.3,0.4,2.9-0.7,3.8l23.8,13.8c0.2-1.4,1.4-2.5,2.9-2.5c1.5,0,2.7,1.1,2.9,2.5l23.8-13.8
            C65.8,57.9,65.4,56.3,66.2,55z" />
          <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -14.5635 87.7191)" className={styles.st1} cx="68.7" cy="56.5" rx="1.5" ry="1.5" />
        </g>
      </g>
      <g id="Static">
        <g>
          <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="15.2075" y1="39.9998" x2="65.1282" y2="39.9998">
            <stop offset="0" style={{ stopColor: '#BE00FF' }} />
            <stop offset="1" style={{ stopColor: '#A618D7' }} />
          </linearGradient>
          <path className={styles.st2} d="M45.8,50.8c2.7-1.5,4.5-3.9,5.5-6.6c1.4-4.1,7.8-1.8,5.4,3.6c0,0,0,0.1-0.1,0.1l7.8,4.5
            c0.7,0.4,0.9,1.2,0.5,1.9c-0.4,0.7-1.2,0.9-1.9,0.5l-7.8-4.5c-1.5,2.4-3.6,4.4-6.2,6c-2.3,1.4-4.8,2.1-7.3,2.4v8.5
            c0,0.8-0.7,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4v-8.4c-5.4-0.3-11.1-3.1-14.4-8l-7.1,4.1c-0.7,0.4-1.5,0.2-1.9-0.5
            c-0.4-0.7-0.2-1.5,0.5-1.9l7.1-4.1c-0.5-1-0.8-2-1.1-3l-0.7-3.7c-0.3-3.4,0.4-6.8,2-9.8l-7.2-4.2c-0.7-0.4-0.9-1.2-0.5-1.9
            c0.4-0.7,1.2-0.9,1.9-0.5l7.3,4.2c1.5-2.1,3.5-3.9,5.8-5.3c2.6-1.5,5.5-2.3,8.4-2.5v-8.9c0-0.8,0.7-1.4,1.4-1.4
            c0.8,0,1.4,0.6,1.4,1.4v8.9c5.1,0.5,10.3,3.4,13.4,8.1l7.9-4.6c0.7-0.4,1.5-0.2,1.9,0.5c0.4,0.7,0.1,1.5-0.5,1.9l-10.8,6.2
            c0,0-0.1,0-0.1,0.1l-2.6,1.5l-5.4,3.1l-15.7,9.1C33.5,52.4,40.4,53.9,45.8,50.8z" />
          <path className={styles.st1} d="M33.6,29.6c-5.3,3-5.9,6.8-5.8,12.3l19.5-11.3C43.5,27.6,38,27,33.6,29.6z" />
        </g>
      </g>
    </svg>
  )
}

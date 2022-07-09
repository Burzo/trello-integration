import { Typography } from '@material-ui/core'
import * as React from 'react'
import logo from './vavcer.png'

export const Voucher = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Pridobili smo sredstva za operacijo »Vavčer za digitalni marketing«.
      </Typography>
      <Typography gutterBottom>
        Naložbo izvedbe spletne strani in mobilne aplikacije sofinancirata
        Republika Slovenija in Evropska unija iz Evropskega sklada za regionalni
        razvoj.{' '}
      </Typography>
      <Typography component="ul" style={{ marginLeft: '1rem' }}>
        <Typography component="li">
          Povezava do spletne strani Podjetniškega sklada:&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://podjetniskisklad.si/sl"
          >
            https://podjetniskisklad.si/sl
          </a>
        </Typography>
        <Typography component="li">
          Povezava do spletne strani Ministrstvo za gospodarski razvoj in
          tehnologijo:&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.gov.si/"
          >
            https://www.gov.si/
          </a>
        </Typography>
        <Typography component="li">
          Povezava do spletne strani EU Skladi:&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://eu-skladi.si"
          >
            http://eu-skladi.si
          </a>
        </Typography>
      </Typography>
      <img
        src={logo}
        alt="Vavcer"
        style={{
          backgroundColor: 'black',
          maxWidth: 450,
          padding: '.4rem',
          marginTop: '1rem',
        }}
      />
    </div>
  )
}

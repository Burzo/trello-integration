import logo from './vavcer.png'
import { Typography } from '@material-ui/core'
import * as React from 'react'

export const AbsoluteVoucher = () => {
  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 'auto',
      }}
    >
      <Typography style={{ fontSize: '.7rem', marginBottom: '.5rem' }}>
        V okviru javnega poziva »
        <a href="/vavcer-za-digitalni-marketing">
          Vavčer za digitalni marketing
        </a>
        « je podjetje DEL d.o.o. izpeljalo aktivnosti izdelava spletne strani in
        mobilne aplikacije.
      </Typography>
      <div>
        <img
          src={logo}
          alt="Vavcer"
          style={{ backgroundColor: 'black', maxWidth: 450, padding: '.4rem' }}
        />
      </div>
    </div>
  )
}

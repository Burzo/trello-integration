import React, { useEffect, FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Link,
  Divider,
  Paper,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core'

interface IProps {
  token: string
}

const HomeView: FC<IProps> = (token) => {
  return <h1>test</h1>
}

export default HomeView

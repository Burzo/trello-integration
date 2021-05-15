import React, { useState, useEffect } from 'react'
import { getTrelloToken, handleTrelloTokenExpiry, fetchRetry } from '../../../helpers'
import { Select, MenuItem } from '@material-ui/core'

export interface ILabel {
    color: string
    id: string
    idBoard: string
    name: string
}

interface IProps {
    idBoard: string
    label: string
    handleLabelChange: (event: React.ChangeEvent<{
        value: unknown;
    }>) => void
}

export const Labels = ({idBoard, label, handleLabelChange}: IProps) => {
    const [labels, setLabels] = useState<ILabel[]>([])


useEffect(() => {
    fetchRetry(
        `https://api.trello.com/1/boards/${idBoard}/labels/?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${getTrelloToken()}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res: Response) => handleTrelloTokenExpiry(res))
        .then((data: any) => {
            setLabels(data)
        })
}, [])

const getSelectedLabel = (id: string) => {
    const index = labels.findIndex(label => label.id === id)

    if (index < 0) {
        return ''
    }

    return labels[index].color
}


    return  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={label}
    style={{backgroundColor: getSelectedLabel(label)}}
    onChange={handleLabelChange}
  >
    {labels.map(label => {
        return <MenuItem value={label.id} className="label" style={{backgroundColor: label.color}}>&nbsp;</MenuItem>
      })}
  </Select>
}
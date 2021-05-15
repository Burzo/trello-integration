import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../store'
import { IAllDataCompany } from '../../../store/allData/types'
import { Error } from '../../helpers/Error/Error'
import { Loading } from '../../helpers/Loading/Loading'
import Zadolzitve from '../../helpers/SimpleCard/Zadolzitve'
import './style.scss'

interface IProps {
  company?: IAllDataCompany
  initialLoad: boolean
}

const Tasks = ({ company, initialLoad }: IProps) => {
  if (!initialLoad) {
    return (
      <div className="container-fluid fixed-middle">
        <Loading />
      </div>
    )
  }

  if (!company) {
    return (
      <Error>
        {`Ne najdem informacij o podjetju. Preveri Trello, če obstaja podjetje "homepage".`}
      </Error>
    )
  }

  const index = company.lists.findIndex(
    (list) => list.name.toLowerCase().trim() === 'homepage',
  )

  if (index < 0) {
    return (
      <Error>
        {`Ne najdem lista homepage v podjetju ${company.name}. Preveri Trello, če obstaja list "homepage" v podjetju.`}
      </Error>
    )
  }

  const list = company.lists[index]

  return (
    <div className="tasks">
      {list.cards.map((card) => {
        return (
          <Zadolzitve
            key={card.id}
            card={card}
            color={card.labels.length > 0 ? card.labels[0].color : ''}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = (store: RootState) => {
  const company = store.allData.companies.filter((company) => {
    return company.name.toLowerCase().trim() === 'homepage'
  })

  return {
    company: company.length === 1 ? company[0] : undefined,
    initialLoad: store.allData.initialLoad,
  }
}

export default connect(mapStateToProps)(Tasks)

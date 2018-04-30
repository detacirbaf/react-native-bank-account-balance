import { Constants }        from 'expo'

import React, { Component } from 'react'

import { Dimensions }       from 'react-native'

import { compose }          from 'redux' // 3.7.2

import styled               from 'styled-components/native' // 2.2.3


import bankAccountQuery     from '../bankAccount/hoc/bankAccountQuery'
import bankAccountUpdated   from '../bankAccount/hoc/bankAccountUpdated'


const Page = styled.View`
  flex-direction: column;

  width: ${ Dimensions.get('window').width }px;
  height: ${ Dimensions.get('window').height }px;
`

const StatusBar = styled.StatusBar`
  color: #00f;
`

const Header = styled.View`
  height: ${ Constants.statusBarHeight }px;
`

const TextBalance = styled.Text`
`

class PageHome extends Component {
  render() {
    const { bankAccountQuery } = this.props

    console.log(`PROPS`, this.props)

    return (
      <Page>
        <StatusBar />
        
        <Header />
        
        {
          bankAccountQuery.order.map((id) => {
            const doc = bankAccountQuery.data[id]
            
            return (
              <TextBalance>{ doc.balance }</TextBalance>
            )
          })
        }
      </Page>
    )
  }
}

export default compose(
  bankAccountQuery(),
  bankAccountUpdated(),
)(PageHome)


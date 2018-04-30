import React, { Component } from 'react'

import { gql }              from 'react-apollo' // 1.4.16

const UPDATED = gql`
subscription updateBankAccount {
  BankAccount(
    filter: {
      mutation_in: [UPDATED]
    }
  ) {
    mutation
    node {
      id
      name
      balance
    }
    updatedFields
    previousValues {
      id
      name
      balance
    }
  }
}
`

const subscriptionDoc = {
  document: UPDATED,
}

export default () => (WrappedComponent) => {
  return class SubscriptionProvider extends Component {
    componentWillReceiveProps(nextProps) {
      const { bankAccountQuery } = nextProps
      if (!this.subscription && bankAccountQuery) {
        const { subscribeToMore } = bankAccountQuery
        this.subscription = subscribeToMore(subscriptionDoc)
      }
    }

    render() {
      return (
        <WrappedComponent
          { ...this.props }
        />
      )
    }
  }
}


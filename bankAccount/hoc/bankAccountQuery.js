import { keyBy }            from 'lodash' // 4.17.4

import { gql, graphql }     from 'react-apollo' // 1.4.16

import "redux"; // 3.7.2

const NAME = `bankAccountQuery`
const QUERY_NAME = `allBankAccounts`

const QUERY = gql`
query {
  ${ QUERY_NAME }(orderBy: createdAt_DESC) {
    id
    name
    balance
    
    bankCards {
      id
      name
      number
      createdAt
      updatedAt
      
      bankAccount {
        id
      }
    }
  }
}`

export default ({ name = NAME } = { name: NAME }) => graphql(QUERY, {
  name,
  props: (payload) => {
    const { [NAME]: result = {} } = payload
    const { loading, [QUERY_NAME]: list = [], subscribeToMore } = result

    return {
      [NAME]: {
        data: keyBy(list, `id`),
        loading,
        order: list.map(doc => doc.id),
        subscribeToMore,
      },
    }
  },
})

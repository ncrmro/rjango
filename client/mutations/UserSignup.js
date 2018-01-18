/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
    mutation UserSignupMutation(
    $input: SignupUserMutationInput!
    ) {
        signup(input : $input) {
            authFormPayload{
                __typename
                ... on Viewer{
                    id,
                    tokens{
                        __typename
                        ... on TokensSuccess {
                            token
                        }
                    }

                }
                ... on FormErrors {
                    errors{
                        key
                        message
                    }
                }
            }
        }
    }
`

function sharedUpdater(store, user, newEdge, refetchVariables) {
  const userProxy = store.get(user.id)
  print(userProxy)
}

let tempID = 0

function commit(environment,
                email,
                password,
                ) {
  return commitMutation(
    environment,
    {
      mutation,
      onCompleted: response => console.log(response),
      variables: {
        input: {
          email,
          password
        }
      },
      /*
      updater: (store) => {
        const payload = store.getRootField('addTodo')
        const newEdge = payload.getLinkedRecord('todoEdge')
        //sharedUpdater(store, user, newEdge, refetchVariables)
      },
      optimisticUpdater: (store) => {
        console.log('optimisticUpdater')
        const id = tempID++
        const node = store.create(id, 'User')
        console.log(node)
        console.log(email)
        node.setValue(email, 'email')
        node.setValue(id, 'id')
        //sharedUpdater(store, user, newEdge, refetchVariables)
      }
      */
    }
  )
}

export default { commit }

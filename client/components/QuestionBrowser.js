import React from 'react'
import withRelayContainer from 'utils/Relay'
import { StyleSheet, Text, View } from 'react-native'
import TextInput from 'components/TextInput'
import FlatList from 'components/FlatList'
import { Link, Route } from 'utils/Router'
import Question from './Question'
class QuestionBrowserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: ''
    }
  }

  setSearchString({ target: { value } }) {
    this.setState({ searchString: value })
  }

  question(props) {
    const { node } = this.props.viewer.questions.edges.find(
      ({ node }) => node.id === props.match.params.topicId
    )
    return node
  }

  render() {
    console.log(this.props.viewer.questions.edges)
    return (
      <View
        heading='Polls'
        style={styles.polls}
      >


        <Route
          path={`${this.props.match.url}/:topicId`}
          //component={Question}
          render={ props =>
            <Question
              style={styles.topic}
              question={this.question(props)} />
          }
        />
        <Route
          exact
          path={this.props.match.url}
          component={ () =>
            <View>
              <TextInput
                onChange={field => this.setSearchString(field)}
                value={this.state.searchString}
              />
              <Text style={styles.topic} >Please select a topic.</Text>
              <FlatList
                data={this.props.viewer.questions.edges}
                style={styles.list}
                renderItem={
                  ({ node }) =>
                    <Link
                      key={node.id}
                      to={`${this.props.match.url}/${node.id}`}
                      children={node.questionText}
                    />
                }
              />
            </View>
          }
        />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  polls: { height: '100%', width: '100%' },
  list: { height: '100%', width: '100%' }
})

const query = graphql`
    query QuestionBrowserQuery($searchString: String){
        viewer{
            questions(searchString: $searchString){
                edges {
                    node {
                        id
                        questionText
                        ...Question_question
                    }
                }
            }
        }
    }
`
export default withRelayContainer(QuestionBrowserPage, query)

import React from 'react'
import withRelayContainer from 'utils/Relay'
import { StyleSheet, View } from 'react-native'
import TextInput from 'components/TextInput'
import FlatList from 'components/FlatList'
import Question from 'components/Question'

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

  render() {
    console.log(this.props.viewer.questions.edges)
    return (
      <View
        heading='Polls'
        style={styles.polls}
      >
        <TextInput
          onChange={field => this.setSearchString(field)}
          value={this.state.searchString}
        />
        <FlatList
          data={this.props.viewer.questions.edges}
          style={styles.list}
          renderItem={ ({ node }) => <Question key={node.id} question={node} />}
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
                        ...Question_question
                    }
                }
            }
        }
    }
`
export default withRelayContainer(QuestionBrowserPage, query)

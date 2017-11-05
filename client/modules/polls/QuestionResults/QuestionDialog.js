import React from 'react'
import { graphql } from 'react-relay'
import Dialog from 'react-mdc-web/lib/Dialog/Dialog'
import DialogHeader from 'react-mdc-web/lib/Dialog/DialogHeader'
import DialogTitle from 'react-mdc-web/lib/Dialog/DialogTitle'
import DialogBody from 'react-mdc-web/lib/Dialog/DialogBody'
import DialogFooter from 'react-mdc-web/lib/Dialog/DialogFooter'
import Button from 'react-mdc-web/lib/Button/Button'
import withRelayContainer from 'utils/relay'
import QuestionResults from './QuestionResults'

type QuestionResultsDialogProps = {
  viewer: {
    question: {
    }
  }
}
let QuestionResultsDialog = (props: QuestionResultsDialogProps) =>
  <Dialog
    open
    onClose={() => props.toggleDialog()}
  >
    <DialogHeader>
      <DialogTitle>
        Question: {props.viewer.question.questionText}
        </DialogTitle>
    </DialogHeader>
    <DialogBody>
      <QuestionResults {...props} question={props.viewer.question}/>
    </DialogBody>
    <DialogFooter>
      <Button compact onClick={() => props.toggleDialog()} >Close</Button>
    </DialogFooter>
  </Dialog>


const query = graphql`
    query QuestionDialogQuery($questionId: ID!) {
        viewer{
            question(id: $questionId){
                ...QuestionResults_question
            }
        }
    }
`
QuestionResultsDialog = withRelayContainer(QuestionResultsDialog, query)

export default class OrderDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return <div>
      <Button onClick={() => this.toggleDialog()} >Results</Button>
      {
        this.state.isOpen ?
          <QuestionResultsDialog
            {...this.props}
            relay={{
              ...this.props.relay,
              variables: {
                questionId: this.props.question.id
              }
            }
            }
            toggleDialog={this.toggleDialog.bind(this)}
          />
          : null}
    </div>
  }
}



import React from 'react'
import Radio from 'react-mdc-web/lib/Radio/Radio'
import RadioGroup from 'react-mdc-web/lib/Radio/RadioGroup'

import { createFragmentContainer, graphql } from 'react-relay'

let QuestionChoices = ({ choiceSet, action, selected }) =>
  <div>
    {  choiceSet.edges.length > 0 ?
      <RadioGroup
        name='choiceList'
        value={selected}
        onChange={({ target: { value } }) => {
          action(value)
        }} >
        {choiceSet.edges.map(({ node }) =>
          <Radio
            key={node.id}
            value={node.id}
          >
            {node.choiceText}
          </Radio>)}
      </RadioGroup> :
      'This poll doesn\'t appear to to have any choices.'
    }
  </div>


QuestionChoices = createFragmentContainer(QuestionChoices, {
  choiceSet: graphql`
      fragment  QuestionChoices_choiceSet on ChoiceConnection {
          edges{
              node{
                  id
                  choiceText
                  voteCount
              }
          }
      }
  `
})

export default QuestionChoices

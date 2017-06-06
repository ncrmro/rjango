import React from 'react';
import Radio from 'react-mdc-web/lib/Radio/Radio';
import RadioGroup from 'react-mdc-web/lib/Radio/RadioGroup';

import { createFragmentContainer, graphql } from 'react-relay';


const QuestionChoices = ({ choiceSet, action, selected }) =>
  <RadioGroup
    name='choiceList'
    value={selected}
    onChange={({ target: { value } }) => {
      action(value);
    }} >


    {choiceSet.edges.map(({ node }) =>
      <Radio
        key={node.id}
        value={node.id}
      >
        {node.choiceText}
        {node.voteCount}
      </Radio>)}
  </RadioGroup>;

const QuestionResults = ({ choiceSet, action, selected }) =>
  <div >
    <h3>Results</h3>


    {choiceSet.edges.map(({ node }) =>
      <div
        key={node.id}
      >
        <h4>{node.choiceText}</h4>
        {node.voteCount}
      </div>)}
  </div>;

const VoteOrResults = ({ choiceSet, selected, action, results }) =>
  <div>
    { results ?
      <QuestionResults
        choiceSet={choiceSet}
        action={action}
        selected={selected}
      /> :
      <QuestionChoices
        choiceSet={choiceSet}
        action={action}
        selected={selected}
      />
    }
  </div>;

let ChoiceList = (props: { choiceSet: string, selected: string, action: Func }) =>
  <div>
    {  props.choiceSet.edges.length > 0 ?
      <VoteOrResults {...props} /> :
      'This poll doesn\'t appear to to have any choices.'
    }
  </div>;

ChoiceList = createFragmentContainer(ChoiceList, {
  choiceSet: graphql`
      fragment  PollChoices_choiceSet on ChoiceConnection {
          edges{
              node{
                  id
                  choiceText
                  voteCount
              }
          }
      }
  `
});

export default ChoiceList;

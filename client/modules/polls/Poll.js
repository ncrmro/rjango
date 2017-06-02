import React from 'react';

const Poll = ({ poll }) =>
  <li >
    {poll.questionText}
    {poll.choiceSet.edges.map(({ node }) =>
      <div
        key={node.id}
      >
        asdfsadf
        {poll.choiceText}
        {poll.votes}
      </div>
    )}
  </li>;


export default Poll;
/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type VoteForm_question = {|
  +id: string;
  +questionText: string;
  +hasViewerVoted: ?boolean;
  +choiceSet: ?{| |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VoteForm_question",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "questionText",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "hasViewerVoted",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10,
          "type": "Int"
        }
      ],
      "concreteType": "ChoiceConnection",
      "name": "choiceSet",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "QuestionChoices_choiceSet",
          "args": null
        }
      ],
      "storageKey": "choiceSet{\"first\":10}"
    }
  ],
  "type": "Question"
};

module.exports = fragment;

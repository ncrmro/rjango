/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type QuestionResults_question = {|
  +id: string;
  +questionText: string;
  +choiceSet: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +choiceText: string;
        +voteCount: ?number;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionResults_question",
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
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "ChoiceEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Choice",
              "name": "node",
              "plural": false,
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
                  "name": "choiceText",
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "voteCount",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "choiceSet{\"first\":10}"
    }
  ],
  "type": "Question"
};

module.exports = fragment;

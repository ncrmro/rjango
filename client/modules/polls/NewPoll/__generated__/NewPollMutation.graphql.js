/**
 * @flow
 * @relayHash 8a1edace8a43ffe52ae5baa73c5d2b2b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type NewPollMutationVariables = {|
  input: {
    questionText: string;
    choices: $ReadOnlyArray<?string>;
    clientMutationId?: ?string;
  };
|};
export type NewPollMutationResponse = {|
  +createPoll: ?{|
    +poll: ?{|
      +questionText: string;
    |};
  |};
|};
*/


/*
mutation NewPollMutation(
  $input: CreatePollMutationInput!
) {
  createPoll(input: $input) {
    poll {
      questionText
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreatePollMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewPollMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreatePollMutationInput!"
          }
        ],
        "concreteType": "CreatePollMutationPayload",
        "name": "createPoll",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Question",
            "name": "poll",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "questionText",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "NewPollMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreatePollMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "NewPollMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreatePollMutationInput!"
          }
        ],
        "concreteType": "CreatePollMutationPayload",
        "name": "createPoll",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Question",
            "name": "poll",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation NewPollMutation(\n  $input: CreatePollMutationInput!\n) {\n  createPoll(input: $input) {\n    poll {\n      questionText\n      id\n    }\n  }\n}\n"
};

module.exports = batch;

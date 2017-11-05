/**
 * @flow
 * @relayHash 8f3daa917d2b081e8719ef9145ca41d8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type QuestionDialogQueryResponse = {|
  +viewer: ?{|
    +question: ?{| |};
  |};
|};
*/


/*
query QuestionDialogQuery(
  $questionId: ID!
) {
  viewer {
    question(id: $questionId) {
      ...QuestionResults_question
      id
    }
    id
  }
}

fragment QuestionResults_question on Question {
  id
  questionText
  choiceSet(first: 10) {
    edges {
      node {
        id
        choiceText
        voteCount
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "questionId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionDialogQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "questionId",
                "type": "ID!"
              }
            ],
            "concreteType": "Question",
            "name": "question",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "QuestionResults_question",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "QuestionDialogQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "questionId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "QuestionDialogQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "questionId",
                "type": "ID!"
              }
            ],
            "concreteType": "Question",
            "name": "question",
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
    ]
  },
  "text": "query QuestionDialogQuery(\n  $questionId: ID!\n) {\n  viewer {\n    question(id: $questionId) {\n      ...QuestionResults_question\n      id\n    }\n    id\n  }\n}\n\nfragment QuestionResults_question on Question {\n  id\n  questionText\n  choiceSet(first: 10) {\n    edges {\n      node {\n        id\n        choiceText\n        voteCount\n      }\n    }\n  }\n}\n"
};

module.exports = batch;

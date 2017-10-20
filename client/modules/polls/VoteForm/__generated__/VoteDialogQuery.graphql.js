/**
 * @flow
 * @relayHash 9d9aaa9720a10be16f028511740f2590
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type VoteDialogQueryResponse = {|
  +viewer: ?{|
    +question: ?{| |};
  |};
|};
*/


/*
query VoteDialogQuery(
  $questionId: ID!
) {
  viewer {
    question(id: $questionId) {
      ...VoteForm_question
      id
    }
    id
  }
}

fragment VoteForm_question on Question {
  id
  questionText
  hasViewerVoted
  choiceSet(first: 10) {
    ...QuestionChoices_choiceSet
  }
}

fragment QuestionChoices_choiceSet on ChoiceConnection {
  edges {
    node {
      id
      choiceText
      voteCount
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
    "name": "VoteDialogQuery",
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
                "name": "VoteForm_question",
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
  "name": "VoteDialogQuery",
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
    "name": "VoteDialogQuery",
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
  "text": "query VoteDialogQuery(\n  $questionId: ID!\n) {\n  viewer {\n    question(id: $questionId) {\n      ...VoteForm_question\n      id\n    }\n    id\n  }\n}\n\nfragment VoteForm_question on Question {\n  id\n  questionText\n  hasViewerVoted\n  choiceSet(first: 10) {\n    ...QuestionChoices_choiceSet\n  }\n}\n\nfragment QuestionChoices_choiceSet on ChoiceConnection {\n  edges {\n    node {\n      id\n      choiceText\n      voteCount\n    }\n  }\n}\n"
};

module.exports = batch;

/**
 * @flow
 * @relayHash 2568bde63d9d482185db2d5c7281eca7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type VotePageQueryResponse = {|
  +viewer: ?{|
    +question: ?{| |};
  |};
|};
*/


/*
query VotePageQuery(
  $id: ID!
) {
  viewer {
    question(id: $id) {
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
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VotePageQuery",
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
                "variableName": "id",
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
  "name": "VotePageQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "VotePageQuery",
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
                "variableName": "id",
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
  "text": "query VotePageQuery(\n  $id: ID!\n) {\n  viewer {\n    question(id: $id) {\n      ...VoteForm_question\n      id\n    }\n    id\n  }\n}\n\nfragment VoteForm_question on Question {\n  id\n  questionText\n  hasViewerVoted\n  choiceSet(first: 10) {\n    ...QuestionChoices_choiceSet\n  }\n}\n\nfragment QuestionChoices_choiceSet on ChoiceConnection {\n  edges {\n    node {\n      id\n      choiceText\n      voteCount\n    }\n  }\n}\n"
};

module.exports = batch;

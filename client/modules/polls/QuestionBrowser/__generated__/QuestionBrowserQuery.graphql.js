/**
 * @flow
 * @relayHash c1431dee8016206c7b586ac81ad9f809
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type QuestionBrowserQueryResponse = {|
  +viewer: ?{|
    +questions: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string;
        |};
      |}>;
    |};
  |};
|};
*/


/*
query QuestionBrowserQuery(
  $searchString: String
) {
  viewer {
    questions(searchString: $searchString) {
      edges {
        node {
          id
          ...Question_question
        }
      }
    }
    id
  }
}

fragment Question_question on Question {
  id
  questionText
  hasViewerVoted
  voteCount
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "searchString",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionBrowserQuery",
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
                "name": "searchString",
                "variableName": "searchString",
                "type": "String"
              }
            ],
            "concreteType": "QuestionConnection",
            "name": "questions",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "QuestionEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
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
                        "kind": "FragmentSpread",
                        "name": "Question_question",
                        "args": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
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
  "name": "QuestionBrowserQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "searchString",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "QuestionBrowserQuery",
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
                "name": "searchString",
                "variableName": "searchString",
                "type": "String"
              }
            ],
            "concreteType": "QuestionConnection",
            "name": "questions",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "QuestionEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
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
  "text": "query QuestionBrowserQuery(\n  $searchString: String\n) {\n  viewer {\n    questions(searchString: $searchString) {\n      edges {\n        node {\n          id\n          ...Question_question\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Question_question on Question {\n  id\n  questionText\n  hasViewerVoted\n  voteCount\n}\n"
};

module.exports = batch;

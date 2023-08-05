/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-08-03 15:26:29.221Z",
      "updated": "2023-08-05 19:07:29.097Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "z6aerqau",
          "name": "type",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "user",
              "agent"
            ]
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id||type = \"agent\"||@request.auth.type = \"agent\"",
      "viewRule": "id = @request.auth.id||type = \"agent\"||@request.auth.type = \"agent\"",
      "createRule": "",
      "updateRule": "(id = @request.auth.id&&(@request.data.type = type|| @request.data.type=null))||@request.auth.type = \"agent\"",
      "deleteRule": "@request.auth.type = \"agent\"",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": "@request.auth.type = \"agent\"",
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": true
      }
    },
    {
      "id": "79ttfu5qeuc85nj",
      "created": "2023-08-03 15:31:13.761Z",
      "updated": "2023-08-05 19:09:35.240Z",
      "name": "tickets",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "sr5dln3w",
          "name": "subject",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "wgbtdwwz",
          "name": "body",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "nq5gyxz5",
          "name": "deleted",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "cus5pia0",
          "name": "status",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "open",
              "closed",
              "pending",
              "resolved",
              "new",
              "in progress"
            ]
          }
        },
        {
          "system": false,
          "id": "pbhwozlc",
          "name": "agent",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "wajcoqid",
          "name": "createdBy",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `idx_dku9BAk` ON `tickets` (\n  `subject`,\n  `body`\n)"
      ],
      "listRule": "@request.auth.id = createdBy.id||@request.auth.type = \"agent\"",
      "viewRule": "@request.auth.id = createdBy.id||@request.auth.type = \"agent\"",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.type = \"agent\"",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "0sgkselqp3o3cly",
      "created": "2023-08-03 15:32:32.084Z",
      "updated": "2023-08-05 19:07:08.437Z",
      "name": "replies",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "9hbz56r6",
          "name": "private",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "4bobug9c",
          "name": "body",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "v8czlzus",
          "name": "createdBy",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "n87tr8h7",
          "name": "ticket",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "79ttfu5qeuc85nj",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [],
      "listRule": "(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = \"agent\"",
      "viewRule": "(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = \"agent\"",
      "createRule": "@request.auth.id = ticket.createdBy.id||@request.auth.type = \"agent\"",
      "updateRule": "@request.auth.type = \"agent\"",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "vqabe9s01biwqz2",
      "created": "2023-08-04 14:57:31.290Z",
      "updated": "2023-08-05 19:07:08.437Z",
      "name": "tickets_versions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "eknp4wze",
          "name": "subject",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "2ifcwjft",
          "name": "body",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "mmtfzmjq",
          "name": "deleted",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "fmw0ist2",
          "name": "status",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "open",
              "closed",
              "pending",
              "resolved",
              "new",
              "in progress"
            ]
          }
        },
        {
          "system": false,
          "id": "csplqsmd",
          "name": "agent",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "xtgxhfua",
          "name": "createdBy",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "pagqwrrv",
          "name": "ticket",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "79ttfu5qeuc85nj",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `idx_q2yswxM` ON `tickets_versions` (\n  `subject`,\n  `body`\n)"
      ],
      "listRule": "@request.auth.type = \"agent\"",
      "viewRule": "@request.auth.type = \"agent\"",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "60k1z3y4mg2q2en",
      "created": "2023-08-04 15:20:51.449Z",
      "updated": "2023-08-05 19:07:08.437Z",
      "name": "replies_versions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "bpamjnu9",
          "name": "private",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "c7hkca1w",
          "name": "body",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "bwjsbcbh",
          "name": "createdBy",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "dzsjaciq",
          "name": "ticket",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "79ttfu5qeuc85nj",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "fmwr7ccs",
          "name": "reply",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "0sgkselqp3o3cly",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [],
      "listRule": "(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = \"agent\"",
      "viewRule": "(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = \"agent\"",
      "createRule": "@request.auth.id = ticket.createdBy.id||@request.auth.type = \"agent\"",
      "updateRule": "@request.auth.type = \"agent\"",
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
